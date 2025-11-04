import {
  createContext,
  useState,
  useCallback,
  useContext,
  useMemo,
} from "react";
import { CartItem } from "@/types";
import { AuthContext } from "./AuthContext";

interface CartContextType {
  cartItems: CartItem[];
  cartTotal: number;
  cartTotalItems: number;
  step: string;
  loading: boolean;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCart: (productId: number, quantity: number) => Promise<void>;
  setStep: (value: string) => void;
  handleStepNext: (step: string) => void;
  refetchCartItems: () => Promise<void>;
  setLoading: (value: boolean) => void;
}

export const CartContext = createContext<CartContextType | null>(null);

export const CartContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const authContext = useContext(AuthContext);
  const { token } = authContext!;

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [step, setStep] = useState<string>("cart");
  const [loading, setLoading] = useState<boolean>(false);

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

  const cartTotalItems = useMemo(() => {
    return cartItems.reduce((total, item) => total + Number(item.quantity), 0);
  }, [cartItems]);

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

  // For handling checkout steps in cart page
  const handleStepNext = (value: string) => {
    if (value) {
      setStep(value);
    }
  };

  return (
    <CartContext.Provider
      value={{
        step,
        cartItems,
        cartTotal,
        loading,
        cartTotalItems,
        setLoading,
        addToCart,
        removeFromCart,
        updateCart,
        refetchCartItems,
        handleStepNext,
        setStep,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
