"use client";
import Button from "../Button";
import BackButton from "../BackButton";
import assets from "@/assets";
import ForwardButton from "../ForwardButton";
import Image from "next/image";
import { useRef } from "react";

interface CardsItemProps {
  name: string;
  icon: string;
  currentPrice: number;
  oldPrice: number;
  capacity: number;
}

const CardsItem = ({
  name,
  icon,
  currentPrice,
  oldPrice,
  capacity,
}: CardsItemProps) => {
  return (
    <div className="flex flex-col gap-2">
      <div className="bg-primary-100 sm:h-36 sm:w-36 h-24 w-24 rounded-3xl flex items-center justify-center">
        <Image src={icon} height={100} width={100} alt="" />
      </div>
      <div className="flex flex-col ml-1">
        <p className="sm:text-body-xl text-body-lg">{name}</p>
        <div className="flex gap-2">
          <p className="font-bold text-body-sm">{`$${currentPrice}/Kg`}</p>
          <p className="text-body-sm line-through">{`$${oldPrice}/Kg`}</p>
        </div>
        <p className="text-primary-600">{`${capacity} Left`}</p>
      </div>
    </div>
  );
};

const BestSeller = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

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
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end">
        <h1 className="text-body-lg font-bold">Best Seller</h1>
        <div className="flex items-center gap-6">
          <Button
            name="View All(+40)"
            icon={assets.icons.arrow_right}
            iconPosition="right"
            href=""
            textStyles="text-body-sm"
            extraStyles="px-4 border border-primary-600 bg-black-50 h-8"
          />
          <div className="flex gap-2">
            <BackButton handleBack={() => scroll("left")} />
            <ForwardButton handleForward={() => scroll("right")} />
          </div>
        </div>
      </div>
      <div className="flex gap-4 overflow-auto scrollbar-hide" ref={scrollRef}>
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
        <CardsItem
          name="Strawberry"
          icon={assets.home.best_sellers.img2}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={38}
        />
        <CardsItem
          name="Lemon"
          icon={assets.home.best_sellers.img3}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={87}
        />
        <CardsItem
          name="Lemon"
          icon={assets.home.best_sellers.img3}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={87}
        />
        <CardsItem
          name="Lemon"
          icon={assets.home.best_sellers.img3}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={87}
        />
        <CardsItem
          name="Lemon"
          icon={assets.home.best_sellers.img3}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={87}
        />
        <CardsItem
          name="Lemon"
          icon={assets.home.best_sellers.img3}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={87}
        />
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
        <CardsItem
          name="Orange"
          icon={assets.home.best_sellers.img1}
          currentPrice={2.71}
          oldPrice={3.99}
          capacity={180}
        />
      </div>
    </div>
  );
};

export default BestSeller;
