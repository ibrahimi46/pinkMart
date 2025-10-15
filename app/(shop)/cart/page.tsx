import Button from "@/app/components/Button";
import OrderSummary from "./components/OrderSummary";
import assets from "@/assets";
import Image from "next/image";
import CartItem from "./components/CartItem";
import BestSeller from "@/app/components/home-components/BestSeller";

const Cart = () => {
  return (
    <main className="flex md:px-20 px-6 mb-6 gap-12">
      {/**left side */}
      <div className="flex-1 overflow-hidden flex flex-col gap-6">
        <div className="flex justify-between bg-white border border-black-100 items-center rounded-xl h-24 p-4">
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

          <Button
            name="Wed 123"
            iconPosition="left"
            icon={assets.icons.calender}
            href=""
            extraStyles="px-6 border border-primary-600"
            textStyles="text-body-md"
          />
        </div>
        <div className="bg-white border border-black-100 rounded-xl p-4">
          <h2 className="text-black-400 font-bold text-body-md">Items Name</h2>
          <CartItem />
          <CartItem />
          <CartItem />
        </div>
        <BestSeller title="Recommendations" />
      </div>
      <OrderSummary />
    </main>
  );
};

export default Cart;
