import { Timestamp } from 'firebase/firestore';

export interface ShippingDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  postalCode: string;
}

export interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
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