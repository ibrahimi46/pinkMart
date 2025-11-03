export interface User {
  userId: string;
  isAdmin: boolean;
  full_name?: string;
}

export interface UserDetails {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
}

export interface Address {
  id?: number;
  type: string;
  streetAddress: string;
  aptNumber: string;
  zipCode: string;
  city: string;
  isDefault: boolean;
}

export interface PaymentMethod {
  id?: number;
  type: string;
  provider: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isDefault?: boolean;
}


export interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedAt: string;
  price: number;
}

export interface Orders {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  deliveryDate: string;
  createdAt: string;
  itemCount: number;
}

export interface PlaceOrderProps {
  finalCheckoutPrice: string;
  selectedDeliveryDate: string;
  cartItems: CartItem[];
}

export interface AdminOrder {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  deliveryDate: string | null;
  createdAt: string;
  itemCount: number;
}

export interface AdminUser {
  id: number;
  fullName: string;
  email: string;
  phone: string | null;
  isAdmin: boolean;
  createdAt: string;
  orders?: {
    id: number;
    totalAmount: number;
    status: string;
    createdAt: string;
  }[];
}

export type CheckoutStep = "cart" | "checkout" | "order_placed" | "order_failed";


export interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  currentPrice: string;
  oldPrice?: string;
  stock: string;
  imageUrl: string;
}



export interface DeliveryDates {
  date: Date;
  dayName: string;
  dateStr: string;
  fullDate: string;
}