import Button from "@/app/components/Button";
import assets from "@/assets";
import { useState } from "react";
import Image from "next/image";
import BestSeller from "@/app/components/home-components/BestSeller";

const OrdersComp = () => {
  const [orders, setOrders] = useState<object>();

  return (
    <div>
      {orders ? (
        <div>here are ur orders</div>
      ) : (
        <div className="flex flex-col gap-4 py-10 md:py-6">
          <h1 className="hidden md:block font-bold">My Orders</h1>
          <div className="flex flex-col items-center gap-3 border border-black-200 rounded-2xl p-6">
            <div>
              <Image
                src={assets.icons.receipt_purple}
                height={40}
                width={40}
                alt="receipt"
              />
            </div>
            <h2 className="font-semibold">
              You don&apos;t have any order yet...
            </h2>
            <p className="text-black-300 text-body-sm">
              Explore and place your first order now!
            </p>
            <Button
              name="Start Shopping"
              icon={assets.icons.cart}
              iconPosition="left"
              extraStyles="bg-primary-600 p-4"
              textStyles="text-body-md text-black-100 font-regular"
              iconStyle="filter invert"
            />
          </div>

          <div className="mt-4">
            <BestSeller title="Best Sellers" />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersComp;
