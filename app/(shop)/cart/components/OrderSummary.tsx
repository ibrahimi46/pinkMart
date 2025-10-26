import useCart from "@/app/utils/useCart";
import Image from "next/image";
import useOrder from "@/app/utils/useOrder";
import assets from "@/assets";

interface OrderSummaryProps {
  selectedDeliveryDate: string;
  handleStepNext: (step: string) => void;
}

const OrderSummary = ({
  selectedDeliveryDate,
  handleStepNext,
}: OrderSummaryProps) => {
  const { placeOrder } = useOrder();
  const { cartTotal, cartItems } = useCart();

  const deliveryFee = 5.78;
  const finalCheckoutPrice = (cartTotal + deliveryFee).toFixed(2);
  return (
    <div className="bg-white w-full p-6 rounded-3xl h-72 border border-black-100 flex flex-col gap-4">
      <p className="text-body-sm text-center">
        Free delivery + saving $3.00 on this order...
      </p>
      <h1 className="text-body-lg font-bold">Order Summary</h1>
      <div className="mx-4">
        <div className="flex justify-between">
          <p>Items total</p>
          <p className="text-black-400">${cartTotal.toFixed(2)}</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery fee</p>
          <p className="text-black-400">${deliveryFee}</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <h1 className="text-body-lg font-bold">Subtotal</h1>
        <p className="mr-4">${finalCheckoutPrice}</p>
      </div>
      <div
        className="bg-primary-600 flex justify-between w-full px-4 py-2 text-body-md cursor-pointer rounded-full md:w-64"
        onClick={() => handleStepNext("checkout")}
      >
        <div className="flex gap-2 text-black-50">
          <Image
            height={20}
            width={20}
            src={assets.icons.checkout_white}
            alt="checkout"
          />
          <p>Checkout</p>
        </div>
        <p className="text-black-50">${finalCheckoutPrice}</p>
      </div>
    </div>
  );
};

export default OrderSummary;
