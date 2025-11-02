import { createContext } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  imageUrl: string;
}

interface ProductsProps {
  products: Product[];
}

export const ProductsContext = createContext<ProductsProps | null>(null);

export const ProductProvider;
