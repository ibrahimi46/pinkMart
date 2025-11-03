import { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
import Image from "next/image";
import assets from "@/assets";
import CartItem from "../(shop)/cart/components/CartItem";
import Button from "./Button";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  currentPrice: string;
  stock: number;
  imageUrl: string;
}

interface CartModalProps {
  products: Product[];
}

const CartModal = ({ products }: CartModalProps) => {
  const context = useContext(UserDataContext);
  const { cartTotalItems, cartItems, cartTotal } = context!;

  return (
    <div className="flex flex-col gap-2">
      <h1 className="font-semibold">My Cart</h1>
      <hr />
      {cartTotalItems < 1 ? (
        <div>
          <div
            className={`flex flex-col items-center gap-2 text-body-sm rounded-2xl p-2`}
          >
            <div className="bg-primary-50 p-3 rounded-full">
              <Image
                src={assets.icons.cart_purple}
                height={30}
                width={30}
                alt="receipt"
              />
            </div>
            <div className="flex flex-col items-center">
              <h2 className="font-semibold">Your cart is hungry</h2>
              <p className="text-black-300">Fill your cart. Let&apos;s Shop!</p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p className="font-semibold text-black-400 text-body-sm">{`${cartTotalItems} Items`}</p>
          {cartItems &&
            cartItems.map((item) => {
              const product = products.find(
                (product) => product.id === item.productId
              );
              return product ? (
                <CartItem
                  key={item.id}
                  product={product}
                  quantity={item.quantity}
                  onUpdate={() => {}}
                  compact
                />
              ) : null;
            })}
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex justify-between">
              <h1 className="text-black-400 font-semibold">Subtotal</h1>
              <p className="font-bold">{`$${cartTotal.toFixed(2)}`}</p>
            </div>
            <Link href={"/cart"}>
              <Button
                icon={assets.icons.cart_white}
                iconPosition="left"
                name="View Cart"
                extraStyles="w-full bg-primary-600 h-8"
                textStyles="text-white font-semibold text-body-sm"
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartModal;
