import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
} from "react";
import {
  User,
  Orders,
  UserDetails,
  CartItem,
  AdminOrder,
  AdminUser,
  Address,
} from "@/types";
import { jwtDecode } from "jwt-decode";
import { useSession } from "next-auth/react";

interface UserDataContextType {
  user: User | null;
  userDetails: UserDetails | null;
  cartItems: CartItem[];
  addresses: Address[];
  loading: boolean;
  cartTotal: number;
  isLoggedIn: boolean;
  defaultAddress: Address | null;
  step: string;
  orders: Orders[];
  adminOrders: AdminOrder[];
  adminUsers: AdminUser[];
  cartTotalItems: number;
  userPfp: string;
  token: string;
  setUserPfp: React.Dispatch<React.SetStateAction<string>>;
  setLoading: (value: boolean) => void;
  fetchUserPfp: () => Promise<void>;
  fetchAdminUsers: () => void;
  updateUserRole: (userId: number, isAdmin: boolean) => void;
  getAdminUserDetails: (userId: number) => Promise<AdminUser | null>;
  getOrders: () => Promise<void>;
  fetchAdminOrders: () => void;
  updateOrderStatus: (orderId: number, status: string) => void;
  getOrderDetails: (orderId: number) => Promise<AdminOrder | null>;
  getAddresses: () => void;
  addAddress: (address: Address) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  logout: () => void;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCart: (productId: number, quantity: number) => Promise<void>;
  refetchAddresses: () => Promise<void>;
  refetchCartItems: () => Promise<void>;
  refetchAll: () => Promise<void>;
  setStep: (value: string) => void;
  handleStepNext: (step: string) => void;
}

export const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  // States
  const [token, setToken] = useState<string>("");
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [user, setUser] = useState<User | null>(null); // Current user
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [addresses, setAddresses] = useState<Address[]>([]);

  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);

  const [loading, setLoading] = useState(false);
  const [userPfp, setUserPfp] = useState<string>("");
  const [step, setStep] = useState<string>("cart"); // steps in cart
  const { data: session } = useSession();

  const isLoggedIn = !!user;

  // On mount identifies the user token
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
      return;
    }
    if (session?.user?.customToken) {
      setToken(session?.user?.customToken);
    }
  }, [session]);

  useEffect(() => {
    if (token) getUser();
  }, [token]);

  useEffect(() => {
    if (user) {
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
      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setUserDetails(data.user);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    localStorage.removeItem("token");
    setUser(null);

    if (session) {
      const { signOut } = await import("next-auth/react");
      signOut({ callbackUrl: "/" });
    } else {
      window.location.href = "/";
    }
  };

  // Admin User Functions

  const fetchAdminUsers = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch("/api/admin/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAdminUsers(data.users || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateUserRole = async (userId: number, isAdmin: boolean) => {
    if (!token) return;
    try {
      setLoading(true);
      await fetch(`/api/admin/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isAdmin }),
      });
      setAdminUsers((prev) =>
        prev.map((user) => (user.id === userId ? { ...user, isAdmin } : user))
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getAdminUserDetails = useCallback(
    async (userId: number) => {
      if (!token) return null;

      try {
        setLoading(true);
        const res = await fetch(`/api/admin/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        return data.user;
      } catch (err) {
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

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
      if (data.success) {
        await refetchAddresses();
      }
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
      if (data.success) {
        await refetchAddresses();
      }
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const defaultAddress = useMemo(() => {
    if (addresses.length === 0) return null;
    return addresses?.find((addr) => addr.isDefault) || addresses?.[0];
  }, [addresses]);

  const refetchAddresses = async () => {
    await getAddresses();
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
      const dataWithNumbers = data.items.map((item: CartItem) => ({
        ...item,
        currentPrice: Number(item.price),
        quantity: Number(item.quantity),
      }));

      setCartItems(dataWithNumbers || []);
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
      const price = Number(item.price);
      const quantity = Number(item.quantity);

      return total + price * quantity;
    }, 0);
  }, [cartItems]);

  const refetchCartItems = async () => {
    await fetchCartItems();
  };

  // Order Functions

  const getOrders = async () => {
    try {
      if (!token) return;
      setLoading(true);
      const res = await fetch("/api/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data) setOrders(data.result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const refetchOrders = async () => {
    await getOrders();
  };

  // User pfp functions

  const fetchUserPfp = async () => {
    try {
      if (!token) return;

      const res = await fetch("/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data?.user?.image) setUserPfp(data.user.image);
      console.log(userPfp);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserPfp();
  }, [token]);

  // Admin Orders

  const fetchAdminOrders = async () => {
    if (!token) return;

    try {
      setLoading(true);
      const res = await fetch("/api/admin/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setAdminOrders(data.result || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: number, status: string) => {
    if (!token) return;
    try {
      setLoading(true);
      await fetch(`/api/admin/orders/${orderId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      setAdminOrders((prev) =>
        prev.map((order) =>
          order.id === orderId ? { ...order, status } : order
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getOrderDetails = useCallback(
    async (orderId: number) => {
      if (!token) return null;

      try {
        setLoading(true);
        const res = await fetch(`/api/admin/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        return data.order;
      } catch (err) {
        console.error(err);
        return null;
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  const cartTotalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + Number(item.quantity), 0);
  }, [cartItems]);

  const refetchAll = useCallback(async () => {
    await Promise.all([
      refetchAddresses(),
      refetchCartItems(),
      refetchOrders(),
    ]);
  }, [token]);

  useEffect(() => {
    refetchAll();
  }, [refetchAll]);

  // For handling checkout steps in cart page
  const handleStepNext = (value: string) => {
    if (value) {
      setStep(value);
    }
  };

  return (
    <UserDataContext.Provider
      value={{
        user,
        userDetails,
        cartItems,
        addresses,
        loading,
        cartTotal,
        isLoggedIn,
        defaultAddress,
        step,
        orders,
        adminOrders,
        adminUsers,
        cartTotalItems,
        userPfp,
        token,
        setLoading,
        setUserPfp,
        fetchUserPfp,
        fetchAdminUsers,
        updateUserRole,
        getAdminUserDetails,
        updateOrderStatus,
        getOrderDetails,
        fetchAdminOrders,
        logout,
        getAddresses,
        addAddress,
        deleteAddress,
        addToCart,
        removeFromCart,
        updateCart,
        refetchAddresses,
        refetchCartItems,
        refetchAll,
        setStep,
        handleStepNext,
        getOrders,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
