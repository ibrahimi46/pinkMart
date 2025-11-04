"use client";
import Image from "next/image";
import assets from "@/assets";
import { useContext } from "react";
import { UserDataContext } from "@/app/context/UserDataContext";
import { AuthContext } from "@/app/context/AuthContext";

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

interface OrderSummaryProps {
  selectedDeliveryDate: string;
  handleStepNext: (step: string) => void;
  step: string;
  selectedAddressId: number | null;
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

const OrderSummary = ({
  selectedDeliveryDate,
  selectedAddressId,
  orderData,
  handleStepNext,
  step,
}: OrderSummaryProps) => {
  const context = useContext(UserDataContext);
  const authContext = useContext(AuthContext);
  const { cartTotal, cartItems, setLoading } = context!;
  const { token, user } = authContext!;

  const userId = user?.userId;
  const deliveryFee = cartItems.length === 0 ? 0 : 6.99;
  const finalCheckoutPrice = (cartTotal + deliveryFee).toFixed(2);
  const isCheckoutDisabled =
    step === "cart" &&
    (cartItems.length < 1 ||
      !selectedDeliveryDate ||
      selectedDeliveryDate === "");

  const handleCheckout = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId,
          cartItems,
          finalCheckoutPrice,
          selectedDeliveryDate,
          selectedAddressId,
        }),
      });

      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        handleStepNext("order_failed");
      }
    } catch (err) {
      console.error(err);
      handleStepNext("order_failed");
    } finally {
      setLoading(false);
    }
  };

  const isPlaceOrderDisabled =
    step === "checkout" && (!selectedAddressId || !selectedDeliveryDate);
  return step !== "order_placed" ? (
    <div className="bg-white w-full p-6 rounded-3xl h-64 border border-black-100 flex flex-col gap-4">
      <h1 className="text-body-lg font-bold">Order Summary</h1>
      <div className="mx-4">
        <div className="flex justify-between">
          <p>Items total</p>
          <p className="text-black-400">${cartTotal.toFixed(2)}</p>
        </div>
        {deliveryFee > 0 && (
          <div className="flex justify-between">
            <p>Delivery fee</p>
            <p className="text-black-400">${deliveryFee}</p>
          </div>
        )}
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
    text-body-md rounded-full md:w-64 ${
      isPlaceOrderDisabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
    }`}
          onClick={() => {
            if (!isPlaceOrderDisabled) handleCheckout();
          }}
        >
          <div className="flex gap-2 items-center justify-center">
            <div>Pay With</div>
            <Image
              src={assets.icons.stripe_logo}
              height={30}
              width={50}
              alt="stripe"
            />
          </div>
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
            <p className="text-black-400">
              $
              {orderData?.items
                ? orderData.items
                    .reduce(
                      (sum, item) =>
                        sum + Number(item.priceAtPurchase) * item.quantity,
                      0
                    )
                    .toFixed(2)
                : (Number(orderData?.totalAmount) - 6.99).toFixed(2)}
            </p>
          </div>
          {orderData?.items
            ? Number(orderData.totalAmount) >
                orderData.items.reduce(
                  (sum, item) =>
                    sum + Number(item.priceAtPurchase) * item.quantity,
                  0
                ) && (
                <div className="flex justify-between">
                  <p>Delivery fee</p>
                  <p className="text-black-400">$6.99</p>
                </div>
              )
            : Number(orderData?.totalAmount) >= 6.99 && (
                <div className="flex justify-between">
                  <p>Delivery fee</p>
                  <p className="text-black-400">$6.99</p>
                </div>
              )}
        </div>
        <hr />
        <div className="flex justify-between">
          <h1 className="text-body-lg font-bold">Total</h1>
          <p className="mr-4">${Number(orderData?.totalAmount).toFixed(2)}</p>
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
            {`Shopping in ${orderData?.deliveryAddress?.aptNumber}, ${orderData?.deliveryAddress?.streetAddress}, ${orderData?.deliveryAddress?.city} - ${orderData?.deliveryAddress?.zipCode}`}
          </p>
        </div>
      </div>
    </div>
  );
};
export default OrderSummary;
