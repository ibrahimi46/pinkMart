import Image from "next/image";
import assets from "@/assets";
import Button from "@/app/components/Button";
import { useState } from "react";
import BackButton from "@/app/components/BackButton";
import Loading from "@/app/components/Loading";

const ProductItem = () => {
  return (
    <div className="bg-black-100 rounded-3xl items-center p-4 flex flex-col gap-4 justify-between sm:flex sm:flex-row">
      <div className="flex justify-between sm:flex-col text-body-sm sm:text-body-md">
        <p>
          <b>Name: </b>Orange
        </p>
        <p>
          <b>Category: </b>Fruits
        </p>
        <p>
          <b>Price: </b>$4.99
        </p>
        <p>
          <b>Created At: </b>23/09/2024
        </p>
      </div>
      <div className="flex items-center sm:w-28 md:w-32 w-full gap-2 bg-primary-100 p-2 justify-center rounded-3xl border border-primary-600">
        <Image src={assets.icons.bin} height={20} width={20} alt="edit" />
        <p>Delete</p>
      </div>
    </div>
  );
};

interface AddProductFormProps {
  setShowAddProductForm: (value: boolean) => void;
}

const AddProductForm = ({ setShowAddProductForm }: AddProductFormProps) => {
  const [productName, setProductName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return "Please select an image";
    setLoading(true);

    // try upload

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch(`/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const imageUrl = data.imageUrl;

      const token = localStorage.getItem("token");

      await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: productName,
          category,
          description,
          price: parseFloat(price || "0"),
          stock: stockQuantity || 0,
          image_url: imageUrl,
        }),
      });

      console.log("product added successfully");
    } catch (err) {
      console.error("Failed to upload form", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="flex gap-4 items-center">
            <BackButton handleBack={() => setShowAddProductForm(false)} />
            <h1 className="font-semibold">Add Product</h1>
          </div>
          <div className="mt-4 border border-black-200 rounded-3xl p-4 flex flex-col gap-4">
            <input
              type="text"
              placeholder="Product Name"
              className="p-3 bg-black-100 rounded-3xl border border-black-200"
              onChange={(e) => setProductName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              className="p-3 bg-black-100 rounded-3xl border border-black-200"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div className="flex flex-col gap-4 md:flex-row md:justify-between">
              <div className="flex items-center gap-4">
                <label htmlFor="" className="font-semibold hidden sm:block">
                  Category:
                </label>
                <select
                  name="Category"
                  id="category"
                  className="p-3 bg-black-100 rounded-3xl border border-black-200 w-full"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option value="">Select category</option>
                  <option value="fruits">Fruits</option>
                  <option value="snacks">Snacks</option>
                  <option value="meat">Meat</option>
                </select>
              </div>
              <input
                type="number"
                placeholder="Price"
                className="p-3 bg-black-100 rounded-3xl border border-black-200 min-w-0"
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                className="p-3 bg-black-100 rounded-3xl border border-black-200 min-w-0"
                onChange={(e) => setStockQuantity(parseInt(e.target.value))}
              />
            </div>
            <div className="bg-primary-100 rounded-3xl p-4 flex flex-col gap-3 items-center justify-center">
              <Image
                src={assets.icons.upload}
                height={40}
                width={40}
                alt="upload"
              />
              <p>Upload Image</p>
              <label
                htmlFor="file-upload"
                className="bg-black-100 px-2 py-1 rounded-3xl border border-primary-600 cursor-pointer"
              >
                Select an image
              </label>
              <input
                id="file-upload"
                type="file"
                className="hidden"
                onChange={(e) => {
                  setFile(e.target.files?.[0] || null);
                }}
              />
            </div>

            <button
              className="bg-primary-600 text-white py-2 rounded-3xl mt-4"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const ManageProducts = () => {
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(true);

  return (
    <div className="mt-2 flex flex-col gap-6">
      {showAddProductForm ? (
        <AddProductForm setShowAddProductForm={setShowAddProductForm} />
      ) : (
        <>
          <h1 className="font-semibold">Manage Products</h1>
          <div>
            <Button
              name="Add Product"
              icon={assets.icons.cart}
              iconPosition="left"
              extraStyles="bg-primary-600 p-4"
              textStyles="text-body-md text-black-100 font-regular"
              iconStyle="filter invert"
              handleOnClick={() => setShowAddProductForm(true)}
            />
          </div>
          <div className="p-4 rounded-3xl border border-black-200 flex flex-col gap-6 sm:gap-4 h-[950px] overflow-y-scroll scrollbar-hide">
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
            <ProductItem />
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProducts;
