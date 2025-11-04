import { useContext, useState } from "react";
import Loading from "../Loading";
import FilterSidebar from "@/app/categories/components/FilterSidebar";
import ProductCard from "../ProductCard";
import { useSearchParams } from "next/navigation";
import { ProductsContext } from "@/app/context/ProductsContext";
import NoDataPlaceholder from "@/app/account/components/NoDataPlaceholder";
import assets from "@/assets";
import { SearchContext } from "@/app/context/SearchContext";
import { CartContext } from "@/app/context/CartContext";
import { useProductFilter } from "@/app/utils/useProductFilter";

// optimized (:
const SearchPage = () => {
  const searchParams = useSearchParams();

  const cartContext = useContext(CartContext);
  const productContext = useContext(ProductsContext);
  const searchContext = useContext(SearchContext);
  const { products } = productContext!;
  const { addToCart, loading } = cartContext!;
  const { searchQuery } = searchContext!;

  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );

  const { filteredProducts, setPriceFilter, setStockFilter } = useProductFilter(
    products,
    searchQuery,
    selectedCategory
  );

  return (
    <div className="flex gap-4">
      {loading && <Loading />}
      <div className="w-60 h-[600px] hidden md:flex bg-primary-50 flex-shrink-0">
        <FilterSidebar
          onPriceFilter={(min, max) => setPriceFilter({ min, max })}
          onStockFilter={setStockFilter}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4
         md:gap-y-8 p-4 overflow-y-auto scrollbar-hide 2xl:grid-cols-7 auto-rows-min"
        >
          {filteredProducts.map((product) => {
            return (
              <ProductCard
                key={product.id}
                icon={product.imageUrl}
                name={product.name}
                currentPrice={Number(product.currentPrice)}
                oldPrice={Number(product.oldPrice)}
                capacity={Number(product.stock)}
                addToCart={() => addToCart(product.id, 1)}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex-1 flex items-center justify-center">
          <div className="w-96">
            <NoDataPlaceholder
              icon={assets.icons.close}
              field1="No products found"
              field2="Try adjusting your filters"
              btnName="Clear Filters"
              handleAction={() => {}}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
