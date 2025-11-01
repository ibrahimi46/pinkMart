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
  

  const fetchProducts = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products", {
        method: "GET",
      });

      const data = await res.json();
      setProducts(data.products || []);
    } catch (err) {
      console.error("Failed to fetch products:", err);
    } finally {
      setLoading(false);
    }
  }, []);

 
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts])

  return { products, loading, refetchProducts: fetchProducts };
};

export default useProducts;