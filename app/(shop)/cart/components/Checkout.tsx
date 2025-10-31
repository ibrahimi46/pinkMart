import Image from "next/image";
import assets from "@/assets";
import BackButton from "@/app/components/BackButton";
import { useContext, useEffect, useState } from "react";
import AddressItem from "@/app/components/AddressItem";
import { UserDataContext } from "@/app/context/UserDataContext";
import PaymentMethodItem from "@/app/components/PaymentMethodItem";
import Loading from "@/app/components/Loading";
import NoDataPlaceholder from "@/app/account/components/NoDataPlaceholder";

interface Payment {
  type: string;
  provider: string;
  expiryDate: string;
  cvv?: string;
  isDefault?: boolean;
  cardNumber: string;
}

interface CheckoutProps {
  handleStepBack: (step?: string) => void;
  selectedDeliveryDate: string;
  setSelectedPaymentMethod: (payment: Payment | null) => void;
}

const Checkout = ({
  handleStepBack,
  selectedDeliveryDate,
  setSelectedPaymentMethod,
}: CheckoutProps) => {
  const [selectedAddressId, setSelectedAddressId] = useState<number | null>(
    null
  );
  const [selectedPaymentId, setSelectedPaymentId] = useState<number | null>(
    null
  );
  const [showAddresses, setShowAddresses] = useState<boolean>(false);
  const [showPaymentMethods, setShowPaymentMethods] = useState<boolean>(false);

  const context = useContext(UserDataContext);
  const { loading, addresses, defaultAddress, paymentMethods, defaultPayment } =
    context!;

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id || null);
    }
  }, [defaultAddress]);

  useEffect(() => {
    if (defaultPayment) {
      setSelectedPaymentId(defaultPayment.id || null);
    }
  }, [defaultPayment]);

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  const selectedPayment = paymentMethods.find(
    (method) => method.id === selectedPaymentId
  );

  useEffect(() => {
    setSelectedPaymentMethod(selectedPayment || null);
  }, [selectedPayment, setSelectedPaymentMethod]);

  useEffect(() => {
    if (
      selectedAddressId &&
      !addresses.find((addr) => addr.id === selectedAddressId)
    ) {
      setSelectedAddressId(null);
    }
  }, [addresses, selectedAddressId]);

  useEffect(() => {
    if (
      selectedPaymentId &&
      !paymentMethods.find((pm) => pm.id === selectedPaymentId)
    ) {
      setSelectedPaymentId(null);
      setSelectedPaymentMethod(null); // clear the parent state
    }
  }, [paymentMethods, selectedPaymentId, setSelectedPaymentMethod]);

  const handleAddressSelection = (id: number) => {
    if (id !== null) {
      setSelectedAddressId(id);
      setShowAddresses(false);
    }
  };

  const handlePaymentSelection = (id: number) => {
    if (id !== null) {
      setSelectedPaymentId(id);
      setShowPaymentMethods(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-3xl border border-black-100">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}
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
        {addresses && addresses.length > 0 && (
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
        )}
      </div>
      {/** Delivery Info Container */}
      {addresses && addresses.length > 0 ? (
        showAddresses ? (
          <div className="border border-black-100 p-5 rounded-2xl flex flex-col gap-3">
            {addresses.map((address) => (
              <AddressItem
                key={address.id}
                type={address.type}
                streetAddress={address.streetAddress}
                city={address.city}
                zipCode={address.zipCode}
                aptNumber={address.aptNumber}
                isDefault={address.isDefault}
                onSelect={handleAddressSelection}
                id={address.id!}
              />
            ))}
          </div>
        ) : (
          <div
            className="border border-black-100 p-5 rounded-2xl flex flex-col gap-3"
            onClick={() => setShowAddresses(true)}
          >
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
              <div className="flex gap-2 items-center ml-2">
                <Image
                  src={assets.icons.location_purple}
                  height={25}
                  width={25}
                  alt="location"
                />
                <p className="text-primary-600">{`${selectedAddress?.aptNumber}, ${selectedAddress?.streetAddress}, ${selectedAddress?.city} - ${selectedAddress?.zipCode}`}</p>
              </div>
            </div>
          </div>
        )
      ) : (
        <NoDataPlaceholder
          btnName="Add New Address"
          field1="You don't have any added addresses"
          field2="Add your address, start shopping!"
          btnIcon={assets.icons.plus}
          icon={assets.icons.location_purple}
          navigateTo="/account?page=addresses"
        />
      )}
      {/** Payment Method Container */}
      {paymentMethods && paymentMethods.length > 0 ? (
        showPaymentMethods ? (
          <div className="border border-black-100 p-5 rounded-2xl flex flex-col gap-3">
            {paymentMethods.map((method) => (
              <PaymentMethodItem
                key={method.id}
                provider={method.provider}
                cardNumber={method.cardNumber}
                expiryDate={method.expiryDate}
                isDefault={method.isDefault!}
                onSelect={handlePaymentSelection}
                id={method.id}
              />
            ))}
          </div>
        ) : (
          <div
            className="border border-black-100 p-5 rounded-2xl flex flex-col gap-3"
            onClick={() => setShowPaymentMethods(true)}
          >
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
              <div className="flex gap-2 items-center ml-2">
                <Image
                  src={assets.icons.card_purple}
                  height={25}
                  width={25}
                  alt="card"
                />
                <p className="text-primary-600">{`${selectedPayment?.provider} - ${selectedPayment?.cardNumber}`}</p>
              </div>
              {selectedPayment?.expiryDate && (
                <p className="text-black-500 ml-8 text-body-sm">
                  {selectedPayment.expiryDate}
                </p>
              )}
            </div>
          </div>
        )
      ) : (
        <NoDataPlaceholder
          btnName="Add New Payment Method"
          field1="You don't have any added Payment Method"
          field2="Add a payment method to place an order!"
          btnIcon={assets.icons.plus}
          icon={assets.icons.card_purple}
          navigateTo="/account?page=payments"
        />
      )}

      {/** Review order container */}

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
