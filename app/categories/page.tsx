"use client";
import React, { useContext, useEffect, useState } from "react";
import CategoryStrip from "../components/home-components/CategoryStrip";
import useCategories from "../utils/useCategories";
import ProductCard from "../components/ProductCard";
import useProducts from "../utils/useProducts";
import { UserDataContext } from "../context/UserDataContext";
import Loading from "../components/Loading";
import { useSearchParams } from "next/navigation";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: string;
  stock: number;
  imageUrl: string;
}

const CategoriesPage = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const { categories } = useCategories();
  const { products } = useProducts();
  const context = useContext(UserDataContext);
  const { addToCart, loading } = context!;

  useEffect(() => {
    if (!products) return;
    const filtered = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;
    setFilteredProducts(filtered);
  }, [products, selectedCategory]);

  return (
    <main className="flex gap-4 mx-4">
      {loading && <Loading />}
      <div className="w-60 h-[600px] hidden md:flex bg-primary-50 flex-shrink-0">
        left sidebar
      </div>
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="px-4">
          <CategoryStrip
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
        </div>
        <hr />
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-x-4
         md:gap-y-8 p-4 overflow-y-auto scrollbar-hide"
        >
          {filteredProducts &&
            filteredProducts.length &&
            filteredProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  icon={product.imageUrl}
                  name={product.name}
                  currentPrice={Number(product.price).toFixed(2)}
                  capacity={product.stock}
                  addToCart={() => addToCart(product.id, 1)}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
};

export default CategoriesPage;
