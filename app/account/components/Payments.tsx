import React, { useState } from "react";
import NoDataPlaceholder from "./NoDataPlaceholder";
import assets from "@/assets";
import Image from "next/image";

const PaymentMethodItem = () => {
  return (
    <div className="bg-black-100 p-4 rounded-2xl border border-black-200 text-body-md flex justify-between items-center">
      <div className="flex gap-4">
        <Image
          src={assets.icons.mastercard}
          height={30}
          width={30}
          alt="mastercard"
        />
        <div>
          <h1 className="font-semibold">MasterCard 6568</h1>
          <p className="text-black-400 text-body-sm">Exp 12/2024</p>
        </div>
      </div>
      <div>
        <Image src={assets.icons.bin_purple} height={20} width={20} alt="bin" />
      </div>
    </div>
  );
};

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState<object>({});
  return (
    <div>
      {paymentMethods ? (
        <div className="flex flex-col gap-4 mt-2">
          <h1 className="font-bold">My Payments</h1>
          <PaymentMethodItem />
          <div className="flex gap-2 bg-primary-50 border border-primary-300 w-56 py-2 items-center justify-center text-nowrap rounded-xl ">
            <Image src={assets.icons.plus} width={20} height={20} alt="plus" />
            <p>Add Payment Method</p>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-2">
          <h1 className="font-bold">My Payments</h1>
          <NoDataPlaceholder
            icon={assets.icons.card_purple}
            field1="You don't have any payment methods"
            field2="Add your address, start shopping!"
            btnName="Add Payment Method"
            btnIcon={assets.icons.plus}
          />
        </div>
      )}
    </div>
  );
};

export default Payments;
