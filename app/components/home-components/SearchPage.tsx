import { useEffect, useState, useContext } from "react";
import { UserDataContext } from "@/app/context/UserDataContext";
import Loading from "../Loading";
import FilterSidebar from "@/app/categories/components/FilterSidebar";
import ProductCard from "../ProductCard";
import { useSearchParams } from "next/navigation";
import { ProductsContext } from "@/app/context/ProductsContext";
import NoDataPlaceholder from "@/app/account/components/NoDataPlaceholder";
import assets from "@/assets";
import { SearchContext } from "@/app/context/SearchContext";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  currentPrice: string;
  oldPrice?: string;
  stock: number;
  imageUrl: string;
}

// later dont forget to optimize this and categories page cause both do the same thing on mount
const SearchPage = () => {
  const searchParams = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>(
    searchParams.get("category") || ""
  );
  const [priceFilter, setPriceFilter] = useState({ min: 0, max: 100 });
  const [stockFilter, setStockFilter] = useState(false);

  const context = useContext(UserDataContext);
  const productContext = useContext(ProductsContext);
  const searchContext = useContext(SearchContext);
  const { products } = productContext!;
  const { addToCart, loading } = context!;
  const { searchQuery } = searchContext!;

  useEffect(() => {
    if (!products) return;
    let filtered = selectedCategory
      ? products.filter((product) => product.category === selectedCategory)
      : products;

    if (searchQuery) {
      filtered = filtered.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    filtered = filtered.filter(
      (product) =>
        Number(product.currentPrice) >= priceFilter.min &&
        Number(product.currentPrice) <= priceFilter.max
    );

    if (stockFilter) {
      filtered = filtered.filter((product) => product.stock > 0);
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceFilter, stockFilter, searchQuery]);

  return (
    <div className="flex gap-4">
      {loading && <Loading />}
      <div className="w-60 h-[600px] hidden md:flex bg-primary-50 flex-shrink-0">
        <FilterSidebar
          onPriceFilter={(min, max) => setPriceFilter({ min, max })}
          onStockFilter={setStockFilter}
        />
      </div>

      {filteredProducts && filteredProducts.length > 0 ? (
        <div
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-x-4
         md:gap-y-8 p-4 overflow-y-auto scrollbar-hide 2xl:grid-cols-7"
        >
          {filteredProducts.map((product) => {
            return (
              <ProductCard
                key={product.id}
                icon={product.imageUrl}
                name={product.name}
                currentPrice={Number(product.currentPrice).toFixed(2)}
                oldPrice={Number(product.oldPrice).toFixed(2)}
                capacity={product.stock}
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
