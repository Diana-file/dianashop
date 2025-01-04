import { collection, addDoc, query, where, getDocs, Timestamp, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { Order } from '../types/order';

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface Order {
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  shippingDetails: ShippingDetails;
  status: 'new' | 'processing' | 'shipped' | 'delivered';
  paymentStatus: 'pending' | 'completed' | 'failed';
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

export const createOrder = async (orderData: Omit<Order, 'createdAt' | 'updatedAt'>) => {
  try {
    const ordersRef = collection(db, 'orders');
    const timestamp = Timestamp.now();
    
    const newOrder = {
      ...orderData,
      createdAt: timestamp,
      updatedAt: timestamp
    };
    
    const docRef = await addDoc(ordersRef, newOrder);
    return docRef.id;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
};

export const getOrdersByEmail = async (email: string): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, where('shippingDetails.email', '==', email));
    const querySnapshot = await getDocs(q);
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as Order[];
  } catch (error) {
    console.error('Errore nel recupero degli ordini:', error);
    throw error;
  }
};

export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const ordersRef = collection(db, 'orders');
    const querySnapshot = await getDocs(ordersRef);
    
    return querySnapshot.docs.map(doc => ({
      ...doc.data(),
      id: doc.id,
    })) as Order[];
  } catch (error) {
    console.error('Errore nel recupero degli ordini:', error);
    throw error;
  }
};

export const updateOrderStatus = async (orderId: string, status: Order['status']) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status,
      updatedAt: Timestamp.now()
    });
  } catch (error) {
    console.error('Errore nell\'aggiornamento dello stato:', error);
    throw error;
  }
}; 