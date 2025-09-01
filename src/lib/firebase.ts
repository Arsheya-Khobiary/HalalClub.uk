import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics, isSupported } from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || 'demo-key',
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || 'demo.firebaseapp.com',
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'demo-project',
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || 'demo.appspot.com',
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || '123456789',
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || '1:123456789:web:demo',
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || 'G-DEMO',
};

// Initialize Firebase only if we have valid config
let app: any = null;
let auth: any = null;
let db: any = null;
let storage: any = null;
let analytics: any = null;

try {
  // Only initialize if we have a real API key
  if (process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
      !process.env.NEXT_PUBLIC_FIREBASE_API_KEY.includes('demo') &&
      process.env.NEXT_PUBLIC_FIREBASE_API_KEY.length > 10) {
    app = initializeApp(firebaseConfig);
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
    
    // Initialize Analytics (only in browser)
    if (typeof window !== 'undefined') {
      isSupported().then((supported) => {
        if (supported) {
          analytics = getAnalytics(app);
        }
      });
    }
  }
} catch (error) {
  console.warn('Firebase initialization skipped:', error);
}

export { auth, db, storage, analytics }; 