import { useState, useEffect, useCallback } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  imageUrl: string;
}

interface UseProductsReturnProps {
  products: Product[];
  loading: boolean;
  refetchProducts: () => Promise<void>;
}

const useProducts = (): UseProductsReturnProps => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // ✅ safely get token client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  const fetchProducts = useCallback(async () => {
    if (!token) return;
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        headers: { Authorization: `Bearer ${token}` },
        method: "GET",
      });

      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (token) fetchProducts();
  }, [token, fetchProducts]);

  return { products, loading, refetchProducts: fetchProducts };
};

export default useProducts;