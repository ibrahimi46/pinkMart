"use client";
import React, { useContext, useEffect, useState } from "react";
import CategoryStrip from "../components/home-components/CategoryStrip";
import useCategories from "../utils/useCategories";
import ProductCard from "../components/ProductCard";
import { UserDataContext } from "../context/UserDataContext";
import Loading from "../components/Loading";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "./components/FilterSidebar";
import { Suspense } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { SearchContext } from "../context/SearchContext";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  currentPrice: number;
  oldPrice: number;
  stock: number;
  imageUrl: string;
}

const CategoriesPage = () => {
  return (
    <Suspense fallback={<Loading />}>
      <CategoriesPageContent />
    </Suspense>
  );
};

const CategoriesPageContent = () => {
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 100 });
  const [stockFilter, setStockFilter] = useState(false);

  const { categories } = useCategories();
  const productContext = useContext(ProductsContext);
  const { products } = productContext!;
  const context = useContext(UserDataContext);
  const { addToCart, loading } = context!;
  const searchContext = useContext(SearchContext);
  const { searchQuery } = searchContext!;

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
      filtered = filtered.filter((product) => product.stock > 0);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceFilter, stockFilter, searchQuery]);

  return (
    <main className="flex gap-4 mx-4">
      {loading && <Loading />}
      <div className="w-60 h-[600px] hidden md:flex bg-primary-50 flex-shrink-0">
        <FilterSidebar
          onPriceFilter={(min, max) => setPriceFilter({ min, max })}
          onStockFilter={setStockFilter}
        />
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
                  currentPrice={product.currentPrice}
                  oldPrice={product.oldPrice}
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
