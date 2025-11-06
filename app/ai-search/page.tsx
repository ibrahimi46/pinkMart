"use client";

import ProductCard from "../components/ProductCard";
import { Product } from "@/types";
import { useState, useEffect, useContext } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import Loading from "../components/Loading";
import Image from "next/image";
import assets from "@/assets";

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function AiSearch() {
  const productContext = useContext(ProductsContext);
  const { products } = productContext!;
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext!;

  const [aiProducts, setAiProducts] = useState<Product[]>([]);

  const defaultQuantity = 1;

  useEffect(() => {
    const mockAiResults = products?.slice(0, 6) || [];
    setAiProducts(mockAiResults);
  }, [products]);

  return (
    <main className="md:px-10 px-6 mb-6 flex flex-col gap-8">
      <div className="flex justify-center">
        <div className="relative w-64 h-64 md:w-80 md:h-80 bg-gray-100 border border-primary-600 shadow-md rounded-2xl overflow-hidden">
          <Image
            src={assets.home.two_column_grid.frame2}
            height={60}
            width={60}
            alt="Uploaded preview"
            className="w-full h-full object-cover "
          />
        </div>
      </div>

      {cartContext?.loading && <Loading />}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
        {aiProducts.length > 0 ? (
          aiProducts.map((item) => (
            <div key={item.id} className="w-full">
              <ProductCard
                name={item.name}
                icon={item.imageUrl}
                currentPrice={Number(item.currentPrice)}
                oldPrice={Number(item.oldPrice)}
                capacity={Number(item.stock)}
                addToCart={() => {
                  addToCart(item.id, defaultQuantity);
                }}
              />
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-body-md text-gray-500 py-10">
            No matching products found
          </div>
        )}
      </div>
    </main>
  );
}
