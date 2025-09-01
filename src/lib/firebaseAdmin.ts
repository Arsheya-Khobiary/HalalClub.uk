import admin from 'firebase-admin';

const firebaseAdminConfig = {
  projectId: process.env.FIREBASE_ADMIN_PROJECT_ID || 'demo-project',
  clientEmail: process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 'demo@demo.com',
  privateKey: process.env.FIREBASE_ADMIN_PRIVATE_KEY?.replace(/\\n/g, '\n') || 'demo-key',
};

// Initialize Firebase Admin (singleton pattern) - only if credentials are valid
function createFirebaseAdminApp() {
  if (admin.apps.length > 0) {
    return admin.apps[0]!;
  }

  // Skip initialization if we don't have valid credentials (build time)
  if (!process.env.FIREBASE_ADMIN_PROJECT_ID || 
      !process.env.FIREBASE_ADMIN_CLIENT_EMAIL || 
      !process.env.FIREBASE_ADMIN_PRIVATE_KEY ||
      process.env.FIREBASE_ADMIN_PRIVATE_KEY.includes('demo') ||
      process.env.FIREBASE_ADMIN_PRIVATE_KEY.includes('YOUR_PRIVATE_KEY_HERE')) {
    return null;
  }

  try {
    return admin.initializeApp({
      credential: admin.credential.cert(firebaseAdminConfig),
      projectId: firebaseAdminConfig.projectId,
      storageBucket: `${firebaseAdminConfig.projectId}.appspot.com`,
    });
  } catch (error) {
    console.warn('Firebase Admin initialization failed:', error);
    return null;
  }
}

const adminApp = createFirebaseAdminApp();

export const adminAuth = adminApp ? admin.auth(adminApp) : null;
export const adminDb = adminApp ? admin.firestore(adminApp) : null;
export const adminStorage = adminApp ? admin.storage(adminApp) : null; 