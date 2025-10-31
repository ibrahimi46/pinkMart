"use client";
import capitalizor from "@/app/utils/capitalizor";
import Button from "../Button";
import assets from "@/assets";

type CategoryStripProps = {
  categories: string[];
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

const CategoryStrip = ({ categories }: CategoryStripProps) => {
  return (
    <div className="flex flex-wrap gap-4 sm:flex-nowrap sm:overflow-x-auto h-auto sm:h-20 overflow-hidden items-center scrollbar-hide">
      {categories &&
        categories?.map((item, idx) => (
          <Button
            key={idx}
            name={capitalizor(item)}
            icon={CategoryIcons[item]}
            iconPosition="left"
            textStyles="text-body-md"
            extraStyles="h-10 min-w-14 max-w-28 px-6 bg-white border hover:border-primary-600 transition-all duration-300"
          />
        ))}
    </div>
  );
};

export default CategoryStrip;
