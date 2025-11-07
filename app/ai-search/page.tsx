"use client";

import ProductCard from "../components/ProductCard";
import { Product } from "@/types";
import { useState, useEffect, useContext, useRef } from "react";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";
import Loading from "../components/Loading";
import Image from "next/image";
import assets from "@/assets";
import Button from "../components/Button";
import { AuthContext } from "../context/AuthContext";

const placeholderImage =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-size='16' fill='%239ca3af'%3ENo Image%3C/text%3E%3C/svg%3E";

export default function AiSearch() {
  const productContext = useContext(ProductsContext);
  const { loading, setLoading } = productContext!;
  const cartContext = useContext(CartContext);
  const { addToCart } = cartContext!;
  const authContext = useContext(AuthContext);
  const { token } = authContext!;

  const [file, setFile] = useState<File | undefined>(undefined);
  const [aiProducts, setAiProducts] = useState<Product[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const defaultQuantity = 1;

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSearch = async () => {
    if (!file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("/api/ai-image-search", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setAiProducts(data.products || data.products?.rows || []);
      } else {
        const errorData = await res.json();
        console.error("Search error:", errorData);
        setAiProducts([]);
      }
    } catch (error) {
      console.error("Failed to search:", error);
      setAiProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleShowFileSelector = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      // Revoke previous URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  return (
    <main className="md:px-10 px-6 mb-6 flex flex-col gap-8">
      {loading && <Loading />}
      <div className="flex justify-center flex-col items-center gap-4">
        <div className="flex flex-col relative w-64 h-64 md:w-80 md:h-80 bg-gray-100 border border-primary-600 shadow-sm rounded-2xl overflow-hidden">
          {previewUrl ? (
            <>
              <Image
                src={previewUrl}
                fill
                alt="Uploaded preview"
                className="w-full h-full object-cover "
                unoptimized
              />
              <button
                onClick={() => {
                  setPreviewUrl(null);
                  setFile(undefined);
                  if (fileInputRef.current) fileInputRef.current.value = "";
                }}
                className="absolute top-2 right-2 bg-black-500 border border-white text-white rounded-full p-2 hover:opacity-90 transition-all duration-300"
              >
                <Image
                  src={assets.icons.close}
                  height={20}
                  width={20}
                  alt="remove"
                />
              </button>
            </>
          ) : (
            <div className="flex items-center justify-center relative w-64 h-64 md:w-80 md:h-80 bg-gray-100 border border-primary-600 shadow-sm rounded-2xl overflow-hidden">
              <div
                onClick={handleShowFileSelector}
                className="bg-primary-100 rounded-full p-4 flex items-center justify-center border border-black-50 hover:border-black-400 transition-all duration-300 cursor-pointer"
              >
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                />
                <Image
                  src={assets.icons.upload_purple}
                  height={80}
                  width={80}
                  alt="upload"
                />
              </div>
            </div>
          )}
        </div>

        <Button
          name="Intelligent Search"
          icon={assets.icons.camera}
          iconPosition="left"
          textStyles="text-body-sm"
          handleOnClick={() => {
            handleSearch();
          }}
          extraStyles="h-10 px-4 bg-white border border-primary-500 hover:border-black-800 transition-all duration-300"
        />
      </div>

      {cartContext?.loading && <Loading />}
      {aiProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
          {aiProducts.map((item) => (
            <div key={item.id} className="w-full">
              <ProductCard
                name={item.name || "Unnamed Product"}
                icon={item.imageUrl || placeholderImage}
                currentPrice={Number(item.currentPrice) || 0}
                oldPrice={item.oldPrice ? Number(item.oldPrice) : 0}
                capacity={Number(item.stock) || 0}
                addToCart={() => {
                  addToCart(item.id, defaultQuantity);
                }}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-primary-100 border border-primary-600 rounded-3xl py-2 w-1/2 self-center flex items-center justify-center">
          Search to show results...
        </div>
      )}
    </main>
  );
}
