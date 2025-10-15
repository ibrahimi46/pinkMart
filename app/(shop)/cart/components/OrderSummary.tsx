import Button from "@/app/components/Button";
import assets from "@/assets";
import React from "react";
import CheckoutBtn from "./CheckoutBtn";

const OrderSummary = () => {
  return (
    <div className="bg-white w-80 p-6 rounded-3xl border border-black-100 flex flex-col gap-4">
      <p className="text-body-sm text-center">
        Free delivery + saving $3.00 on this order...
      </p>
      <h1 className="text-body-lg font-bold">Order Summary</h1>
      <div className="mx-4">
        <div className="flex justify-between">
          <p>Items total</p>
          <p className="text-black-400">$128.78</p>
        </div>
        <div className="flex justify-between">
          <p>Delivery fee</p>
          <p className="text-black-400">$5.78</p>
        </div>
      </div>
      <hr />
      <div className="flex justify-between">
        <h1 className="text-body-lg font-bold">Subtotal</h1>
        <p className="mr-4">$134.56</p>
      </div>
      <CheckoutBtn />
    </div>
  );
};

export default OrderSummary;
