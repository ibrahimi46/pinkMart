import Image from "next/image";
import assets from "@/assets";
import { useContext } from "react";
import { UserDataContext } from "@/app/context/UserDataContext";

interface ProductProps {
  product: {
    id: number;
    name: string;
    description: string;
    category: string;
    price: string;
    stock: number;
    imageUrl: string;
  };
  quantity: number;
  onUpdate: () => void;
}

const CartItem = ({ product, quantity, onUpdate }: ProductProps) => {
  const context = useContext(UserDataContext);
  const { updateCart, removeFromCart } = context!;
  return (
    <>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <div className="bg-primary-100 flex items-center justify-center md:p-3 p-1 h-10  rounded-xl">
            <Image
              src={product.imageUrl}
              height={40}
              width={40}
              alt=""
              className="h-5 w-5 sm:h-5 sm:w-5 md:h-10 md:w-10 rounded-full"
            />
          </div>
          <div className="flex flex-col gap-2 text-body-sm sm:text-body-md">
            <p>{product?.name}</p>
            <div className="flex gap-2 text-body-sm">
              <p className="text-primary-600">
                ${parseFloat(product?.price).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        {/**right */}
        <div className="text-body-md w-52 justify-end flex gap-4 items-center last sm:items-center">
          <div className="flex gap-4 bg-black-100 items-center rounded-3xl p-1">
            <div className="bg-white p-1 rounded-full">
              <Image
                src={assets.icons.delete}
                height={14}
                width={14}
                alt="delete"
                onClick={() => {
                  updateCart(product.id, Number(quantity) - 1);
                  onUpdate();
                }}
              />
            </div>
            <div className="w-2 flex items-center justify-center">
              <p>{quantity}</p>
            </div>
            <div className="p-1 bg-primary-600 rounded-full">
              <Image
                src={assets.icons.plus}
                height={14}
                width={14}
                alt="plus"
                onClick={() => {
                  updateCart(product.id, Number(quantity) + 1);
                  onUpdate();
                }}
              />
            </div>
          </div>
          <p
            className="text-primary-600 text-body-sm font-semibold hidden sm:block cursor-pointer"
            onClick={() => {
              removeFromCart(product.id);
              onUpdate();
            }}
          >
            Remove
          </p>
          <p className="hidden sm:block">
            ${(Number(product.price) * quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <hr className="mt-4 border-gray-100" />
    </>
  );
};

export default CartItem;
