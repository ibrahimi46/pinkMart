"use client";

import BackButton from "../BackButton";
import ForwardButton from "../ForwardButton";
import { useRef, useContext } from "react";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import { CartContext } from "@/app/context/CartContext";
import { Product } from "@/types";
import { useState, useEffect } from "react";
import capitalizor from "@/app/utils/capitalizor";

interface CategoryProductsProps {
  categoryName: string;
  withBorder?: boolean;
}

const CategoryProducts = ({
  categoryName,
  withBorder,
}: CategoryProductsProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const [categoryProducts, setCategoryProducts] = useState<Product[]>([]);

  const cartContext = useContext(CartContext);
  const { addToCart, loading } = cartContext!;

  const defaultQuantity = 1;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft } = scrollRef.current;
      const scrollAmount = 160;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollLeft - scrollAmount
            : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await fetch(
          `/api/products?category=${encodeURIComponent(categoryName)}`
        );
        const data = await res.json();
        if (data) setCategoryProducts(data.products || []);
      } catch (err) {
        console.error(err);
      }
    };
    fetchCategoryProducts();
  }, [categoryName]);

  return (
    <div
      className={`flex flex-col gap-2 h-auto rounded-3xl  ${
        withBorder && "border border-black-100 bg-white p-4"
      }`}
    >
      {cartContext?.loading && <Loading />}
      <div className="flex justify-between items-end">
        <h1 className="text-body-lg font-bold">{capitalizor(categoryName)}</h1>
        <div className="sm:flex hidden items-center gap-6">
          <div className="flex gap-2">
            <BackButton handleBack={() => scroll("left")} />
            <ForwardButton handleForward={() => scroll("right")} />
          </div>
        </div>
      </div>
      <div
        className="flex gap-4 h-72 overflow-auto scrollbar-hide items-center"
        ref={scrollRef}
      >
        {categoryProducts &&
          categoryProducts.map((item) => {
            return (
              <div key={item.id} className="w-36 h-64 flex-shrink-0">
                <ProductCard
                  name={item.name}
                  icon={item.imageUrl}
                  currentPrice={Number(item.currentPrice)}
                  oldPrice={Number(item.oldPrice)}
                  capacity={Number(item.stock)}
                  addToCart={() => {
                    addToCart(item.id, defaultQuantity);
                  }}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default CategoryProducts;
