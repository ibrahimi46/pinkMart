"use client";

import BackButton from "../BackButton";
import ForwardButton from "../ForwardButton";
import { useRef, useContext } from "react";
import Loading from "../Loading";
import ProductCard from "../ProductCard";
import { ProductsContext } from "@/app/context/ProductsContext";
import { CartContext } from "@/app/context/CartContext";

interface BestSellerProps {
  title: string;
  withBorder: boolean;
}

const BestSeller = ({ title, withBorder }: BestSellerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const productContext = useContext(ProductsContext);
  const { products } = productContext!;
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext!;

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

  return (
    <div
      className={`flex flex-col gap-2 h-auto rounded-3xl  ${
        withBorder && "border border-black-100 bg-white p-4"
      }`}
    >
      {cartContext?.loading && <Loading />}
      <div className="flex justify-between items-end">
        <h1 className="text-body-lg font-bold">{title}</h1>
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
        {products &&
          products.map((item) => {
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

export default BestSeller;
