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
