import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
} from "react";
import { jwtDecode } from "jwt-decode";

// Interfaces

interface User {
  userId: string;
  isAdmin: boolean;
  full_name?: string;
}

interface UserDetails {
  id: string;
  fullName: string;
  phone: string;
  email: string;
  password: string;
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

interface UseAddressesProps {
  type: string;
  streetAddress: string;
  aptNumber: string;
  zipCode: string;
  city: string;
  isDefault: boolean;
}

interface PaymentMethod {
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
  // States
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  // Current User Token
  const token = localStorage.getItem("token");

  const getUser = () => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch (err) {
        console.error("Invalid token", err);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  const fetchUser = useCallback(async () => {
    if (!user?.userId) return;
    const token = localStorage.getItem("token");
    const res = await fetch(`/api/users?id=${user.userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const userDetails = await res.json();
    setUserDetails(userDetails.user[0]);
  }, [user?.userId]);

  const addAddress = async ({
    type,
    streetAddress,
    aptNumber,
    zipCode,
    city,
    isDefault,
  }: UseAddressesProps) => {
    if (!type || !streetAddress || !aptNumber || !zipCode) return;

    try {
      setLoading(true);
      if (!token) return;
      const res = await fetch("/api/addresses", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          streetAddress,
          aptNumber,
          zipCode,
          city,
          isDefault,
        }),
      });

      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAddresses = async () => {
    try {
      setLoading(true);
      if (!token) return;
      const res = await fetch("/api/addresses", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setAddresses(data.addresses);
      return data.addresses;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteAddress = async (id: number) => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/addresses/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const addPaymentMethod = async ({
    type,
    provider,
    cardNumber,
    expiryDate,
    cvv,
    isDefault,
  }: PaymentMethod) => {
    if (!type || !provider || !cardNumber || !expiryDate || !cvv) return;

    try {
      setLoading(true);
      if (!token) return;
      const res = await fetch("/api/paymentMethods", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          type,
          provider,
          cardNumber,
          expiryDate,
          cvv,
          isDefault,
        }),
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getPaymentMethods = async () => {
    try {
      setLoading(true);
      if (!token) return;
      const res = await fetch("/api/paymentMethods", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMethods(data);
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deletePayment = async (id: number) => {
    if (!token) return;
    try {
      setLoading(true);
      const res = await fetch(`/api/paymentMethods/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refetchUsers = async () => {
    if (user) setUsers([user]);
  };

  const fetchCart = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCartItems(data.items || null);
    } catch (err) {
      console.error("Failed to fetch cart:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const addToCart = useCallback(
    async (productId: number, quantity: number) => {
      if (!token) return;
      setLoading(true);
      try {
        await fetch("/api/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity }),
        });
        await fetchCart();
      } catch (err) {
        console.error("Error adding to cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, fetchCart]
  );

  const removeFromCart = useCallback(
    async (productId: number) => {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetch("/api/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId }),
        });

        if (!res.ok) {
          const data = await res.json();
          console.error("Failed to remove item:", data.error);
          return;
        }

        setCartItems((prev) =>
          prev.filter((item) => item.productId !== productId)
        );
        fetchCart();
      } catch (err) {
        console.error("Error removing from cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const updateCart = useCallback(
    async (productId: number, quantity: number) => {
      if (!token) return;
      setLoading(true);
      try {
        await fetch("/api/cart", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId, quantity }),
        });
        await fetchCart();
      } catch (err) {
        console.error("Error updating cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, fetchCart]
  );

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

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
