export interface Product {
  id: string;
  name: string;
  nameSi: string;
  price: number;
  image: string;
  category: string;
  subCategory?: string;
  isFresh: boolean;
  rating: number;
  stock: number;
  description?: string;
  descriptionSi?: string;
  unit: string; // e.g., 'kg', 'unit', 'pack'
  nutritionalInfo?: {
    calories: string;
    protein: string;
    carbs: string;
    fat: string;
  };
  deliveryEstimate?: string;
  isOffer?: boolean;
  discountPrice?: number;
}

export interface User {
  uid: string;
  email: string;
  displayName: string;
  role: 'customer' | 'admin' | 'manager' | 'staff' | 'rider';
  loyaltyPoints: number;
  phoneNumber?: string;
  addresses?: Address[];
}

export interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  tax: number;
  shippingFee: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'cod' | 'lankaqr' | 'payhere';
  address: Address;
  deliverySlot: string;
  createdAt: any;
  updatedAt: any;
  riderId?: string;
  trackingHistory: {
    status: string;
    timestamp: any;
    note?: string;
  }[];
}

export interface OrderItem {
  productId: string;
  name: string;
  nameSi: string;
  quantity: number;
  price: number;
  image: string;
}

export interface NavItem {
  id: string;
  label: string;
  labelSi: string;
  path: string;
  icon?: string;
}

export interface Message {
  role: 'user' | 'assistant';
  content: string;
}
