"use client";
import BackButton from "../BackButton";
import ForwardButton from "../ForwardButton";
import { useRef, useContext } from "react";
import useProducts from "@/app/utils/useProducts";
import { UserDataContext } from "@/app/context/UserDataContext";
import Loading from "../Loading";
import ProductCard from "../ProductCard";

interface BestSellerProps {
  title: string;
  withBorder: boolean;
}

const BestSeller = ({ title, withBorder }: BestSellerProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { products } = useProducts();
  const context = useContext(UserDataContext);
  const { addToCart } = context!;
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
      className={`flex flex-col gap-6 ${
        withBorder && "border border-black-100 p-4 rounded-3xl bg-white"
      }`}
    >
      {context?.loading && <Loading />}
      <div className="flex justify-between items-end">
        <h1 className="text-body-lg font-bold">{title}</h1>
        <div className="sm:flex hidden items-center gap-6">
          <div className="flex gap-2">
            <BackButton handleBack={() => scroll("left")} />
            <ForwardButton handleForward={() => scroll("right")} />
          </div>
        </div>
      </div>
      <div className="flex gap-4 overflow-auto scrollbar-hide" ref={scrollRef}>
        {products &&
          products.map((item) => {
            return (
              <ProductCard
                key={item.id}
                name={item.name}
                icon={item.imageUrl}
                currentPrice={Number(item.price).toFixed(2)}
                oldPrice={3.99}
                capacity={item.stock}
                addToCart={() => {
                  addToCart(item.id, defaultQuantity);
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BestSeller;
