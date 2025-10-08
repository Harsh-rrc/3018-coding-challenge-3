import * as admin from 'firebase-admin';
import * as serviceAccount from './serviceAccountKey.json';

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as admin.ServiceAccount)
});

export const db = admin.firestore();