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
          <div className="flex items-center justify-center h-14 w-14">
            <Image
              src={product.imageUrl}
              height={48}
              width={48}
              alt=""
              className="object-cover h-full w-full rounded-xl"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-body-sm font-medium">{product?.name}</p>
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
            <div className="bg-white p-1 rounded-full cursor-pointer  hover:bg-black-200 transition-all duration-300">
              <Image
                src={assets.icons.delete}
                height={14}
                width={14}
                alt="delete"
                onClick={() => {
                  if (quantity > 1) {
                    updateCart(product.id, Number(quantity) - 1);
                    onUpdate();
                  } else {
                    removeFromCart(product.id);
                    onUpdate();
                  }
                }}
              />
            </div>
            <div className="w-2 flex items-center justify-center cursor-default">
              <p>{quantity}</p>
            </div>
            <div className="p-1 bg-primary-600 rounded-full cursor-pointer hover:bg-primary-400 transition-all duration-300">
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
          <p className="hidden sm:block cursor-default">
            ${(Number(product.price) * quantity).toFixed(2)}
          </p>
        </div>
      </div>
      <hr className="mt-4 border-gray-100" />
    </>
  );
};

export default CartItem;
