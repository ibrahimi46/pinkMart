import { useState } from "react";

interface FiltersSidebarProps {
  onPriceFilter: (min: number, max: number) => void;
  onStockFilter: (inStock: boolean) => void;
}

const FilterSidebar = ({
  onPriceFilter,
  onStockFilter,
}: FiltersSidebarProps) => {
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [inStockOnly, setInStockOnly] = useState(false);

  const handlePriceChange = (type: "min" | "max", value: string) => {
    const numValue = Math.max(0, Number(value)) || 0;
    const newRange = { ...priceRange, [type]: numValue };
    setPriceRange(newRange);
    onPriceFilter(newRange.min, newRange.max);
  };

  const handleStockToggle = () => {
    const value = !inStockOnly;
    setInStockOnly(value);
    onStockFilter(value);
  };

  const handleClearFilters = () => {
    setPriceRange({ min: 0, max: 0 });
    setInStockOnly(false);
    onPriceFilter(0, 100);
    onStockFilter(false);
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-body-lg font-bold">Filters</h2>
        <button
          onClick={handleClearFilters}
          className="text-body-sm text-primary-600 hover:text-primary-800 transition-all duration-300"
        >
          Clear All
        </button>
      </div>

      <hr />

      {/** Price Range */}
      <div className="flex flex-col gap-3">
        <h3 className="text-body-md font-semibold">Price Range</h3>
        <div className="flex gap-2 items-center">
          <input
            type="number"
            placeholder="Min"
            value={priceRange.min === 0 ? "" : priceRange.min}
            onChange={(e) => handlePriceChange("min", e.target.value)}
            className="w-full px-3 py-2 border border-black-300 rounded-lg text-body-sm outline-none focus:border-primary-600 transition-all duration-300"
          />
          <span className="text-black-400">-</span>
          <input
            type="number"
            placeholder="Max"
            value={priceRange.max === 0 ? "" : priceRange.max}
            onChange={(e) => handlePriceChange("max", e.target.value)}
            className="w-full px-3 py-2 border border-black-300 rounded-lg text-body-sm outline-none focus:border-primary-600 transition-all duration-300"
          />
        </div>
      </div>

      <hr />

      {/** Stock Availability */}
      <div className="flex flex-col gap-3">
        <h3 className="text-body-md font-semibold">Availability</h3>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={inStockOnly}
            onChange={handleStockToggle}
            className="w-4 h-4 accent-primary-600"
          />
          <span className="text-body-sm">In Stock Only</span>
        </label>
      </div>
    </div>
  );
};

export default FilterSidebar;
