import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { User, Orders } from "@/types";

interface AdminContextProps {
  orders: Orders[] | null;
  users: User[];
  loading: boolean;
  setLoading: (value: boolean) => void;
  getUsersList: () => Promise<void>;
  getOrders: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextProps | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const authContext = useContext(AuthContext);
  const { token, user } = authContext!;

  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Orders[] | null>(null);
  const [loading, setLoading] = useState(false);

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
      value={{ orders, users, loading, setLoading, getUsersList, getOrders }}
    >
      {children}
    </AdminContext.Provider>
  );
};
