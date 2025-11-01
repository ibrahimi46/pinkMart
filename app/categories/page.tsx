"use client";
import React, { useContext } from "react";
import CategoryStrip from "../components/home-components/CategoryStrip";
import useCategories from "../utils/useCategories";
import ProductCard from "../components/ProductCard";
import useProducts from "../utils/useProducts";
import { UserDataContext } from "../context/UserDataContext";
import Loading from "../components/Loading";

const CategoriesPage = () => {
  const { categories } = useCategories();
  const { products } = useProducts();
  const context = useContext(UserDataContext);
  const { addToCart, loading } = context!;

  return (
    <main className="flex gap-4 mx-4">
      {loading && <Loading />}
      <div className="w-60 h-[600px] hidden md:flex flex-shrink-0">
        left sidebar
      </div>
      <div className="flex-1 flex flex-col gap-4 min-w-0">
        <div className="px-4">
          <CategoryStrip categories={categories} />
        </div>
        <hr />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-x-4 md:gap-y-8 p-4 overflow-y-auto scrollbar-hide">
          {products &&
            products.length &&
            products.map((product) => {
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
