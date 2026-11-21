// Firebase App & Authentication Configuration
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
} from "firebase/auth";

// Swarg-Bhraman / SafarNama Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP8Zqex15E2-3DAAC8BNZTXCG5Pfg4_oQ",
  authDomain: "swarg-bhraman.firebaseapp.com",
  projectId: "swarg-bhraman",
  storageBucket: "swarg-bhraman.firebasestorage.app",
  messagingSenderId: "591987474728",
  appId: "1:591987474728:web:d8e19084a30940aa40901d",
  measurementId: "G-DJ3Z9M746R"
};

// Initialize Firebase App (Singleton check for HMR)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Initialize Firebase Auth
const auth = getAuth(app);

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Initialize Analytics safely (avoids crashes in unsupported environments or node)
let analytics = null;
if (typeof window !== 'undefined') {
  isSupported()
    .then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    })
    .catch(() => {});
}

export {
  app,
  auth,
  googleProvider,
  analytics,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail
};

export default app;
