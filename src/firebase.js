import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
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
  updateDoc 
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

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
 * Fetches or initializes the user profile (admin vs assistant) from Firestore
 * @param {string} uid 
 * @param {string} email 
 */
export async function getUserProfile(uid, email) {
  try {
    const userRef = doc(db, "users", uid);
    const snap = await getDoc(userRef);
    if (snap.exists()) {
      return { id: snap.id, ...snap.data() };
    }
    
    // Check if users collection is empty to make first user Admin by default, or if email contains 'admin'
    const usersCol = collection(db, "users");
    const allUsersSnap = await getDocs(usersCol);
    const isFirstUser = allUsersSnap.empty;
    const isAdminEmail = isFirstUser || (email && email.toLowerCase().includes('admin'));

    const newProfile = {
      email: email || "",
      role: isAdminEmail ? "admin" : "assistant",
      canEdit: true,
      maxDaysView: 7, // Default 7 days view limit for assistants
      createdAt: new Date().toISOString()
    };

    await setDoc(userRef, newProfile);
    return { id: uid, ...newProfile };
  } catch (error) {
    console.error("Error getting user profile:", error);
    // Safe fallback profile
    return {
      id: uid,
      email: email || "",
      role: (email && email.toLowerCase().includes('admin')) ? "admin" : "assistant",
      canEdit: true,
      maxDaysView: 7
    };
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
    console.error("Firestore getUsersRealtime error:", error);
  });
}

/**
 * Updates permissions of an assistant user profile
 * @param {string} userId 
 * @param {Object} permissions 
 */
export async function updateAssistantPermissions(userId, permissions) {
  try {
    const userRef = doc(db, "users", userId);
    await updateDoc(userRef, permissions);
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

