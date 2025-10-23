import Button from "@/app/components/Button";
import assets from "@/assets";
import { useState } from "react";
import Image from "next/image";
import BestSeller from "@/app/components/home-components/BestSeller";

const OrderItem = () => {
  return (
    <div className="border p-4 rounded-2xl flex flex-col gap-4 text-body-sm">
      <div className="flex justify-between">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold ">Order Delivered</h1>
          <p className="text-black-400">Apr 5, 2022, 10:07 AM</p>
        </div>

        <div className="items-center gap-2 hidden sm:flex">
          <div className="bg-black-100 p-2 rounded-full">
            <Image
              src={assets.icons.payment}
              height={20}
              width={20}
              alt="payment"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">$54</h1>
            <p className="text-black-400">Paid with cash</p>
          </div>
        </div>
        <div className="sm:flex hidden items-center gap-2">
          <div className="bg-black-100 p-2 rounded-full">
            <Image
              src={assets.icons.receipt}
              height={20}
              width={20}
              alt="receipt"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Items</h1>
            <p className="text-black-400">6x</p>
          </div>
        </div>

        <div className="md:flex md:flex-row gap-4 ml-2 flex flex-col items-center">
          <div className="bg-green-100 text-green-700  flex sm:px-1 px-4 py-1 items-center justify-center rounded-xl border border-green-900">
            Completed
          </div>
          <div className="flex items-center gap-1 text-nowrap">
            <p>View Order Details</p>
            <Image
              src={assets.icons.export}
              height={20}
              width={20}
              alt="details"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between pr-8 sm:hidden">
        <div className="items-center flex gap-2">
          <div className="bg-black-100 p-2 rounded-full">
            <Image
              src={assets.icons.payment}
              height={20}
              width={20}
              alt="payment"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">$54</h1>
            <p className="text-black-400">Paid with cash</p>
          </div>
        </div>
        <div className=" items-center flex gap-2">
          <div className="bg-black-100 p-2 rounded-full">
            <Image
              src={assets.icons.receipt}
              height={20}
              width={20}
              alt="receipt"
            />
          </div>
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold">Items</h1>
            <p className="text-black-400">6x</p>
          </div>
        </div>
      </div>
      <div className="bg-black-100 rounded-xl p-2">
        <div className="bg-white w-14 h-14 rounded-xl">image</div>
      </div>
    </div>
  );
};

const OrdersComp = () => {
  const [orders, setOrders] = useState<object>({});

  return (
    <div>
      {orders ? (
        <div className="flex flex-col gap-4 py-10 md:py-6">
          <h1 className="hidden md:block font-bold">My Orders</h1>
          <div className="flex gap-2  text-body-sm">
            <div className="bg-black-100 px-6 py-2 rounded-2xl border border-black-200">
              <p>All</p>
            </div>
            <div className="bg-black-100 px-6 py-2 rounded-2xl border border-black-200">
              <p>In Progress</p>
            </div>
            <div className="bg-black-100 px-6 py-2 rounded-2xl border border-black-200">
              <p>Delivered</p>
            </div>
            <div className="bg-black-100 px-6 py-2 rounded-2xl border border-black-200">
              <p>Cancelled</p>
            </div>
          </div>
          <OrderItem />
          <OrderItem />
          <OrderItem />
        </div>
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
