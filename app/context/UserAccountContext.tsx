import { createContext, useState, useEffect, useContext } from "react";
import { Orders, Address } from "@/types";
import { AuthContext } from "./AuthContext";

interface UserAccountContextType {
  addresses: Address[];
  defaultAddress: Address | null;
  orders: Orders[];
  getAddresses: () => void;
  addAddress: (address: Address) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  refetchAddresses: () => Promise<void>;
  getOrders: () => Promise<void>;
}

export const UserAccountContext = createContext<UserAccountContextType | null>(
  null
);

export const UserAccountContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);

  const authContext = useContext(AuthContext);
  const { token } = authContext!;

  useEffect(() => {
    if (token) {
      getAddresses();
      getOrders();
    }
  }, [token]);

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

  return <UserAccountContextProvider>{children}</UserAccountContextProvider>;
};
