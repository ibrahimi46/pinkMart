import Image from "next/image";
import assets from "@/assets";
import { useContext } from "react";
import { UserDataContext } from "@/app/context/UserDataContext";

interface Payment {
  type: string;
  provider: string;
  expiryDate: string;
  cvv?: string;
  isDefault?: boolean;
  cardNumber: string;
}

interface OrderSummaryProps {
  selectedDeliveryDate: string;
  selectedPaymentMethod: Payment | null;
  handleStepNext: (step: string) => void;
  step: string;
}

const OrderSummary = ({
  selectedDeliveryDate,
  selectedPaymentMethod,
  handleStepNext,
  step,
}: OrderSummaryProps) => {
  const context = useContext(UserDataContext);
  const { cartTotal, cartItems, placeOrder } = context!;

  const deliveryFee = 5.78;
  const finalCheckoutPrice = (cartTotal + deliveryFee).toFixed(2);
  const isCheckoutDisabled =
    step === "cart" &&
    (cartItems.length < 1 ||
      !selectedDeliveryDate ||
      selectedDeliveryDate === "");

  const isPlaceOrderDisabled =
    step === "checkout" &&
    (!selectedDeliveryDate ||
      !selectedPaymentMethod ||
      cartItems.length < 1 ||
      context?.addresses.length === 0);

  return step !== "order_placed" ? (
    <div className="bg-white w-full p-6 rounded-3xl h-64 border border-black-100 flex flex-col gap-4">
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
      {step === "cart" ? (
        <div
          className={` flex justify-between bg-primary-600 w-full px-4 py-2 text-body-md 
            cursor-pointer rounded-full md:w-64
            ${
              isCheckoutDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer "
            }
            `}
          onClick={() => !isCheckoutDisabled && handleStepNext("checkout")}
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
      ) : (
        <div
          className={`bg-primary-600 text-center text-white font-semibold w-full px-4 py-2 
            text-body-md cursor-pointer rounded-full md:w-64
            ${
              isPlaceOrderDisabled
                ? "cursor-not-allowed opacity-50"
                : "cursor-pointer "
            }
            `}
          onClick={async () => {
            if (isPlaceOrderDisabled) return;
            await placeOrder({
              finalCheckoutPrice,
              selectedDeliveryDate,
              cartItems,
            });

            handleStepNext("order_placed");
          }}
        >
          <p>Place Order</p>
        </div>
      )}
    </div>
  ) : (
    <div className="flex flex-col gap-6 w-full sm:w-full lg:w-72">
      <div className="bg-white w-full p-6 rounded-3xl border border-black-100 flex flex-col gap-4">
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
          <h1 className="text-body-lg font-bold">Total</h1>
          <p className="mr-4">${finalCheckoutPrice}</p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-3xl flex flex-col gap-2">
        <h1 className="font-semibold text-body-md">Pay With</h1>
        <div className="flex gap-2">
          <Image
            src={assets.icons.mastercard}
            height={25}
            width={25}
            alt="mastercard"
          />
          <p className="text-primary-600 text-body-sm md:text-body-md">
            MasterCard 02312
          </p>
        </div>
      </div>
      <div className="bg-white p-4 rounded-3xl flex flex-col gap-2">
        <h1 className="font-semibold text-body-md">Delivery Address</h1>
        <div className="flex gap-2">
          <Image
            src={assets.icons.location_purple}
            height={20}
            width={25}
            alt="mastercard"
          />
          <p className="text-primary-600 text-body-sm md:text-body-md">
            Shopping in 07144
          </p>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
