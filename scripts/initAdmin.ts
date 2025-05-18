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
    console.log("Firebase Admin SDK already initialized.");
    return existingApp;
  }

  try {
    let credential;
    let logMessage;

    const projectId = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || 'spicedaddies-league';

   
    if (process.env.FIREBASE_PRIVATE_KEY && process.env.FIREBASE_CLIENT_EMAIL) {
      console.log("Found service account credentials in environment variables. Using cert credentials.");
      credential = admin.credential.cert({
        projectId: projectId,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        
        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
      });
      logMessage = "Firebase Admin SDK initialized SUCCESSFULLY with service account credentials from environment variables.";
    } else {
      
      console.log("No explicit service account credentials found. Using application default credentials.");
      credential = admin.credential.applicationDefault();
      logMessage = "Firebase Admin SDK initialized SUCCESSFULLY with default application credentials.";
    }

   
    const app = admin.initializeApp({
      credential: credential,
      projectId: projectId
     
    });

    console.log(logMessage);
    return app;

  } catch (error) {
    console.error("Failed to initialize Firebase Admin SDK:", error);
    throw new Error("Failed to initialize Firebase Admin SDK: " + error);
  }
}
