import { collection, addDoc, serverTimestamp, query, where, getDocs, orderBy } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { handleFirestoreError, OperationType } from '../lib/firestore-errors';

const COLLECTION_NAME = 'orders';

export const createOrder = async (orderData: any) => {
  if (!auth.currentUser) throw new Error('User must be signed in to create an order');
  
  const path = COLLECTION_NAME;
  try {
    const docRef = await addDoc(collection(db, path), {
      ...orderData,
      userId: auth.currentUser.uid,
      status: 'pending',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    });
    return docRef.id;
  } catch (error) {
    handleFirestoreError(error, OperationType.CREATE, path);
  }
};

export const getUserOrders = async () => {
  if (!auth.currentUser) return [];
  
  const path = COLLECTION_NAME;
  try {
    const q = query(
      collection(db, path),
      where('userId', '==', auth.currentUser.uid),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    handleFirestoreError(error, OperationType.LIST, path);
  }
};
