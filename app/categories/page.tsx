"use client";

import React, { useContext, useState } from "react";
import CategoryStrip from "../components/home-components/CategoryStrip";
import useCategories from "../utils/useCategories";
import ProductCard from "../components/ProductCard";
import Loading from "../components/Loading";
import { useSearchParams } from "next/navigation";
import FilterSidebar from "./components/FilterSidebar";
import { Suspense } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { SearchContext } from "../context/SearchContext";
import NoDataPlaceholder from "../account/components/NoDataPlaceholder";
import assets from "@/assets";
import { CartContext } from "../context/CartContext";
import { useProductFilter } from "../utils/useProductFilter";

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

  const { categories } = useCategories();

  const productContext = useContext(ProductsContext);
  const { products } = productContext!;
  const cartContext = useContext(CartContext);
  const { addToCart, loading } = cartContext!;
  const searchContext = useContext(SearchContext);
  const { searchQuery } = searchContext!;

  const { filteredProducts, setPriceFilter, setStockFilter } = useProductFilter(
    products,
    searchQuery,
    selectedCategory
  );

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

        {filteredProducts.length > 0 ? (
          <div
            className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6  gap-x-4
         md:gap-y-8 p-4 overflow-y-auto scrollbar-hide"
          >
            {filteredProducts.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  icon={product.imageUrl}
                  name={product.name}
                  currentPrice={Number(product.currentPrice)}
                  oldPrice={Number(product.oldPrice)}
                  capacity={Number(product.stock)}
                  addToCart={() => addToCart(product.id, 1)}
                />
              );
            })}
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="w-96">
              <NoDataPlaceholder
                icon={assets.icons.close}
                field1="No products found"
                field2="Try adjusting your filters"
                btnName="Clear Filters"
                handleAction={() => {}}
              />
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoriesPage;
