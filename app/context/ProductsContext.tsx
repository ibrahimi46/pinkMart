import React, { createContext, useCallback, useEffect } from "react";
import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  oldPrice: string;
  currentPrice: string;
  stock: number;
  imageUrl: string;
}

interface ProductsProps {
  products: Product[];
  loading: boolean;
  refetchProducts: () => Promise<void>;
}

export const ProductsContext = createContext<ProductsProps | null>(null);

export const ProductProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, loading, refetchProducts: fetchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
