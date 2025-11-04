import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { AuthContext } from "./AuthContext";
import { User, Orders, AdminOrder, AdminUser } from "@/types";

interface AdminContextProps {
  orders: Orders[] | null;
  users: User[];
  loading: boolean;
  adminOrders: AdminOrder[];
  adminUsers: AdminUser[];
  fetchAdminUsers: () => void;
  updateUserRole: (userId: number, isAdmin: boolean) => void;
  getAdminUserDetails: (userId: number) => Promise<AdminUser | null>;
  fetchAdminOrders: () => void;
  updateOrderStatus: (orderId: number, status: string) => void;
  getOrderDetails: (orderId: number) => Promise<AdminOrder | null>;
  setLoading: (value: boolean) => void;
  getUsersList: () => Promise<void>;
  getOrders: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextProps | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);
  const { token, user } = authContext!;

  const [users, setUsers] = useState<User[]>([]);
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([]);
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>([]);
  const [orders, setOrders] = useState<Orders[] | null>(null);
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

  const getUsersList = async () => {
    try {
      const resAll = await fetch("/api/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const allData = await resAll.json();
      setUsers(allData.users);
    } catch (err) {
      console.error(err);
    }
  };

  const getOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (data) {
        setOrders(data.result);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (token && user?.isAdmin) {
      getUsersList();
      getOrders();
    }
  }, [token, user]);

  return (
    <AdminContext.Provider
      value={{
        loading,
        users,
        adminUsers,
        orders,
        adminOrders,
        getAdminUserDetails,
        fetchAdminUsers,
        getOrderDetails,
        fetchAdminOrders,
        updateUserRole,
        updateOrderStatus,
        setLoading,
        getUsersList,
        getOrders,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};
