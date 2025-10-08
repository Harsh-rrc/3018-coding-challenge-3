import * as admin from 'firebase-admin';

// Path to your service account key file
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export const db = admin.firestore();
console.log('Firebase connected! Ready to use database.');