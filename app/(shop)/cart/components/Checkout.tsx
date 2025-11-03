import Image from "next/image";
import assets from "@/assets";
import BackButton from "@/app/components/BackButton";
import { useContext, useEffect, useState } from "react";
import AddressItem from "@/app/components/AddressItem";
import { UserDataContext } from "@/app/context/UserDataContext";
import Loading from "@/app/components/Loading";
import NoDataPlaceholder from "@/app/account/components/NoDataPlaceholder";
import { ProductsContext } from "@/app/context/ProductsContext";

interface CheckoutProps {
  handleStepNext: (step: string) => void;
  selectedDeliveryDate: string;
  selectedAddressId: number | null;
  setSelectedAddressId: (value: number | null) => void;
}

const Checkout = ({
  selectedDeliveryDate,
  selectedAddressId,
  setSelectedAddressId,
  handleStepNext,
}: CheckoutProps) => {
  const [showAddresses, setShowAddresses] = useState<boolean>(false);

  const context = useContext(UserDataContext);
  const productsContext = useContext(ProductsContext);
  const { loading, addresses, defaultAddress, cartItems } = context!;
  const { products } = productsContext!;

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddressId(defaultAddress.id!);
    }
  }, [defaultAddress]);

  const selectedAddress = addresses.find(
    (addr) => addr.id === selectedAddressId
  );

  useEffect(() => {
    if (
      selectedAddressId &&
      !addresses.find((addr) => addr.id === selectedAddressId)
    ) {
      setSelectedAddressId(null);
    }
  }, [addresses, selectedAddressId]);

  const handleAddressSelection = (id: number) => {
    if (id !== null) {
      setSelectedAddressId(id);
      setShowAddresses(false);
    }
  };

  const cartProductImages =
    context && products
      ? context.cartItems
          .map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return product ? product.imageUrl : null;
          })
          .filter((img): img is string => img !== null)
      : [];

  return (
    <div className="flex flex-col gap-4 bg-white p-4 rounded-3xl border border-black-100">
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}
      <div className="mb-4">
        <BackButton handleBack={() => handleStepNext("checkout")} />
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
          withNavigate
        />
      )}

      {/** Review order container */}

      <div
        className="border border-black-100 p-5 rounded-2xl flex flex-col gap-3 cursor-pointer"
        onClick={() => handleStepNext("cart")}
      >
        <div className="flex justify-between">
          <h1 className="font-semibold">Review Order</h1>
        </div>

        <div className="flex gap-2 overflow-x-auto scrollbar-hide">
          {cartProductImages.length > 0 ? (
            cartProductImages.map((img, idx) => (
              <div
                key={idx}
                className="bg-white flex items-center justify-center border shadow-sm h-14 w-14 rounded-xl flex-shrink-0"
              >
                <Image
                  src={img!}
                  height={50}
                  width={50}
                  alt={`product-${idx}`}
                />
              </div>
            ))
          ) : (
            <p className="text-body-sm text-gray-500">No items in cart</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Checkout;
