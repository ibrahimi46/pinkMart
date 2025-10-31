import React, { useContext, useState } from "react";
import NoDataPlaceholder from "./NoDataPlaceholder";
import assets from "@/assets";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";
import { UserDataContext } from "@/app/context/UserDataContext";
import PaymentMethodItem from "@/app/components/PaymentMethodItem";
import Button from "@/app/components/Button";
import Loading from "@/app/components/Loading";

interface AddPaymentModalProps {
  setShowAddPaymentModal: (value: boolean) => void;
  onPayment: () => void;
}

const AddPaymentComp = ({
  setShowAddPaymentModal,
  onPayment,
}: AddPaymentModalProps) => {
  const [paymentMode, setPaymentMode] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const context = useContext(UserDataContext);
  const { addPaymentMethod, loading } = context!;

  const handleSave = () => {
    addPaymentMethod({
      type,
      provider: paymentMode,
      cardNumber,
      expiryDate,
      cvv,
      isDefault,
    });
    setShowAddPaymentModal(false);
    onPayment();
  };

  return (
    <div className="flex flex-col gap-6 text-body-sm md:text-body-md p-4">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}
      {paymentMode === "visa" ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <BackButton handleBack={() => setPaymentMode("")} />
              <h1 className="font-semibold text-body-xl">Add Payment</h1>
            </div>
            <div
              onClick={() => setShowAddPaymentModal(false)}
              className="bg-black-100 p-2 rounded-full border cursor-pointer border-black-600 hover:bg-black-400 hover:border-black-50"
            >
              <Image
                src={assets.icons.close}
                height={15}
                width={15}
                alt="close"
              />
            </div>
          </div>
          <hr />

          <div className="flex flex-col gap-2 font-semibold">
            <label htmlFor="cardNumber">Card Number</label>
            <input
              type="text"
              maxLength={16}
              placeholder="XXXX-XXXX-XXXX-XXXX"
              className="p-3 border border-black-100 rounded-xl"
              onChange={(e) => setCardNumber(e.target.value)}
            />
            <div className="flex gap-4 items-center flex-wrap mt-2">
              <div className="flex flex-col gap-2 w-full sm:w-[48%]">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="date"
                  placeholder="MM/YY"
                  className="p-3 border border-black-100 rounded-xl"
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
              </div>
              <div className="flex flex-col gap-2 w-full sm:w-[48%]">
                <label htmlFor="cvv">CVV</label>
                <input
                  type="text"
                  placeholder="CVC"
                  maxLength={3}
                  className="p-3 border border-black-100 rounded-xl"
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <input
              type="checkbox"
              name="isDefault"
              id="isDefault"
              onChange={() => setIsDefault(!isDefault)}
            />
            <label htmlFor="isDefault">Save as Default</label>
          </div>
          <Button
            icon={assets.icons.checkout}
            iconPosition="left"
            name="Save Payment Method"
            extraStyles="bg-primary-600 text-white"
            iconStyle="filter invert"
            handleOnClick={handleSave}
          />
        </>
      ) : paymentMode === "paypal" ? (
        <>
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
              <BackButton handleBack={() => setPaymentMode("")} />
              <h1 className="font-semibold text-body-xl">Add Payment</h1>
            </div>
            <div
              onClick={() => setShowAddPaymentModal(false)}
              className="bg-black-100 p-2 rounded-full border cursor-pointer border-black-600 hover:bg-black-400 hover:border-black-50"
            >
              <Image
                src={assets.icons.close}
                height={15}
                width={15}
                alt="close"
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-2 font-semibold">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              className="p-3 border border-black-100 rounded-xl"
            />
          </div>
          <Button
            icon={assets.icons.paypal}
            iconPosition="left"
            name="Save Payment Method"
            extraStyles="bg-primary-600 text-white"
            iconStyle="filter invert"
            handleOnClick={handleSave}
          />
        </>
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="font-semibold text-body-xl">Add Payment Method</h1>
            <div
              onClick={() => setShowAddPaymentModal(false)}
              className="bg-black-100 p-2 rounded-full border cursor-pointer border-black-600 hover:bg-black-400 hover:border-black-50"
            >
              <Image
                src={assets.icons.close}
                height={15}
                width={15}
                alt="close"
              />
            </div>
          </div>
          <hr />
          <div className="flex flex-col gap-3">
            <div
              className="flex bg-black-100 p-4 rounded-2xl justify-between cursor-pointer hover:bg-black-200"
              onClick={() => {
                setPaymentMode("visa");
                setType("Credit Card");
              }}
            >
              <div className="flex gap-2 items-center">
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
              className="flex bg-black-100 p-4 rounded-2xl justify-between cursor-pointer hover:bg-black-200"
              onClick={() => {
                setPaymentMode("paypal");
                setType("Paypal");
              }}
            >
              <div className="flex gap-2 items-center">
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
  );
};

const Payments = () => {
  const [showAddPaymentComp, setShowAddPaymentComp] = useState<boolean>(false);

  const context = useContext(UserDataContext);
  const { paymentMethods, deletePayment, refetchPaymentMethods } = context!;

  return (
    <div>
      {showAddPaymentComp ? (
        <AddPaymentComp
          setShowAddPaymentModal={setShowAddPaymentComp}
          onPayment={refetchPaymentMethods}
        />
      ) : (
        <>
          {paymentMethods && paymentMethods.length > 0 ? (
            <div className="flex flex-col gap-4 mt-2">
              <h1 className="font-bold">My Payments</h1>
              {paymentMethods.map((method) => {
                return (
                  <PaymentMethodItem
                    key={method.id}
                    provider={method.provider}
                    cardNumber={method.cardNumber}
                    expiryDate={method.expiryDate}
                    isDefault={method.isDefault}
                    deletePayment={deletePayment}
                    id={method.id}
                    onDelete={refetchPaymentMethods}
                  />
                );
              })}
              <div
                className="flex gap-2 bg-primary-100 border cursor-pointer transition-all duration-300
                border-primary-300 hover:bg-primary-200 hover:border-primary-600 sm:w-56 w-full py-2 items-center justify-center text-nowrap rounded-xl"
              >
                <Image
                  src={assets.icons.plus_purple}
                  width={20}
                  height={20}
                  alt="plus"
                />
                <p
                  onClick={() => setShowAddPaymentComp(true)}
                  className="text-primary-600"
                >
                  Add Payment Method
                </p>
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
                handleAction={() => {
                  setShowAddPaymentComp(true);
                }}
                navigateTo="#"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Payments;
