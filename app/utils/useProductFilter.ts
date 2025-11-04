import { useState, useEffect } from "react";
import { Product } from "@/types";

export const useProductFilter = (products: Product[],
  searchQuery: string,
  selectedCategory: string) => {

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [priceFilter, setPriceFilter] = useState({ min: 0, max: 100 });
    const [stockFilter, setStockFilter] = useState(false);


    useEffect(() => {
    if (!products) return;
    let filtered = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (product) =>
        Number(product.currentPrice) >= priceFilter.min &&
        Number(product.currentPrice) <= priceFilter.max
    );

    if (stockFilter) {
      filtered = filtered.filter((product) => Number(product.stock) > 0);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceFilter, stockFilter, searchQuery]);

  return {filteredProducts, setPriceFilter, setStockFilter}
}


