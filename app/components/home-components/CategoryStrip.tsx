"use client";
import capitalizor from "@/app/utils/capitalizor";
import Button from "../Button";
import assets from "@/assets";
import { useRef } from "react";
import BackButton from "../BackButton";
import ForwardButton from "../ForwardButton";
import { useRouter } from "next/navigation";

type CategoryStripProps = {
  categories: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  redirectOnClick?: boolean;
};

const CategoryIcons: Record<string, string> = {
  "Fresh Fruits": assets.home.category_strip.fruits,
  "Fresh Vegetables": assets.home.category_strip.vegetables,
  "Dairy Products": assets.home.category_strip.dairyProducts,
  "Meat & Poultry": assets.home.category_strip.meatPoultry,
  "Breakfast Foods": assets.home.category_strip.breakfast,
  "Pasta & Noodles": assets.home.category_strip.pasta_noodles,
  "Rice, Grains & Legumes": assets.home.category_strip.grains,
  Seafood: assets.home.category_strip.seafood,
  Bakery: assets.home.category_strip.bakery,
};

const CategoryStrip = ({
  categories,
  selectedCategory,
  redirectOnClick,
  setSelectedCategory,
}: CategoryStripProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

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
          handleOnClick={() => {
            if (redirectOnClick) {
              router.push("/categories");
            } else {
              setSelectedCategory("");
            }
          }}
        />
        {categories &&
          categories?.map((item, idx) => (
            <Button
              key={idx}
              name={capitalizor(item)}
              icon={CategoryIcons[item]}
              iconStyle="h-6 w-6"
              iconPosition="left"
              textStyles="text-body-md text-nowrap"
              extraStyles={`h-10 min-w-14 max-w-46 px-3 bg-white border hover:border-primary-600 transition-all duration-300 flex-shrink-0
              ${selectedCategory === item && "border-primary-600"}
            `}
              handleOnClick={() => {
                if (redirectOnClick) {
                  router.push(`/categories?category=${item}`);
                } else {
                  setSelectedCategory(item);
                }
              }}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryStrip;
