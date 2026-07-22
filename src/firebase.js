import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, deleteUser } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  getDoc,
  setDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  where
} from "firebase/firestore";

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "ssadik-tanger",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase main app
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Secondary Firebase app instance specifically for Admin creating new assistant accounts without logging out
const secondaryApp = initializeApp(firebaseConfig, "SecondaryAdminCreatorApp");
const secondaryAuth = getAuth(secondaryApp);

/**
 * Saves a new lead booking to the Firestore database
 * @param {Object} leadData - The lead information (name, whatsapp, service, message, etc.)
 */
export async function saveLead(leadData) {
  try {
    const leadsCol = collection(db, "leads");
    await addDoc(leadsCol, {
      name: leadData.name.trim(),
      whatsapp: leadData.whatsapp.trim(),
      service: leadData.service,
      message: leadData.message || "",
      status: leadData.status || "Pending",
      date: leadData.date || new Date().toISOString(),
      userAgent: leadData.userAgent || navigator.userAgent,
      source: leadData.source || "Form"
    });
  } catch (error) {
    console.error("Error saving lead to Firestore:", error);
    throw error;
  }
}

/**
 * Subscribes to real-time updates of the leads collection
 * @param {Function} callback - Callback function that receives the updated leads array
 * @returns {Function} unsubscribe function to close the snapshot listener
 */
export function getLeadsRealtime(callback) {
  const leadsCol = collection(db, "leads");
  // Order by date descending to get newest leads first
  const q = query(leadsCol, orderBy("date", "desc"));
  
  return onSnapshot(q, (snapshot) => {
    const leads = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    callback(leads);
  }, (error) => {
    console.error("Firestore onSnapshot error:", error);
  });
}

/**
 * Updates the status of a specific lead
 * @param {string} leadId - The Firestore document ID of the lead
 * @param {string} newStatus - The new status ('Pending', 'Confirmed', 'Cancelled')
 */
export async function updateLeadStatus(leadId, newStatus) {
  try {
    const leadRef = doc(db, "leads", leadId);
    await updateDoc(leadRef, { status: newStatus });
  } catch (error) {
    console.error("Error updating lead status in Firestore:", error);
    throw error;
  }
}

// Primary Admin Email
const PRIMARY_ADMIN_EMAILS = [
  "admin@cabinet.com"
];

// Default Assistant Emails to automatically display for Admin if registered in Auth
const DEFAULT_ASSISTANT_EMAILS = [
  "assistante@cabinet.com"
];

/**
 * Creates a new assistant user in Firebase Auth and Firestore.
 * Rejects creation if an account with the same email already exists.
 * @param {string} email 
 * @param {string} password 
 * @param {Object} permissions 
 */
export async function createAssistantUser(email, password, permissions = {}) {
  const cleanEmail = email.trim().toLowerCase();
  try {
    // 1. Check if profile already exists in Firestore using a filtered query
    const usersCol = collection(db, "users");
    const q = query(usersCol, where("email", "==", cleanEmail));
    const snapshot = await getDocs(q);
    
    if (!snapshot.empty) {
      const err = new Error("EMAIL_EXISTS");
      err.code = "auth/email-already-in-use";
      throw err;
    }

    // 2. Create user in Firebase Auth via secondaryAuth
    const userCredential = await createUserWithEmailAndPassword(secondaryAuth, cleanEmail, password);
    const newUid = userCredential.user.uid;

    const newProfile = {
      email: cleanEmail,
      role: "assistant",
      canEdit: permissions.canEdit !== undefined ? permissions.canEdit : true,
      maxDaysView: permissions.maxDaysView !== undefined ? permissions.maxDaysView : 7,
      createdAt: new Date().toISOString()
    };

    const userRef = doc(db, "users", newUid);
    await setDoc(userRef, newProfile);
    return { id: newUid, ...newProfile };
  } catch (error) {
    console.error("Error creating assistant user:", error);
    throw error;
  } finally {
    // Always sign out secondaryAuth to prevent auth state pollution
    await signOut(secondaryAuth).catch(() => {});
  }
}

/**
 * Updates an assistant account (email, password, permissions, role)
 * @param {string} userId 
 * @param {Object} data 
 */
export async function updateAssistantAccount(userId, data) {
  try {
    const { password, ...cleanData } = data;
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, {
      ...cleanData,
      updatedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error("Error updating assistant account:", error);
    throw error;
  }
}

/**
 * Deletes an assistant account from Firebase Auth AND Firestore (cleans up any duplicate docs by email)
 * @param {string|Object} assistantObj 
 */
export async function deleteAssistantUser(assistantObj) {
  const assistantId = typeof assistantObj === 'object' ? assistantObj.id : assistantObj;
  const assistantEmail = typeof assistantObj === 'object' ? assistantObj.email : null;
  const assistantPassword = typeof assistantObj === 'object' ? assistantObj.password : null;

  try {
    // 1. Delete from Firebase Authentication Console if email and password are available
    if (assistantEmail && assistantPassword) {
      try {
        const userCred = await signInWithEmailAndPassword(secondaryAuth, assistantEmail.trim(), assistantPassword);
        await deleteUser(userCred.user);
      } catch (authDeleteErr) {
        console.warn("Notice: Could not delete user directly from Firebase Auth console:", authDeleteErr.message);
      } finally {
        await signOut(secondaryAuth).catch(() => {});
      }
    }

    // 2. Delete all matching Firestore documents by email to remove duplicate entries
    if (assistantEmail) {
      try {
        const usersCol = collection(db, "users");
        const q = query(usersCol, where("email", "==", assistantEmail.trim().toLowerCase()));
        const snapshot = await getDocs(q);
        for (const d of snapshot.docs) {
          await deleteDoc(doc(db, "users", d.id));
        }
      } catch (e) {
        const userRef = doc(db, "users", assistantId);
        await deleteDoc(userRef);
      }
    } else {
      const userRef = doc(db, "users", assistantId);
      await deleteDoc(userRef);
    }
  } catch (error) {
    console.error("Error deleting assistant user:", error);
    throw error;
  }
}

/**
 * Updates details of a lead (name, service, status)
 * @param {string} leadId 
 * @param {Object} details 
 * @param {string} updatedBy 
 */
export async function updateLeadDetails(leadId, details, updatedBy = "") {
  try {
    const leadRef = doc(db, "leads", leadId);
    const updateData = {
      ...details,
      lastModifiedAt: new Date().toISOString()
    };
    if (updatedBy) {
      updateData.lastModifiedBy = updatedBy;
    }
    await updateDoc(leadRef, updateData);
  } catch (error) {
    console.error("Error updating lead details in Firestore:", error);
    throw error;
  }
}

/**
 * Automatically syncs and seeds default accounts and purges any Firestore documents
 * whose Auth account was deleted from the Firebase Auth Console.
 */
export async function syncDefaultAccounts() {
  const defaultAccounts = [
    {
      email: "admin@cabinet.com",
      role: "admin",
      canEdit: true,
      maxDaysView: 3650,
      createdAt: new Date().toISOString()
    },
    {
      email: "assistante@cabinet.com",
      role: "assistant",
      canEdit: true,
      maxDaysView: 7,
      createdAt: new Date().toISOString()
    }
  ];

  try {
    const usersCol = collection(db, "users");
    const snapshot = await getDocs(usersCol);
    const existingDocs = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
    const existingEmails = existingDocs.map(d => (d.email || "").toLowerCase().trim());

    // 1. Seed default accounts if missing
    for (const acc of defaultAccounts) {
      if (!existingEmails.includes(acc.email.toLowerCase())) {
        const newRef = doc(usersCol);
        await setDoc(newRef, acc);
      }
    }
  } catch (err) {
    console.warn("syncDefaultAccounts warning:", err);
  }
}

/**
 * Fetches or initializes the user profile (admin vs assistant) from Firestore.
 * Automatically seeds default assistant profiles if missing so Admin sees them in the dashboard immediately.
 * @param {string} uid 
 * @param {string} email 
 */
export async function getUserProfile(uid, email) {
  try {
    const normalizedEmail = (email || "").toLowerCase().trim();
    const isPrimaryAdmin = PRIMARY_ADMIN_EMAILS.some(e => e.toLowerCase() === normalizedEmail);

    if (isPrimaryAdmin) {
      await syncDefaultAccounts();
    }

    const userRef = doc(db, "users", uid);
    let snap = await getDoc(userRef);

    // If document by UID doesn't exist yet, check if a profile document exists by email in Firestore
    if (!snap.exists() && normalizedEmail) {
      const usersCol = collection(db, "users");
      const q = query(usersCol, where("email", "==", normalizedEmail));
      const qSnap = await getDocs(q);
      const emailDoc = qSnap.docs[0];
      
      if (emailDoc) {
        const emailData = emailDoc.data();
        const { password, ...cleanEmailData } = emailData;
        const profileData = {
          ...cleanEmailData,
          email: normalizedEmail,
          role: isPrimaryAdmin ? "admin" : (emailData.role || "assistant"),
          updatedAt: new Date().toISOString()
        };
        await setDoc(userRef, profileData, { merge: true });
        return { id: uid, ...profileData };
      }
    }

    if (snap.exists()) {
      const data = snap.data();
      const { password, ...cleanData } = data;
      // Upgrade role if user email is in primary admin list but currently set as assistant
      if (isPrimaryAdmin && data.role !== "admin") {
        await updateDoc(userRef, { role: "admin" });
        return { id: snap.id, ...cleanData, role: "admin" };
      }
      return { id: snap.id, ...cleanData };
    }
    
    // Create new profile: primary admin emails get 'admin', all others default to 'assistant'
    const newProfile = {
      email: email || "",
      role: isPrimaryAdmin ? "admin" : "assistant",
      canEdit: true,
      maxDaysView: isPrimaryAdmin ? 3650 : 7,
      createdAt: new Date().toISOString()
    };

    await setDoc(userRef, newProfile);
    return { id: uid, ...newProfile };
  } catch (error) {
    console.error("Error getting user profile:", error);
    const normalizedEmail = (email || "").toLowerCase().trim();
    const isPrimaryAdmin = PRIMARY_ADMIN_EMAILS.some(e => e.toLowerCase() === normalizedEmail);
    return {
      id: uid,
      email: email || "",
      role: isPrimaryAdmin ? "admin" : "assistant",
      canEdit: true,
      maxDaysView: isPrimaryAdmin ? 3650 : 7
    };
  }
}

/**
 * Real-time listener for current user's profile permissions.
 * Updates permissions (canEdit, maxDaysView, role) live across all open assistant sessions.
 * @param {string} uid 
 * @param {string} email 
 * @param {Function} callback 
 * @returns {Function} Unsubscribe function
 */
export function getUserProfileRealtime(uid, email, callback) {
  const normalizedEmail = (email || "").toLowerCase().trim();
  const isPrimaryAdmin = PRIMARY_ADMIN_EMAILS.some(e => e.toLowerCase() === normalizedEmail);

  // Initial lookup
  getUserProfile(uid, email).then((initialProfile) => {
    if (initialProfile) callback(initialProfile);
  }).catch(console.error);

  // Real-time snapshot on UID user doc
  const userRef = doc(db, "users", uid);
  return onSnapshot(userRef, (docSnap) => {
    if (docSnap.exists()) {
      const data = docSnap.data();
      const profile = {
        id: docSnap.id,
        ...data,
        role: isPrimaryAdmin ? "admin" : (data.role || "assistant")
      };
      callback(profile);
    } else {
      // Fallback check by email if UID doc doesn't exist yet or was modified
      const usersCol = collection(db, "users");
      const q = query(usersCol, where("email", "==", normalizedEmail));
      getDocs(q).then(qSnap => {
        const emailDoc = qSnap.docs[0];
        if (emailDoc) {
          const data = emailDoc.data();
          callback({
            id: emailDoc.id,
            ...data,
            role: isPrimaryAdmin ? "admin" : (data.role || "assistant")
          });
        } else if (!isPrimaryAdmin) {
          callback(null); // Account deleted or disabled
        }
      }).catch(() => {});
    }
  }, (error) => {
    console.warn("Real-time profile snapshot listener error:", error);
  });
}

/**
 * Updates role of a user (admin <-> assistant)
 * @param {string} userId 
 * @param {string} newRole 
 */
export async function updateUserRole(userId, newRole) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, { role: newRole });
  } catch (error) {
    console.error("Error updating user role:", error);
    throw error;
  }
}

/**
 * Real-time listener for users / assistants list
 * @param {Function} callback 
 */
export function getUsersRealtime(callback) {
  const usersCol = collection(db, "users");
  return onSnapshot(usersCol, (snapshot) => {
    const users = snapshot.docs.map(d => ({
      id: d.id,
      ...d.data()
    }));
    callback(users);
  }, (error) => {
    console.warn("Firestore getUsersRealtime error (invoking fallback):", error);
    callback([]);
  });
}

/**
 * Updates permissions of an assistant user profile across Firestore
 * @param {string} userId 
 * @param {Object} permissions 
 */
export async function updateAssistantPermissions(userId, permissions) {
  try {
    const userRef = doc(db, "users", userId);
    const snap = await getDoc(userRef);
    let targetEmail = null;
    if (snap.exists()) {
      targetEmail = snap.data().email;
      await updateDoc(userRef, permissions);
    }

    if (targetEmail) {
      const cleanEmail = targetEmail.toLowerCase().trim();
      const usersCol = collection(db, "users");
      const qSnap = await getDocs(usersCol);
      const matchingDocs = qSnap.docs.filter(d => (d.data().email || "").toLowerCase().trim() === cleanEmail);
      for (const d of matchingDocs) {
        await updateDoc(doc(db, "users", d.id), permissions);
      }
    } else {
      await updateDoc(userRef, permissions);
    }
  } catch (error) {
    console.error("Error updating assistant permissions:", error);
    throw error;
  }
}

/**
 * Updates or creates a user profile with role
 * @param {string} userId 
 * @param {Object} data 
 */
export async function saveUserProfile(userId, data) {
  try {
    const userRef = doc(db, "users", userId);
    await setDoc(userRef, data, { merge: true });
  } catch (error) {
    console.error("Error saving user profile:", error);
    throw error;
  }
}

/**
 * Logs in the assistant with email and password
 * @param {string} email 
 * @param {string} password 
 */
export async function signInUser(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

/**
 * Logs out the current user
 */
export async function signOutUser() {
  return signOut(auth);
}

