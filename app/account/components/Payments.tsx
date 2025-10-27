import React, { useEffect, useState } from "react";
import NoDataPlaceholder from "./NoDataPlaceholder";
import assets from "@/assets";
import Image from "next/image";
import BackButton from "@/app/components/BackButton";

interface PaymentMethods {
  id?: number;
  userId?: number;
  type?: string;
  provider: string;
  cardNumber: string;
  expiryDate: string;
  cvv?: string;
  isDefault: boolean;
  createdAt?: string;
  deletePayment?: (id: number) => void;
  onDelete: () => void;
}

const PaymentMethodItem = ({
  provider,
  cardNumber,
  expiryDate,
  isDefault,
  deletePayment,
  id,
  onDelete,
}: PaymentMethods) => {
  const handleDelete = async () => {
    if (deletePayment && id) {
      const result = await deletePayment(id);
      onDelete();
    }
  };

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
          <h1 className="font-semibold">{`${provider.toUpperCase()} - ${cardNumber}`}</h1>
          <p className="text-black-400 text-body-sm">{expiryDate}</p>
          {isDefault && <p className="text-body-sm">Default</p>}
        </div>
      </div>
      <div onClick={() => handleDelete()}>
        <Image src={assets.icons.bin_purple} height={20} width={20} alt="bin" />
      </div>
    </div>
  );
};

interface AddPaymentModalProps {
  setShowAddPaymentModal: (value: boolean) => void;
  onPayment: () => void;
}

const AddPaymentModal = ({
  setShowAddPaymentModal,
  onPayment,
}: AddPaymentModalProps) => {
  const [paymentMode, setPaymentMode] = useState<string>("");
  const [type, setType] = useState<string>("");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>("");
  const [cvv, setCvv] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const { addPaymentMethod, getPaymentMethods } = usePayments();

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
                type="text"
                maxLength={16}
                placeholder="XXXX-XXXX-XXXX-XXXX"
                className="bg-black-100 p-3 rounded-xl"
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="flex justify-between">
                <input
                  type="date"
                  placeholder="MM/YY"
                  className="bg-black-100 p-3 rounded-xl"
                  onChange={(e) => setExpiryDate(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="CVC"
                  className="bg-black-100 p-3 rounded-xl"
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <div className="flex gap-2">
                <p className="text-body-md font-semibold">Save as Default</p>
                <input
                  type="checkbox"
                  onChange={() => setIsDefault(!isDefault)}
                />
              </div>
              <button
                onClick={() => handleSave()}
                className="bg-primary-600 text-white py-3 rounded-3xl mt-2"
              >
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
                onClick={() => {
                  setPaymentMode("visa");
                  setType("Credit Card");
                }}
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
                onClick={() => {
                  setPaymentMode("paypal");
                  setType("Paypal");
                }}
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
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethods[]>([]);
  const [showAddPaymentModal, setShowAddPaymentModal] =
    useState<boolean>(false);

  const { getPaymentMethods, deletePayment } = usePayments();

  const fetchPayments = async () => {
    const data = await getPaymentMethods();
    if (data) {
      setPaymentMethods(data);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  return (
    <div>
      {paymentMethods.length > 0 ? (
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
                onDelete={fetchPayments}
              />
            );
          })}
          <div className="flex gap-2 bg-primary-50 border border-primary-300 w-56 py-2 items-center justify-center text-nowrap rounded-xl ">
            <Image src={assets.icons.plus} width={20} height={20} alt="plus" />
            <p onClick={() => setShowAddPaymentModal(true)}>
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
              setShowAddPaymentModal(true);
              console.log("test");
            }}
          />
        </div>
      )}
      {showAddPaymentModal && (
        <AddPaymentModal
          setShowAddPaymentModal={setShowAddPaymentModal}
          onPayment={fetchPayments}
        />
      )}
    </div>
  );
};

export default Payments;
