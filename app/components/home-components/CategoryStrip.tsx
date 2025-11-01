"use client";
import capitalizor from "@/app/utils/capitalizor";
import Button from "../Button";
import assets from "@/assets";
import { useRef } from "react";
import BackButton from "../BackButton";
import ForwardButton from "../ForwardButton";

type CategoryStripProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
};

const CategoryIcons: Record<string, string> = {
  drinks: assets.home.category_strip.drinks,
  carrot: assets.home.category_strip.carrot,
  cans: assets.home.category_strip.cans,
  cheese: assets.home.category_strip.cheese,
  yoghurt: assets.home.category_strip.yoghurt,
  watermelon: assets.home.category_strip.watermelon,
  cake: assets.home.category_strip.cake,
  bread: assets.home.category_strip.bread,
  snacks: assets.home.category_strip.snacks,
  apple: assets.home.category_strip.apple,
  vegetables: assets.home.category_strip.vegetables,
  candy: assets.home.category_strip.candy,
};

const CategoryStrip = ({
  categories,
  selectedCategory,
  setSelectedCategory,
}: CategoryStripProps) => {
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
    <div className="flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <h1 className="text-body-lg font-bold">Categories</h1>
        <div className="flex items-center gap-6">
          <div className="flex gap-2">
            <BackButton handleBack={() => scroll("left")} />
            <ForwardButton handleForward={() => scroll("right")} />
          </div>
        </div>
      </div>
      <div
        className="flex gap-4 overflow-x-auto scrollbar-hide"
        ref={scrollRef}
      >
        <Button
          name="All"
          icon="#"
          extraStyles="px-6 border border-black-400 flex-shrink-0"
          handleOnClick={() => setSelectedCategory("")}
        />
        {categories &&
          categories?.map((item, idx) => (
            <Button
              key={idx}
              name={capitalizor(item)}
              icon={CategoryIcons[item]}
              iconPosition="left"
              textStyles="text-body-md"
              extraStyles={`h-10 min-w-14 max-w-28 px-6 bg-white border hover:border-primary-600 transition-all duration-300 flex-shrink-0
              ${selectedCategory === item && "border-primary-600"}
            `}
              handleOnClick={() => {
                setSelectedCategory(item);
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryStrip;
