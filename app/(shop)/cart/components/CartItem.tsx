import Image from "next/image";
import assets from "@/assets";

const CartItem = () => {
  return (
    <>
      <div className="flex justify-between mt-4">
        <div className="flex gap-2">
          <div className="bg-primary-100 flex items-center justify-center p-3 rounded-xl">
            <Image
              src={assets.home.category_strip.carrot}
              height={40}
              width={40}
              alt=""
            />
          </div>
          <div className="flex flex-col gap-2 text-body-md">
            <p>Sweet Green Seedless Grapes 1.5-2 Kg</p>
            <div className="flex gap-2 text-body-sm">
              <p className="text-primary-600">$95.00</p>
              <p className="text-black-300 line-through">$99.99</p>
            </div>
          </div>
        </div>
        {/**right */}
        <div className="text-body-md flex gap-4 last items-center">
          <div className="flex gap-4 bg-black-100 items-center rounded-3xl p-1">
            <div className="bg-white p-1 rounded-full">
              <Image
                src={assets.icons.delete}
                height={14}
                width={14}
                alt="delete"
              />
            </div>
            <p>1</p>
            <div className="p-1 bg-primary-600 rounded-full">
              <Image
                src={assets.icons.plus}
                height={14}
                width={14}
                alt="plus"
              />
            </div>
          </div>
          <p className="text-primary-600 text-body-sm font-semibold">Remove</p>
          <p>$25.98</p>
        </div>
      </div>
      <hr className="mt-4 border-gray-100" />
    </>
  );
};

export default CartItem;
