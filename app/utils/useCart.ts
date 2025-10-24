import { useCallback, useEffect, useState } from "react";

interface CartItem {
  id: number;
  cartId: number;
  productId: number;
  quantity: number;
  addedAt: string;
}

interface UseCartReturn {
  loading: boolean;
  cartItems: CartItem[];
  refetchCart: () => Promise<void>;
  addToCart: (productId: number, quantity: number) => Promise<void>;
  removeFromCart: (productId: number) => Promise<void>;
  updateCart: (productId: number, quantity: number) => Promise<void>;
}

const useCart = (): UseCartReturn => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // ✅ safely get token client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  // ✅ Fetch cart
  const fetchCart = useCallback(async () => {
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

  // ✅ Add to cart
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
        await fetchCart();
      } catch (err) {
        console.error("Error adding to cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, fetchCart]
  );

  // ✅ Remove from cart
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
      } catch (err) {
        console.error("Error removing from cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token]
  );

  // ✅ Update quantity
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
        await fetchCart();
      } catch (err) {
        console.error("Error updating cart:", err);
      } finally {
        setLoading(false);
      }
    },
    [token, fetchCart]
  );

  return {
    cartItems,
    loading,
    refetchCart: fetchCart,
    addToCart,
    removeFromCart,
    updateCart,
  };
};

export default useCart;