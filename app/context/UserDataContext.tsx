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
  user: User | null;
  userDetails: UserDetails | null;
  cartItems: CartItem[];
  addresses: Address[];
  paymentMethods: PaymentMethod[];
  users: User[];
  loading: boolean;
  cartTotal: number;
  isLoggedIn: boolean;
  addAddress: (address: Address) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  logout: () => void;
  addPaymentMethod: (paymentMethod: PaymentMethod) => Promise<void>;
  deletePayment: (id: number) => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCart: (productId: number, quantity: number) => Promise<void>;
  refetchAddresses: () => Promise<void>;
  refetchPaymentMethods: () => Promise<void>;
  refetchCartItems: () => Promise<void>;
  refetchAll: () => Promise<void>;
}

export const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  // States
  const [token, setToken] = useState<string>("");
  const [user, setUser] = useState<User | null>(null); // Current user
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const isLoggedIn = !!user;

  // On mount identifies the user token
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) setToken(userToken);
  }, []);

  useEffect(() => {
    if (token) getUser();
  }, [token]);

  useEffect(() => {
    if (user?.isAdmin) {
      getUsersList();
    }
  }, [user]);

  // User Functions
  const getUser = () => {
    try {
      const decoded = jwtDecode<User>(token);
      setUser(decoded);
    } catch (err) {
      console.error("Invalid token", err);
      setUser(null);
    }
  };

  const getUsersList = async () => {
    try {
      const res = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (user?.isAdmin) {
        setUsers(data.users);
      } else {
        setUserDetails(data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    window.location.href = "/";
  };

  // Address Functions
  const addAddress = async ({
    type,
    streetAddress,
    aptNumber,
    zipCode,
    city,
    isDefault,
  }: Address) => {
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

  const refetchAddresses = async () => {
    await getAddresses();
  };
  // Payment Functions
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
      setPaymentMethods(data);
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

  const refetchPaymentMethods = async () => {
    await getPaymentMethods();
  };

  // Cart Functions
  const fetchCartItems = useCallback(async () => {
    if (!token) return;
    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setCartItems(data.items || []);
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
        await fetchCartItems();
      } catch (err) {
        console.error("Error adding to cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, fetchCartItems]
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
        fetchCartItems();
      } catch (err) {
        console.error("Error removing from cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, fetchCartItems]
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
        await fetchCartItems();
      } catch (err) {
        console.error("Error updating cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, fetchCartItems]
  );

  const cartTotal = useMemo(() => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price);
      return total + price * item.quantity;
    }, 0);
  }, [cartItems]);

  const refetchCartItems = async () => {
    await fetchCartItems();
  };

  const refetchAll = useCallback(async () => {
    await Promise.all([
      refetchAddresses(),
      refetchPaymentMethods(),
      refetchCartItems(),
    ]);
  }, [token]);

  useEffect(() => {
    refetchAll();
  }, [refetchAll]);

  return (
    <UserDataContext.Provider
      value={{
        user,
        userDetails,
        cartItems,
        addresses,
        paymentMethods,
        users,
        loading,
        cartTotal,
        isLoggedIn,
        logout,
        addAddress,
        deleteAddress,
        addPaymentMethod,
        deletePayment,
        addToCart,
        removeFromCart,
        updateCart,
        refetchAddresses,
        refetchCartItems,
        refetchPaymentMethods,
        refetchAll,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
