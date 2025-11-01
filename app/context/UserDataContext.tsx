import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
} from "react";
import { jwtDecode } from "jwt-decode";
import { signOut, useSession } from "next-auth/react";

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

interface Orders {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  deliveryDate: string;
  createdAt: string;
  itemCount: number;
}

interface PlaceOrderProps {
  finalCheckoutPrice: string;
  selectedDeliveryDate: string;
  cartItems: CartItem[];
}

interface AdminOrder {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  deliveryDate: string | null;
  createdAt: string;
  itemCount: number;
}

interface AdminUser {
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

type CheckoutStep = "cart" | "checkout" | "order_placed";

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
  defaultAddress: Address | null;
  defaultPayment: PaymentMethod | null;
  step: CheckoutStep;
  orders: Orders[];
  adminOrders: AdminOrder[];
  adminUsers: AdminUser[];
  cartTotalItems: number;
  fetchAdminUsers: () => void;
  updateUserRole: (userId: number, isAdmin: boolean) => void;
  getAdminUserDetails: (userId: number) => Promise<AdminUser | null>;
  placeOrder: ({
    finalCheckoutPrice,
    selectedDeliveryDate,
    cartItems,
  }: PlaceOrderProps) => Promise<void>;
  getOrders: () => Promise<void>;
  fetchAdminOrders: () => void;
  updateOrderStatus: (orderId: number, status: string) => void;
  getOrderDetails: (orderId: number) => Promise<AdminOrder | null>;
  getAddresses: () => void;
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
  setStep: (value: CheckoutStep) => void;
  handleStepNext: () => void;
  handleStepBack: () => void;
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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([]);
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([]);
  const [orderId, setOrderId] = useState<number | null>(null);
  const [orders, setOrders] = useState<Orders[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<"cart" | "checkout" | "order_placed">(
    "cart"
  ); // Steps in cart
  const { data: session, status } = useSession();

  const isLoggedIn = !!user;

  // On mount identifies the user token
  useEffect(() => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      setToken(userToken);
    } else if (session?.user?.customToken) {
      setToken(session.user.customToken);
    } else {
      console.log("no tokens found");
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
      setPaymentMethods(data.methods);
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
      if (data) refetchPaymentMethods();
      return data;
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const defaultPayment = useMemo(() => {
    if (paymentMethods.length === 0) return null;
    return (
      paymentMethods?.find((method) => method.isDefault) || paymentMethods?.[0]
    );
  }, [paymentMethods]);

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

  // Order Functions

  const placeOrder = async ({
    finalCheckoutPrice,
    selectedDeliveryDate,
    cartItems,
  }: PlaceOrderProps) => {
    if (!finalCheckoutPrice || !selectedDeliveryDate || !cartItems) return;

    try {
      setLoading(true);
      if (!token) return;
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          cartItems,
          finalCheckoutPrice,
          selectedDeliveryDate,
        }),
      });

      const data = await res.json();
      setOrderId(data.orderId);
      await refetchCartItems();
      await refetchOrders();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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
      refetchPaymentMethods(),
      refetchCartItems(),
      refetchOrders(),
    ]);
  }, [token]);

  useEffect(() => {
    refetchAll();
  }, [refetchAll]);

  // For handling checkout steps in cart page
  const handleStepNext = () => {
    if (step === "cart") setStep("checkout");
    else if (step === "checkout") setStep("order_placed");
  };

  const handleStepBack = () => {
    if (step === "order_placed") setStep("checkout");
    else if (step === "checkout") setStep("cart");
  };

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
        defaultAddress,
        defaultPayment,
        step,
        orders,
        adminOrders,
        adminUsers,
        cartTotalItems,
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
        addPaymentMethod,
        deletePayment,
        addToCart,
        removeFromCart,
        updateCart,
        refetchAddresses,
        refetchCartItems,
        refetchPaymentMethods,
        placeOrder,
        refetchAll,
        setStep,
        handleStepNext,
        handleStepBack,
        getOrders,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
