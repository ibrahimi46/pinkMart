"use client";
import BestSeller from "./components/home-components/BestSeller";
import CategoryStrip from "./components/home-components/CategoryStrip";
import TwoColumnGrid from "./components/home-components/TwoColumnGrid";
import { useState, useEffect, useContext } from "react";
import { SearchContext } from "./context/SearchContext";
import SearchPage from "./components/home-components/SearchPage";

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
        </>
      )}
    </main>
  );
}
