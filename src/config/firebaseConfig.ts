import * as admin from 'firebase-admin';

// Simple fix - use require instead of import
const serviceAccount = require('./serviceAccountKey.json');

// Initialize Firebase
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


export const db = admin.firestore();
console.log('Firebase connected! Ready to use database.');