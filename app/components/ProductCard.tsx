import Image from "next/image";
import assets from "@/assets";

interface ProductCardProps {
  name: string;
  icon: string;
  currentPrice: string;
  oldPrice?: number;
  capacity: number;
  addToCart: () => void;
}

const ProductCard = ({
  name,
  icon,
  currentPrice,
  oldPrice,
  capacity,
  addToCart,
}: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-2 justify-between h-64 w-36">
      {/** Item image container */}
      <div className="sm:h-32 sm:w-36 h-24 w-24 relative flex items-center justify-center">
        <Image src={icon} fill alt="" className="rounded-3xl" />

        <div
          className="absolute sm:hidden bottom-2 right-2 bg-black-100 border border-primary-600 rounded-full p-2"
          onClick={() => {
            console.log("clicked");
            addToCart();
          }}
        >
          <Image src={assets.icons.plus} height={10} width={10} alt="close" />
        </div>
      </div>
      {/** Info container */}
      <div className="h-32 flex flex-col justify-between">
        <div className="flex flex-col ml-1 h-20">
          <p className="sm:text-body-lg text-body-md whitespace-nowrap overflow-hidden truncate">
            {name}
          </p>
          <div className="flex gap-2">
            <p className="font-bold text-body-sm">{`$${currentPrice}/Kg`}</p>
            {oldPrice && (
              <p className="text-body-sm line-through">{`$${oldPrice}/Kg`}</p>
            )}
          </div>
          <p className="text-primary-600 sm:text-body-lg text-body-md">{`${capacity} Left`}</p>
        </div>
        <div
          className="hidden sm:flex gap-2 bg-primary-600 px-2 border py-1 rounded-full justify-center
      transition-all duration-300 hover:bg-primary-500 hover:border hover:border-primary-700
      "
          onClick={addToCart}
        >
          <Image
            src={assets.icons.cart}
            height={15}
            width={15}
            alt="cart"
            className="filter invert"
          />
          <p className="text-body-md text-white font-semibold cursor-pointer ">
            Add to Cart
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
