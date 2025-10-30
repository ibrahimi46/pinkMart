"use client";
import Button from "../Button";
import BackButton from "../BackButton";
import assets from "@/assets";
import ForwardButton from "../ForwardButton";
import Image from "next/image";
import { useRef, useContext } from "react";
import useProducts from "@/app/utils/useProducts";
import { UserDataContext } from "@/app/context/UserDataContext";

interface BestSellerProps {
  title: string;
}

interface CardsItemProps {
  name: string;
  icon: string;
  currentPrice: number;
  oldPrice: number;
  capacity: number;
  addToCart: () => void;
}

const CardsItem = ({
  name,
  icon,
  currentPrice,
  oldPrice,
  capacity,
  addToCart,
}: CardsItemProps) => {
  return (
    <div className="flex flex-col gap-2 justify-between h-64 w-36">
      {/** Item image container */}
      <div className="sm:h-32 sm:w-36 h-24 w-24 relative flex items-center justify-center">
        <Image src={icon} fill alt="" className="rounded-3xl" />
        <div className="absolute sm:hidden bottom-2 right-2 bg-black-100 border border-primary-600 rounded-full p-1">
          <Image src={assets.icons.plus} height={10} width={10} alt="close" />
        </div>
      </div>
      {/** Info container */}
      <div className="h-32 flex flex-col justify-between">
        <div className="flex flex-col ml-1 h-20">
          <p className="sm:text-body-lg text-body-md whitespace-nowrap overflow-hidden truncate">
            {name}
          </p>
          <div className="flex gap-2">
            <p className="font-bold text-body-sm">{`$${currentPrice}/Kg`}</p>
            <p className="text-body-sm line-through">{`$${oldPrice}/Kg`}</p>
          </div>
          <p className="text-primary-600 sm:text-body-lg text-body-md">{`${capacity} Left`}</p>
        </div>
        <div
          className="hidden sm:flex gap-2 bg-primary-600 px-2 border py-1 rounded-full justify-center
      transition-all duration-300 hover:bg-primary-500 hover:border hover:border-primary-700
      "
          onClick={addToCart}
        >
          <Image
            src={assets.icons.cart}
            height={15}
            width={15}
            alt="cart"
            className="filter invert"
          />
          <p className="text-body-md text-white font-semibold cursor-pointer ">
            Add to Cart
          </p>
        </div>
      </div>
    </div>
  );
};

const BestSeller = ({ title }: BestSellerProps) => {
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
    <div className="flex flex-col gap-6 border border-black-100 p-4 rounded-3xl bg-white">
      <div className="flex justify-between items-end">
        <h1 className="text-body-lg font-bold">{title}</h1>
        <div className="sm:flex hidden items-center gap-6">
          <Button
            name="View All(+40)"
            icon={assets.icons.arrow_right}
            iconPosition="right"
            textStyles="text-body-sm"
            extraStyles="px-4 border border-primary-600 bg-white h-8"
          />
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
              <CardsItem
                key={item.id}
                name={item.name}
                icon={item.imageUrl}
                currentPrice={parseInt(item.price)}
                oldPrice={3.99}
                capacity={item.stock}
                addToCart={() => {
                  addToCart(item.id, defaultQuantity);
                  console.log("clicked");
                }}
              />
            );
          })}
      </div>
    </div>
  );
};

export default BestSeller;
