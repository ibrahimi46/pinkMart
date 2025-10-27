import { ReactNode, useState, useEffect, createContext } from "react";
import useAddresses from "../utils/useAddresses";
import usePayments from "../utils/usePayments";
import { useUser } from "../utils/useUser";
import useCart from "../utils/useCart";

interface User {
  userId: string;
  isAdmin: boolean;
  full_name?: string;
}

interface Address {
  id?: number;
  type: string;
  streetAddress: string;
  aptNumber: string;
  zipCode: string;
  city: string;
  isDefault: boolean;
}

interface Payment {
  id?: number;
  type: string;
  provider: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  isDefault?: boolean;
}

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedAt: string;
  price: string;
}

interface UserDataContextType {
  addresses: Address[];
  payments: Payment[];
  users: User[];
  cartItems: CartItem[];
  refetchAddresses: () => Promise<void>;
  refetchPayments: () => Promise<void>;
  refetchUsers: () => Promise<void>;
  refetchCartItems: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

export const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const { getAddresses } = useAddresses();
  const { getPaymentMethods } = usePayments();
  const { user } = useUser();
  const { refetchCart } = useCart();

  const refetchAddresses = async () => {
    const res = await getAddresses();
    if (res) setAddresses(res);
  };

  const refetchPayments = async () => {
    const res = await getPaymentMethods();
    if (res) setPayments(res);
  };

  const refetchUsers = async () => {
    if (user) setUsers([user]);
  };

  const refetchCartItems = async () => {
    await refetchCart();
  };

  const refetchAll = async () => {
    await Promise.all([
      refetchAddresses(),
      refetchPayments(),
      refetchUsers(),
      refetchCartItems(),
    ]);
  };

  useEffect(() => {
    refetchAll();
  }, [user]);

  return (
    <UserDataContext.Provider
      value={{
        addresses,
        payments,
        users,
        cartItems,
        refetchAddresses,
        refetchPayments,
        refetchUsers,
        refetchCartItems,
        refetchAll,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
