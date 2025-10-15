import Button from "../Button";
import assets from "@/assets";

const categories = [
  { name: "Bread", icon: assets.home.category_strip.bread },
  { name: "Cheese", icon: assets.home.category_strip.cheese },
  { name: "Drinks", icon: assets.home.category_strip.drinks },
  { name: "Apple", icon: assets.home.category_strip.apple },
  { name: "Cake", icon: assets.home.category_strip.cake },
  { name: "Snacks", icon: assets.home.category_strip.snacks },
  { name: "Watermelon", icon: assets.home.category_strip.watermelon },
  { name: "Candy", icon: assets.home.category_strip.candy },
  { name: "Carrot", icon: assets.home.category_strip.carrot },
  { name: "Vegetables", icon: assets.home.category_strip.vegetables },
  { name: "Cans", icon: assets.home.category_strip.cans },
  { name: "Cheese", icon: assets.home.category_strip.cheese },
];

const CategoryStrip = () => {
  return (
    <div className="flex gap-4 h-20 items-center overflow-auto scrollbar-hide">
      {categories.map((item, idx) => (
        <Button
          key={idx}
          name={item.name}
          icon={item.icon}
          iconPosition="left"
          href=""
          textStyles="text-body-md"
          extraStyles="px-6 bg-black-50"
        />
      ))}
    </div>
  );
};

export default CategoryStrip;
