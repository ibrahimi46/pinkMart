import { createContext, useContext, useEffect, useState } from "react";
import { UserDataContext } from "./UserDataContext";

interface Order {
  id: number;
  userId: number;
  totalAmount: number;
  status: string;
  deliveryDate: string;
  createdAt: string;
  itemCount: number;
  fullName: string;
}

interface User {
  userId: string;
  isAdmin: boolean;
  full_name?: string;
}

interface AdminContextProps {
  orders: Order[] | null;
  users: User[];
  getUsersList: () => Promise<void>;
  getOrders: () => Promise<void>;
}

export const AdminContext = createContext<AdminContextProps | null>(null);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<User[]>([]);
  const [orders, setOrders] = useState<Order[] | null>(null);

  const context = useContext(UserDataContext);
  const { token } = context!;

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
    getUsersList();
    getOrders();
  }, [token]);

  return (
    <AdminContext.Provider value={{ orders, users, getUsersList, getOrders }}>
      {children}
    </AdminContext.Provider>
  );
};
