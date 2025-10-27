import Image from "next/image";
import assets from "@/assets";
import BackButton from "@/app/components/BackButton";
import { useState } from "react";

interface CheckoutProps {
  handleStepBack: (step?: string) => void;
  selectedDeliveryDate: string;
}

const Checkout = ({ handleStepBack, selectedDeliveryDate }: CheckoutProps) => {
  const [showAddresses, setShowAddresses] = useState<boolean>(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState<boolean>(false);
  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-3xl border border-black-100">
      <div className="mb-4">
        <BackButton handleBack={() => handleStepBack()} />
      </div>
      <div className="flex justify-between">
        <div className="flex gap-3 items-center">
          <div className="bg-primary-100 p-2 rounded-full ">
            <Image
              src={assets.icons.card_purple}
              height={30}
              width={30}
              alt="card"
            />
          </div>
          <h1 className="font-semibold text-body-xl">Checkout</h1>
        </div>
        <div className="flex gap-2 items-center">
          <Image
            src={assets.icons.location_purple}
            height={20}
            width={20}
            alt="location"
          />
          <p className="text-body-sm md:text-body-md text-primary-600">
            {`Deliver ${selectedDeliveryDate}`}
          </p>
        </div>
      </div>
      {/** Delivery Info Container */}
      {showAddresses ? (
        <div>add</div>
      ) : (
        <div className="border border-black-100 p-5 rounded-2xl flex flex-col gap-3">
          <div className="flex justify-between">
            <h1 className="font-semibold">Delivery Info</h1>
            <Image
              src={assets.icons.arrow_right}
              height={25}
              width={25}
              alt="right"
            />
          </div>
          <div className="flex gap-4 text-body-sm md:text-body-md">
            <p>Deliver to:</p>
            <div className="flex gap-2">
              <Image
                src={assets.icons.location_purple}
                height={25}
                width={25}
                alt="location"
              />
              <p className="text-primary-600">
                2118 Thornridge Cir, Connecticut 35624
              </p>
            </div>
          </div>
        </div>
      )}
      {/** Payment Method Container */}
      <div className="border border-black-100 p-5 rounded-2xl flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="font-semibold">Payment Method</h1>
          <Image
            src={assets.icons.arrow_right}
            height={25}
            width={25}
            alt="right"
          />
        </div>
        <div className="flex gap-4 text-body-sm md:text-body-md">
          <p>Pay with:</p>
          <div className="flex gap-2">
            <Image
              src={assets.icons.card_purple}
              height={25}
              width={25}
              alt="location"
            />
            <p className="text-primary-600">MasterCard ****3434</p>
          </div>
        </div>
      </div>

      <div className="border border-black-100 p-5 rounded-2xl flex flex-col gap-3">
        <div className="flex justify-between">
          <h1 className="font-semibold">Review Order</h1>
        </div>

        <div
          className="bg-black-100 p-4 rounded-xl flex justify-between"
          onClick={() => handleStepBack()}
        >
          <div>
            <div className="bg-white flex items-center justify-center h-14 w-14 rounded-xl">
              <Image
                src={assets.home.best_sellers.img1}
                height={40}
                width={40}
                alt="item"
              />
            </div>
          </div>
          <Image
            src={assets.icons.arrow_right}
            height={25}
            width={25}
            alt="right"
          />
        </div>
      </div>
    </div>
  );
};

export default Checkout;
