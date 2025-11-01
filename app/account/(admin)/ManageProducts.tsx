import Image from "next/image";
import assets from "@/assets";
import Button from "@/app/components/Button";
import { useEffect, useState } from "react";
import BackButton from "@/app/components/BackButton";
import Loading from "@/app/components/Loading";

interface ProductItemProps {
  name: string;
  category: string;
  price: number;
  createdAt: string;
  orderId: number;
  handleDelete: () => void;
}

const ProductItem = ({
  name,
  category,
  price,
  createdAt,
  handleDelete,
}: ProductItemProps) => {
  return (
    <div className="bg-black-100 rounded-3xl items-center p-3 flex flex-col gap-4 justify-between sm:flex sm:flex-row">
      <div className="flex justify-between sm:flex-col text-body-sm sm:text-body-md">
        <p>
          <b>Name: </b>
          {name}
        </p>
        <p>
          <b>Category: </b>
          {category}
        </p>
        <p>
          <b>Price: </b>${Number(price).toFixed(2)}
        </p>
        <p>
          <b>Created At: </b>
          {new Date(createdAt).toLocaleDateString()}
        </p>
      </div>
      <div
        onClick={() => handleDelete()}
        className="flex cursor-pointer items-center sm:w-28 md:w-32 w-full gap-2 bg-primary-100 p-2 justify-center rounded-3xl border border-primary-600"
      >
        <Image src={assets.icons.bin} height={20} width={20} alt="delete" />
        <p className="text-body-md">Delete</p>
      </div>
    </div>
  );
};

interface AddProductFormProps {
  setShowAddProductForm: (value: boolean) => void;
  fetchProducts: () => void;
}

const AddProductForm = ({
  setShowAddProductForm,
  fetchProducts,
}: AddProductFormProps) => {
  const [productName, setProductName] = useState<string | null>(null);
  const [description, setDescription] = useState<string | null>(null);
  const [category, setCategory] = useState<string | null>(null);
  const [price, setPrice] = useState<string | null>(null);
  const [stockQuantity, setStockQuantity] = useState<number | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [productAdded, setProductAdded] = useState<boolean>(false);

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
      setProductAdded(true);
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
            <BackButton
              handleBack={() => {
                setShowAddProductForm(false);
                if (productAdded) fetchProducts();
              }}
            />
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
                  <option value="Fruits">Fruits</option>
                  <option value="Snacks">Snacks</option>
                  <option value="Meat">Meat</option>
                  <option value="Vegetables">Vegetables</option>
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

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: number;
  imageUrl: string;
  createdAt: string;
}

const ManageProducts = () => {
  const [showAddProductForm, setShowAddProductForm] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!token) return;
    console.log("clicked");

    try {
      setLoading(true);
      await fetch(`/api/products/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/products");
      const data = await res.json();
      setProducts(data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="mt-2 flex flex-col gap-6">
      {showAddProductForm ? (
        <AddProductForm
          setShowAddProductForm={setShowAddProductForm}
          fetchProducts={fetchProducts}
        />
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
          <div className="p-4 rounded-3xl border bg-white border-black-200 flex flex-col gap-6 sm:gap-4 max-h-[512px] overflow-y-scroll scrollbar-hide">
            {loading ? (
              <Loading />
            ) : (
              <>
                {products &&
                  products.map((product) => {
                    return (
                      <ProductItem
                        key={product.id}
                        name={product.name}
                        category={product.category}
                        orderId={product.id}
                        price={product.price}
                        createdAt={product.createdAt}
                        handleDelete={() => handleDelete(product.id)}
                      />
                    );
                  })}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ManageProducts;
