import type { Product } from './database.types';

export type { Product };

export interface CartItem extends Product {
  quantity: number;
}

export interface CheckoutFormData {
  name: string;
  email: string;
  phone: string;
  address: string;
  specialInstructions: string;
}

export interface OrderData {
  orderDate: string;
  orderId: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    address: string;
  };
  items: Array<{
    productName: string;
    quantity: number;
    price: number;
    subtotal: number;
  }>;
  orderSummary: {
    subtotal: number;
    tax: number;
    total: number;
  };
  specialInstructions: string;
  paymentStatus: string;
  paymentMethod: 'razorpay' | 'cop';
  razorpayPaymentId?: string;
  razorpayOrderId?: string;
  razorpaySignature?: string;
}
