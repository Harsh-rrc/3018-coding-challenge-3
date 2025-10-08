import { db } from '../../../config/firebaseConfig';

// This handles all database operations
export const createDocument = async <T>(
  collectionName: string, 
  data: any, 
  id?: string
): Promise<T> => {
  try {
    const collectionRef = db.collection(collectionName);
    let docRef;
    
    // If ID is provided, use it; otherwise, let Firestore generate one
    if (id) {
      docRef = collectionRef.doc(id);
      await docRef.set(data);
    } else {
      docRef = await collectionRef.add(data);
    }
    
   // Retrieve the created document to return
    const snapshot = await docRef.get();
    return {
      id: docRef.id,
      ...snapshot.data()
    } as T;
  } catch (error) {
    console.error('Error creating document:', error);
    throw error;
  }
};
