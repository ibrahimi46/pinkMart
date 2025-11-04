import {
  ReactNode,
  useState,
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from "react";
import { Orders, CartItem, AdminOrder, AdminUser, Address } from "@/types";
import { AuthContext } from "./AuthContext";

interface UserDataContextType {
  loading: boolean;

  adminOrders: AdminOrder[];
  adminUsers: AdminUser[];

  setLoading: (value: boolean) => void;
  fetchAdminUsers: () => void;
  updateUserRole: (userId: number, isAdmin: boolean) => void;
  getAdminUserDetails: (userId: number) => Promise<AdminUser | null>;

  fetchAdminOrders: () => void;
  updateOrderStatus: (orderId: number, status: string) => void;
  getOrderDetails: (orderId: number) => Promise<AdminOrder | null>;

  refetchAll: () => Promise<void>;
}

export const UserDataContext = createContext<UserDataContextType | null>(null);

export const UserDataProvider = ({ children }: { children: ReactNode }) => {
  // Get auth data from AuthContext
  const authContext = useContext(AuthContext);
  const { token, user } = authContext!;

  // States
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);

  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([]);

  const [loading, setLoading] = useState(false);

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

  return (
    <UserDataContext.Provider
      value={{
        loading,

        adminOrders,
        adminUsers,
        cartTotalItems,
        setLoading,
        fetchAdminUsers,
        updateUserRole,
        getAdminUserDetails,
        updateOrderStatus,
        getOrderDetails,
        fetchAdminOrders,
        refetchAll,
      }}
    >
      {children}
    </UserDataContext.Provider>
  );
};
