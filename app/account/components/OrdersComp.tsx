import assets from "@/assets";
import { useContext, useState } from "react";
import Image from "next/image";
import BestSeller from "@/app/components/home-components/BestSeller";
import NoDataPlaceholder from "./NoDataPlaceholder";
import { UserDataContext } from "@/app/context/UserDataContext";
import capitalizor from "@/app/utils/capitalizor";
import { dateFormatter } from "@/app/utils/dateFormatter";

interface OrderItemProps {
  status: string;
  createdAt: string;
  totalAmount: number;
  itemCount: number;
}

const OrderItem = ({
  status,
  totalAmount,
  createdAt,
  itemCount,
}: OrderItemProps) => {
  return (
    <div className="border p-4 rounded-2xl flex flex-col gap-4 text-body-sm">
      <div className="flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h1 className="font-semibold ">{`Order ${capitalizor(status)}`}</h1>
          <p className="text-black-400">{dateFormatter(createdAt)}</p>
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
            <h1 className="font-semibold">{`$${totalAmount}`}</h1>
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
            <p className="text-black-400">{`x${itemCount}`}</p>
          </div>
        </div>

        <div className="bg-green-100 text-green-700  flex px-4 py-1 h-8 items-center justify-center rounded-xl border border-green-900">
          {capitalizor(status)}
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
    </div>
  );
};

const OrdersComp = () => {
  const [filter, setFilter] = useState<string>("all");
  const context = useContext(UserDataContext);
  const { orders } = context!;

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  return (
    <div>
      {orders && orders.length > 0 ? (
        <div className="flex flex-col gap-4 mt-2">
          <h1 className="hidden md:block font-bold">My Orders</h1>
          <div className="flex gap-2  text-body-sm">
            <div
              className={`bg-black-100 px-6 py-2 rounded-2xl border transition-all duration-300 border-black-20 cursor-pointer
                ${filter === "all" && "bg-primary-600 text-white font-semibold"}
                `}
              onClick={() => setFilter("all")}
            >
              <p>All</p>
            </div>
            <div
              className={`bg-black-100 px-6 py-2 rounded-2xl border transition-all duration-300 border-black-20 cursor-pointer
                ${
                  filter === "in_progress" &&
                  "bg-primary-600 text-white font-semibold"
                }
                `}
              onClick={() => setFilter("in_progress")}
            >
              <p>In Progress</p>
            </div>
            <div
              className={`bg-black-100 px-6 py-2 rounded-2xl border transition-all duration-300 border-black-20 cursor-pointer
                ${
                  filter === "delivered" &&
                  "bg-primary-600 text-white font-semibold"
                }
                `}
              onClick={() => setFilter("delivered")}
            >
              <p>Delivered</p>
            </div>
            <div
              className={`bg-black-100 px-6 py-2 rounded-2xl border transition-all duration-300 border-black-20 cursor-pointer
                ${
                  filter === "cancelled" &&
                  "bg-primary-600 text-white font-semibold"
                }
                `}
              onClick={() => setFilter("cancelled")}
            >
              <p>Cancelled</p>
            </div>
          </div>
          {filteredOrders.map((order) => {
            return (
              <OrderItem
                key={order.id}
                status={order.status}
                totalAmount={order.totalAmount}
                itemCount={order.itemCount}
                createdAt={order.createdAt}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-2">
          <h1 className="hidden md:block font-bold">My Orders</h1>
          <NoDataPlaceholder
            btnName="Start Shopping"
            btnIcon={assets.icons.cart}
            field1="You don't have any orders yet..."
            field2="Explore and place your first order now!"
            icon={assets.icons.receipt_purple}
          />
          <div className="mt-4">
            <BestSeller title="Best Sellers" />
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersComp;
