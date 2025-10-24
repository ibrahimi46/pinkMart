"use client";
import Button from "@/app/components/Button";
import OrderSummary from "./components/OrderSummary";
import assets from "@/assets";
import Image from "next/image";
import CartItem from "./components/CartItem";
import BestSeller from "@/app/components/home-components/BestSeller";
import DeliveryDateModal from "./components/DeliveryDateModal";
import { useEffect, useState } from "react";
import useCart from "@/app/utils/useCart";
import useProducts from "@/app/utils/useProducts";

const Cart = () => {
  const [isPickDeliveryDate, setIsPickDeliveryDate] = useState<boolean>(false);
  const { cartItems, removeFromCart, updateCart } = useCart();
  const { products } = useProducts();

  useEffect(() => {
    console.log(cartItems);
    console.log(products);
  }, [cartItems, products]);

  return (
    <main className="lg:flex md:px-20 px-6 mb-6 gap-12">
      <div
        className={`fixed bottom-0 left-0 right-0 sm:inset-0 sm:bg-black-200 border-t-black-200 
        rounded-t-3xl border z-50 bg-opacity-50 transform transition-all duration-300 flex sm:items-center sm:justify-center
        ${
          isPickDeliveryDate
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-full opacity-50 pointer-events-none"
        }
        
        `}
      >
        <DeliveryDateModal handleCloseModal={setIsPickDeliveryDate} />
      </div>

      <div className="flex-1 overflow-hidden flex flex-col gap-6">
        <div className="lg:flex justify-between hidden bg-white border border-black-100 items-center rounded-xl h-24 p-4">
          <div className="flex justify-center gap-4">
            <div className="bg-primary-100 p-3 rounded-full">
              <Image
                src={assets.icons.cart_purple}
                width={30}
                height={30}
                alt="cart"
              />
            </div>
            <div className="flex flex-col gap-1">
              <h1 className="font-bold">Local Market</h1>
              <div className="flex gap-2">
                <Image
                  src={assets.icons.location}
                  width={20}
                  height={20}
                  alt="location"
                />
                <p className="text-primary-600 text-body-sm">
                  Shopping in 07114
                </p>
              </div>
            </div>
          </div>

          <div
            onClick={(e: React.MouseEvent<HTMLDivElement>) => {
              e.preventDefault();
              setIsPickDeliveryDate(true);
            }}
          >
            <Button
              name="Wed 123"
              iconPosition="left"
              icon={assets.icons.calender}
              extraStyles="px-6 border border-primary-600"
              textStyles="text-body-md"
            />
          </div>
        </div>

        <div className="bg-white border  border-black-100 rounded-xl p-4">
          <h2 className="text-black-400 font-bold text-body-md">Items Name</h2>
          {cartItems &&
            cartItems.map((cartItem) => {
              const product = products.find(
                (item) => item.id === cartItem.productId
              );
              return product ? (
                <CartItem
                  key={product.id}
                  product={product}
                  removeFromCart={removeFromCart}
                  quantity={cartItem.quantity}
                  updateCart={updateCart}
                />
              ) : null;
            })}
        </div>
        <BestSeller title="Recommendations" />
      </div>

      <div className="flex lg:hidden justify-between bg-white border border-black-100 items-center my-6 rounded-xl h-24 p-4">
        <div className="flex justify-center gap-4">
          <div className="bg-primary-100 h-8 w-8 flex items-center justify-center rounded-full">
            <Image
              src={assets.icons.cart_purple}
              width={30}
              height={30}
              alt="cart"
              className="sm:h-7 sm:w-7 h-5 w-5"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="font-bold">Local Market</h1>
            <div className="flex gap-2">
              <Image
                src={assets.icons.location}
                width={20}
                height={20}
                alt="location"
              />
              <p className="text-primary-600 text-body-sm">Shopping in 07114</p>
            </div>
          </div>
        </div>

        <div
          onClick={(e: React.MouseEvent<HTMLDivElement>) => {
            e.preventDefault();
            setIsPickDeliveryDate(true);
          }}
        >
          <Button
            name="Wed 123"
            iconPosition="left"
            icon={assets.icons.calender}
            extraStyles="px-3 border border-primary-600"
            textStyles="text-body-md"
          />
        </div>
      </div>

      <div className="mt-8">
        <OrderSummary />
      </div>
    </main>
  );
};

export default Cart;
