import {
  createContext,
  useState,
  useEffect,
  useContext,
  useMemo,
  useCallback,
} from "react";
import { Orders, Address } from "@/types";
import { AuthContext } from "./AuthContext";

interface UserAccountContextType {
  loading: boolean;
  addresses: Address[];
  defaultAddress: Address | null;
  orders: Orders[];
  getAddresses: () => void;
  addAddress: (address: Address) => Promise<void>;
  deleteAddress: (id: number) => Promise<void>;
  refetchAddresses: () => Promise<void>;
  refetchOrders: () => Promise<void>;
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
  const authContext = useContext(AuthContext);
  const { token } = authContext!;

  const [loading, setLoading] = useState(false);
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [orders, setOrders] = useState<Orders[]>([]);

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

  const getAddresses = useCallback(async () => {
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
  }, [token]);

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

  const getOrders = useCallback(async () => {
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
  }, [token]);

  const refetchOrders = async () => {
    await getOrders();
  };

  useEffect(() => {
    if (token) {
      getAddresses();
      getOrders();
    }
  }, [token, getAddresses, getOrders]);

  return (
    <UserAccountContext.Provider
      value={{
        loading,
        addresses,
        defaultAddress,
        orders,
        getOrders,
        refetchOrders,
        addAddress,
        getAddresses,
        deleteAddress,
        refetchAddresses,
      }}
    >
      {children}
    </UserAccountContext.Provider>
  );
};
