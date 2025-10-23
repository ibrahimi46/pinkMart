import React, { useState } from "react";
import NoDataPlaceholder from "./NoDataPlaceholder";
import assets from "@/assets";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";

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

interface AddPaymentModalProps {
  setShowAddPaymentModal: (value: boolean) => void;
}

const AddPaymentModal = ({ setShowAddPaymentModal }: AddPaymentModalProps) => {
  const [paymentMode, setPaymentMode] = useState<string>("");
  return (
    <div className="fixed bottom-0 sm:inset-0 left-0 right-0 z-50 flex items-center justify-center transition-all duration-300">
      <div className="bg-white px-4 py-7 flex flex-col gap-6 rounded-3xl relative sm:w-[420px] w-full">
        <div
          className="bg-black-100 h-10 w-10 flex items-center justify-center rounded-full absolute right-4 top-4"
          onClick={() => setShowAddPaymentModal(false)}
        >
          <Image src={assets.icons.close} height={15} width={15} alt="close" />
        </div>

        {/**conditional render */}
        {paymentMode === "visa" ? (
          <>
            <div className="flex gap-4 items-center">
              <BackButton handleBack={() => setPaymentMode("")} />
              <h1 className="font-semibold text-body-xl">Add Payment</h1>
            </div>
            <hr />

            <div className="flex flex-col gap-3">
              <p className="font-semibold">Card Number</p>
              <input
                type="number"
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="bg-black-100 p-3 rounded-xl"
              />
              <div className="flex justify-between">
                <input
                  type="date"
                  placeholder="MM/YY"
                  className="bg-black-100 p-3 rounded-xl"
                />
                <input
                  type="number"
                  placeholder="CVC"
                  className="bg-black-100 p-3 rounded-xl"
                />
              </div>
              <button className="bg-primary-600 text-white py-3 rounded-3xl mt-4">
                Save
              </button>
            </div>
          </>
        ) : paymentMode === "paypal" ? (
          <>
            <div className="flex gap-4 items-center">
              <BackButton handleBack={() => setPaymentMode("")} />
              <h1 className="font-semibold text-body-xl">Add Payment</h1>
            </div>
            <hr />
            <div className="flex flex-col gap-3">
              <p className="font-semibold">Email</p>
              <input
                type="email"
                placeholder="johndoe@gmail.com"
                className="bg-black-100 p-3 rounded-xl"
              />
              <button className="bg-primary-600 text-white py-3 rounded-3xl mt-4">
                Save
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="font-semibold text-body-xl">Add Payment Method</h1>
            <hr />
            <div className="flex flex-col gap-3">
              <div
                className="flex bg-black-100 p-4 rounded-2xl justify-between"
                onClick={() => setPaymentMode("visa")}
              >
                <div className="flex gap-2">
                  <Image
                    src={assets.icons.mastercard}
                    height={20}
                    width={20}
                    alt="mastercard"
                  />
                  <h1>Visa</h1>
                </div>
                <Image
                  src={assets.icons.arrow_right}
                  height={20}
                  width={20}
                  alt="arrow"
                />
              </div>
              <div
                className="flex bg-black-100 p-4 rounded-2xl justify-between"
                onClick={() => setPaymentMode("paypal")}
              >
                <div className="flex gap-2">
                  <Image
                    src={assets.icons.paypal}
                    height={20}
                    width={20}
                    alt="paypal"
                  />
                  <h1>Paypal</h1>
                </div>
                <Image
                  src={assets.icons.arrow_right}
                  height={20}
                  width={20}
                  alt="arrow"
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const Payments = () => {
  const [paymentMethods, setPaymentMethods] = useState<object>({});
  const [showAddPaymentModal, setShowAddPaymentModal] =
    useState<boolean>(false);
  return (
    <div>
      {paymentMethods ? (
        <div className="flex flex-col gap-4 mt-2">
          <h1 className="font-bold">My Payments</h1>
          <PaymentMethodItem />
          <div className="flex gap-2 bg-primary-50 border border-primary-300 w-56 py-2 items-center justify-center text-nowrap rounded-xl ">
            <Image src={assets.icons.plus} width={20} height={20} alt="plus" />
            <p onClick={() => setShowAddPaymentModal(true)}>
              Add Payment Method
            </p>
          </div>
          {showAddPaymentModal && (
            <AddPaymentModal setShowAddPaymentModal={setShowAddPaymentModal} />
          )}
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
