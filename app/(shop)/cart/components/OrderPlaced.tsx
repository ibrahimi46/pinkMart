import Image from "next/image";
import assets from "@/assets";

type DeliveryAddress = {
  aptNumber?: string | null;
  streetAddress?: string | null;
  city?: string | null;
  zipCode?: string | null;
};

type OrderItem = {
  id: number;
  name: string;
  quantity: number;
  priceAtPurchase: number;
  imageUrl?: string;
};

interface OrderPlacedProps {
  orderData: {
    orderId: number;
    status: string;
    deliveryDate: string;
    totalAmount: number;
    paymentProvider: string;
    cardNumber: string;
    deliveryAddress: DeliveryAddress;
    items: OrderItem[];
  } | null;
}

interface PlacedOrderItemProps {
  imageUrl: string;
  itemCount: number;
  price: number;
  name: string;
  compact?: boolean;
}

const PlacedOrderItem = ({
  imageUrl,
  itemCount,
  price,
  name,
  compact = false,
}: PlacedOrderItemProps) => {
  return (
    <>
      <div className="flex justify-between items-end mt-4">
        <div className="flex gap-2">
          <div className="flex items-center justify-center h-14 w-14">
            <Image
              src={imageUrl}
              height={48}
              width={48}
              alt=""
              className="object-cover h-full w-full rounded-xl border shadow-sm"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-body-sm font-medium truncate">{name}</p>
            <div className="flex gap-2 text-body-sm">
              <p className="text-primary-600">${price}</p>
            </div>
          </div>
        </div>
        {/**right */}
        <div className="text-body-md justify-between flex gap-4 items-center last sm:items-center">
          <p
            className={`cursor-default flex-shrink-0 text-right w-14 ${
              compact ? "hidden" : "hidden sm:block"
            }`}
          >
            x{itemCount}
          </p>
        </div>
      </div>
      <hr className="mt-4 border-gray-100" />
    </>
  );
};

const OrderPlaced = ({ orderData }: OrderPlacedProps) => {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-4 bg-white p-6 rounded-3xl border border-black-100">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="font-semibold text-body-xl">
              {`Order #${orderData?.orderId} is ${orderData?.status}`}
            </h1>
            <p className="text-black-500 text-body-md">
              {`Order Arrives at ${
                orderData?.deliveryDate
                  ? new Date(orderData.deliveryDate).toLocaleDateString()
                  : ""
              }`}
            </p>
          </div>
          <div className="bg-black-100 flex items-center text-body-md justify-center px-4 h-10 border border-primary-600 text-primary-600 rounded-full ">
            {orderData?.status}
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <div className="flex flex-col items-center gap-4">
            <div className="bg-green-200 rounded-full p-6">
              <Image
                src={assets.icons.green_tickmark}
                height={50}
                width={50}
                alt="tick"
              />
            </div>
            <h1 className="font-bold">Order is Placed</h1>
          </div>
        </div>
      </div>

      <div className="bg-white border border-black-100 rounded-3xl p-4">
        <h2 className="text-black-400 font-bold text-body-md">Items Name</h2>
        <div>
          {orderData?.items &&
            orderData.items.map((item) => {
              return (
                <PlacedOrderItem
                  key={item.id}
                  name={item.name}
                  price={item.priceAtPurchase}
                  imageUrl={item.imageUrl!}
                  itemCount={item.quantity}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default OrderPlaced;
