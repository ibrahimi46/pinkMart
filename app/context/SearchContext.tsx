import { createContext, useEffect } from "react";
import { useState } from "react";

interface SearchContextProps {
  searchQuery: string;
  setSearchQuery: (value: string) => void;
  showSearchPage: boolean;
  setShowSearchPage: (value: boolean) => void;
}

export const SearchContext = createContext<SearchContextProps | null>(null);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [showSearchPage, setShowSearchPage] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");

  useEffect(() => {
    setShowSearchPage(searchQuery.trim() !== "");
  }, [searchQuery]);

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        showSearchPage,
        setSearchQuery,
        setShowSearchPage,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
