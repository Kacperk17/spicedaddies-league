import admin from "firebase-admin";

function getAdminApp() {
  const apps = admin.apps;
  if (apps.length > 0) {
    return admin.app();
  }
  return null;
}

export default async function initAdmin() {

  const existingApp = getAdminApp();
  if (existingApp) {
    console.log("Firebase Admin SDK already initialized."); // Add logging here too
    return existingApp;
  }

  // --- Add these logs to inspect the environment ---
  console.log("Attempting to initialize Firebase Admin SDK.");
  console.log("process.env.GOOGLE_CLOUD_PROJECT:", process.env.GOOGLE_CLOUD_PROJECT);
  console.log("process.env.GCLOUD_PROJECT:", process.env.GCLOUD_PROJECT);
  console.log("process.env.FIREBASE_CONFIG:", process.env.FIREBASE_CONFIG);
  console.log("Explicit projectId provided:", 'spicedaddies-league');
  // --------------------------------------------------


  try {
    const app = admin.initializeApp({
      credential: admin.credential.applicationDefault(),
      projectId: 'spicedaddies-league'
    });
    console.log("Firebase Admin SDK initialized SUCCESSFULLY with default application credentials and projectId."); // Add "SUCCESSFULLY"
    return app;
  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK with default credentials:", error);
    // Log the full error object for more details
    console.error("Full error object:", error);
    // Re-throw the error with the specific message for clarity in the final output
    throw new Error("Failed to initialize Firebase Admin SDK: " + error);
  }
}
