"use client";
import BestSeller from "./components/home-components/BestSeller";
import CategoryStrip from "./components/home-components/CategoryStrip";
import TwoColumnGrid from "./components/home-components/TwoColumnGrid";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "./context/SearchContext";
import SearchPage from "./components/home-components/SearchPage";
import WelcomeModal from "./components/WelcomeModal";
import CategoryProducts from "./components/home-components/CategoryProducts";

export default function Home() {
  const [categories, setCategories] = useState([]);
  const searchContext = useContext(SearchContext);
  const { showSearchPage } = searchContext!;

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch(`/api/categories`, {
        cache: "no-store",
      });
      const data = await res.json();
      setCategories(data);
    };
    fetchCategories();
  }, []);

  return (
    <main className="md:px-10 px-6 mb-6 flex flex-col gap-12">
      <WelcomeModal />
      {showSearchPage ? (
        <SearchPage />
      ) : (
        <>
          <TwoColumnGrid />
          <CategoryStrip
            categories={categories}
            redirectOnClick={true}
            selectedCategory=""
            setSelectedCategory={() => {}}
          />
          <BestSeller title="Best Seller" withBorder={false} />
          {categories &&
            categories.slice(0, 5).map((category) => {
              return (
                <CategoryProducts
                  key={category}
                  categoryName={category}
                  withBorder={false}
                />
              );
            })}
        </>
      )}
    </main>
  );
}
