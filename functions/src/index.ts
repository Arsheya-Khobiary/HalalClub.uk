import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp();

const db = admin.firestore();
const auth = admin.auth();

// Seed admin users with custom claims
export const seedAdmins = functions.https.onCall(async (data, context) => {
  // Check if the caller is already an admin or if this is the initial setup
  const adminEmails = process.env.ADMIN_SEED_EMAILS?.split(',') || [];
  
  if (!adminEmails.length) {
    throw new functions.https.HttpsError(
      'failed-precondition',
      'No admin emails configured'
    );
  }

  try {
    const results = [];
    
    for (const email of adminEmails) {
      try {
        const userRecord = await auth.getUserByEmail(email.trim());
        await auth.setCustomUserClaims(userRecord.uid, { role: 'admin' });
        
        // Update user document
        await db.collection('users').doc(userRecord.uid).set({
          uid: userRecord.uid,
          email: userRecord.email,
          displayName: userRecord.displayName || 'Admin',
          role: 'admin',
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
        }, { merge: true });
        
        results.push({ email, status: 'success', uid: userRecord.uid });
      } catch (error) {
        results.push({ email, status: 'error', error: (error as Error).message });
      }
    }
    
    return { results };
  } catch (error) {
    throw new functions.https.HttpsError(
      'internal',
      'Failed to seed admins',
      error
    );
  }
});

// Handle submission approval
export const onSubmissionApproved = functions.firestore
  .document('submissions/{submissionId}')
  .onUpdate(async (change, context) => {
    const before = change.before.data();
    const after = change.after.data();
    const submissionId = context.params.submissionId;

    // Check if status changed to approved
    if (before.status !== 'approved' && after.status === 'approved') {
      try {
        // Create restaurant document
        const restaurantData = {
          name: after.name,
          cuisines: after.cuisines,
          address: after.address,
          postcode: after.postcode,
          location: after.location,
          phone: after.phone,
          website: after.website,
          halalCertified: after.halalCertified,
          bestItems: after.bestItems,
          menu: after.menu,
          socials: after.socials,
          gallery: after.gallery,
          videos: after.videos,
          ratingAvg: 0,
          ratingCount: 0,
          ownerUid: after.ownerUid,
          createdAt: admin.firestore.FieldValue.serverTimestamp(),
          updatedAt: admin.firestore.FieldValue.serverTimestamp(),
        };

        // Create restaurant document
        const restaurantRef = db.collection('restaurants').doc();
        await restaurantRef.set(restaurantData);

        // Update submission with restaurant ID
        await change.after.ref.update({
          restaurantId: restaurantRef.id,
          publishedAt: admin.firestore.FieldValue.serverTimestamp(),
        });

        console.log(`Restaurant ${restaurantRef.id} created from submission ${submissionId}`);
      } catch (error) {
        console.error('Error approving submission:', error);
        
        // Revert status on error
        await change.after.ref.update({
          status: 'pending',
          error: 'Failed to publish restaurant',
        });
      }
    }
  });

// Clean up rejected submissions after 30 days
export const cleanupRejectedSubmissions = functions.pubsub
  .schedule('0 2 * * *') // Daily at 2 AM
  .onRun(async (context) => {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const snapshot = await db
      .collection('submissions')
      .where('status', '==', 'rejected')
      .where('updatedAt', '<', thirtyDaysAgo)
      .get();

    const batch = db.batch();
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });

    await batch.commit();
    console.log(`Cleaned up ${snapshot.size} rejected submissions`);
  }); 