import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

// Demo Firebase config for development/testing
const demoFirebaseConfig = {
  apiKey: "AIzaSyBHzVFf3Hn_BdOjyd_kfpaz5q0zNCufzNQ",
  authDomain: "halal-food-club-demo.firebaseapp.com",
  projectId: "halal-food-club-demo",
  storageBucket: "halal-food-club-demo.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:demo123456789",
  measurementId: "G-DEMO123"
};

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || demoFirebaseConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || demoFirebaseConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || demoFirebaseConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || demoFirebaseConfig.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || demoFirebaseConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || demoFirebaseConfig.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || demoFirebaseConfig.measurementId,
};

// Initialize Firebase
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let analytics: any = null;

// Demo mode flag
export const isDemoMode = true; // Set to false when you have a real Firebase project

try {
  if (isDemoMode) {
    throw new Error('Demo mode enabled');
  }
  
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  
  // Initialize analytics only in browser
  if (typeof window !== 'undefined') {
    isSupported().then((supported) => {
      if (supported) {
        analytics = getAnalytics(app);
      }
    });
  }
  
  console.log('Firebase initialized successfully');
} catch (error) {
  console.warn('Firebase initialization failed, using demo mode:', error);
  
  // Create mock Firebase objects for demo mode
  db = {
    collection: (name: string) => ({
      addDoc: async (data: any) => {
        console.log('Demo mode: Adding document to', name, data);
        return { id: 'demo_' + Date.now() };
      },
      getDocs: async () => ({
        docs: [],
        empty: true
      }),
      orderBy: () => ({
        limit: () => ({
          getDocs: async () => ({
            docs: [],
            empty: true
          })
        })
      })
    })
  };
  
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: any) => {
      // Return a mock unsubscribe function
      return () => {};
    }
  };
  
  storage = {
    ref: () => ({
      put: async () => ({ ref: { getDownloadURL: async () => 'demo-url' } })
    })
  };
}

// Export mock auth functions for demo mode
export const signInWithEmailAndPassword = async (auth: any, email: string, password: string) => {
  if (isDemoMode) {
    console.log('Demo mode: Sign in with email', email);
    return { user: { uid: 'demo_user', email } };
  }
  // In real mode, this would be imported from firebase/auth
  throw new Error('Not implemented in demo mode');
};

export const createUserWithEmailAndPassword = async (auth: any, email: string, password: string) => {
  if (isDemoMode) {
    console.log('Demo mode: Create user with email', email);
    return { user: { uid: 'demo_user', email } };
  }
  throw new Error('Not implemented in demo mode');
};

export const signOut = async (auth: any) => {
  if (isDemoMode) {
    console.log('Demo mode: Sign out');
    return;
  }
  throw new Error('Not implemented in demo mode');
};

export const onAuthStateChanged = (auth: any, callback: any) => {
  if (isDemoMode) {
    console.log('Demo mode: Auth state changed');
    // Call callback with null user immediately
    callback(null);
    // Return a mock unsubscribe function
    return () => {};
  }
  throw new Error('Not implemented in demo mode');
};

export const sendPasswordResetEmail = async (auth: any, email: string) => {
  if (isDemoMode) {
    console.log('Demo mode: Send password reset email', email);
    return;
  }
  throw new Error('Not implemented in demo mode');
};

export const updateProfile = async (user: any, profile: any) => {
  if (isDemoMode) {
    console.log('Demo mode: Update profile', profile);
    return;
  }
  throw new Error('Not implemented in demo mode');
};

export const updatePassword = async (user: any, password: string) => {
  if (isDemoMode) {
    console.log('Demo mode: Update password');
    return;
  }
  throw new Error('Not implemented in demo mode');
};

// Export mock functions for demo mode
export const collection = (db: any, path: string, ...pathSegments: string[]) => {
  if (isDemoMode) {
    return {
      addDoc: async (data: any) => {
        console.log('Demo mode: Adding document to', path, data);
        return { id: 'demo_' + Date.now() };
      },
      getDocs: async () => ({
        docs: [],
        empty: true
      })
    };
  }
  // In real mode, this would be imported from firebase/firestore
  return db.collection(path);
};

export const addDoc = async (collectionRef: any, data: any) => {
  if (isDemoMode) {
    console.log('Demo mode: Adding document', data);
    return { id: 'demo_' + Date.now() };
  }
  return collectionRef.addDoc(data);
};

export const getDocs = async (queryRef: any) => {
  if (isDemoMode) {
    console.log('Demo mode: Getting documents');
    return { docs: [], empty: true };
  }
  return queryRef.getDocs();
};

export const query = (collectionRef: any, ...queryConstraints: any[]) => {
  if (isDemoMode) {
    return collectionRef;
  }
  return collectionRef;
};

export const orderBy = (field: string, direction?: 'asc' | 'desc') => {
  if (isDemoMode) {
    return { field, direction: direction || 'asc' };
  }
  return { field, direction: direction || 'asc' };
};

export const limit = (count: number) => {
  if (isDemoMode) {
    return { count };
  }
  return { count };
};

export const where = (field: string, operator: any, value: any) => {
  if (isDemoMode) {
    return { field, operator, value };
  }
  return { field, operator, value };
};

export const doc = (db: any, path: string, ...pathSegments: string[]) => {
  if (isDemoMode) {
    return { id: 'demo_doc', path };
  }
  return db.doc(path);
};

export const getDoc = async (docRef: any) => {
  if (isDemoMode) {
    console.log('Demo mode: Getting document');
    return { exists: false, data: () => null };
  }
  return docRef.getDoc();
};

export const setDoc = async (docRef: any, data: any) => {
  if (isDemoMode) {
    console.log('Demo mode: Setting document', data);
    return { id: 'demo_' + Date.now() };
  }
  return docRef.setDoc(data);
};

export const updateDoc = async (docRef: any, data: any) => {
  if (isDemoMode) {
    console.log('Demo mode: Updating document', data);
    return { id: 'demo_' + Date.now() };
  }
  return docRef.updateDoc(data);
};

export const serverTimestamp = () => {
  if (isDemoMode) {
    return new Date();
  }
  return new Date();
};

export { auth, db, storage, analytics };
