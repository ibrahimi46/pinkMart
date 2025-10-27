import React, { useEffect, useState } from "react";
import NoDataPlaceholder from "./NoDataPlaceholder";
import assets from "@/assets";
import Image from "next/image";
import Button from "@/app/components/Button";
import useAddresses from "@/app/utils/useAddresses";

const AddressItem = ({
  type,
  streetAddress,
  city,
  zipCode,
  aptNumber,
  isDefault,
}: Address) => {
  return (
    <div className="flex justify-between bg-black-100 p-4 rounded-3xl border border-black-200 text-body-md">
      <div>
        <div className="flex gap-2 items-center">
          <h1 className="font-semibold">{type}</h1>
          <h1 className="text-body-sm">{isDefault && "(Default Address)"}</h1>
        </div>
        <p>{`${aptNumber}, ${streetAddress}, ${city} - ${zipCode}`}</p>
      </div>
      <div className="flex items-center gap-2">
        <Image src={assets.icons.edit} height={20} width={20} alt="edit" />
        <p className="hidden sm:block">Edit</p>
      </div>
    </div>
  );
};

interface AddAddressModalProps {
  setShowAddAddrModal: (value: boolean) => void;
  onAdd: () => void;
}

const AddAddressModal = ({
  setShowAddAddrModal,
  onAdd,
}: AddAddressModalProps) => {
  const [type, setType] = useState<string>("home");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [aptNum, setAptNum] = useState<string>("");
  const [zipCode, setzipCode] = useState<string>("");
  const [isDefault, setIsDefault] = useState<boolean>(false);

  const { addAddress } = useAddresses();
  return (
    <div className="flex flex-col gap-6 text-body-sm md:text-body-md p-4">
      <div className="flex justify-between items-center">
        <h1 className="font-semibold text-body-xl">Add New Address</h1>
        <div
          onClick={() => setShowAddAddrModal(false)}
          className="bg-black-100 p-2 rounded-full border cursor-pointer border-black-600 hover:bg-black-400 hover:border-black-50"
        >
          <Image src={assets.icons.close} height={15} width={15} alt="close" />
        </div>
      </div>
      <hr />
      {/* <div>map</div> */}
      <div className="flex flex-col gap-2">
        <h1 className="font-semibold">Select Address Type</h1>
        <div className="flex gap-3">
          <Button
            name="Home"
            icon={assets.icons.home}
            iconPosition="left"
            textStyles="text-body-sm"
            extraStyles={`border border-black-200 px-3 h-8 ${
              type === "home" ? "bg-primary-100 border-primary-600" : ""
            }`}
            handleOnClick={() => setType("home")}
          />
          <Button
            name="Apartment"
            icon={assets.icons.villa}
            iconPosition="left"
            textStyles="text-body-sm"
            extraStyles={`border border-black-200 px-3 h-8 ${
              type === "apartment" ? "bg-primary-100 border-primary-600" : ""
            }`}
            handleOnClick={() => setType("apartment")}
          />
          <Button
            name="Office"
            icon={assets.icons.work}
            iconPosition="left"
            textStyles="text-body-sm"
            extraStyles={`border border-black-200 px-3 h-8 ${
              type === "office" ? "bg-primary-100 border-primary-600" : ""
            }`}
            handleOnClick={() => setType("office")}
          />
        </div>
      </div>
      <div className="flex flex-col gap-2 font-semibold">
        <label htmlFor="address">Street Address</label>
        <input
          type="text"
          placeholder="XXXX, Example road, city, postcode..."
          className="p-3 border border-black-100 rounded-xl"
          onChange={(e) => setAddress(e.target.value)}
        />
        <div className="flex gap-4 items-center flex-wrap mt-2">
          <div className="flex flex-col gap-2 w-full sm:w-[32%]">
            <label htmlFor="city">City</label>
            <input
              type="text"
              placeholder="City..."
              className="p-3 border border-black-100 rounded-xl"
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-[31%]">
            <label htmlFor="aptNumber">Apartment Number</label>
            <input
              type="text"
              placeholder="XX"
              className="p-3 border border-black-100 rounded-xl"
              onChange={(e) => setAptNum(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 w-full sm:w-[32%]">
            <label htmlFor="address">Zip Code</label>
            <input
              type="text"
              placeholder="XXXXX"
              className="p-3 border border-black-100 rounded-xl"
              onChange={(e) => setzipCode(e.target.value)}
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
        <label htmlFor="isDefault">Default Address</label>
      </div>
      <Button
        icon={assets.icons.location}
        iconPosition="left"
        name="Save Address"
        extraStyles="bg-primary-600 text-white"
        iconStyle="filter invert"
        handleOnClick={() => {
          addAddress({
            type,
            streetAddress: address,
            aptNumber: aptNum,
            zipCode: zipCode,
            city: city,
            isDefault,
          });
          onAdd();
          setShowAddAddrModal(false);
        }}
      />
    </div>
  );
};

interface Address {
  id?: number;
  userId?: number;
  type: string;
  streetAddress: string;
  city: string;
  aptNumber: string;
  zipCode: string;
  isDefault: boolean;
}

const MyAddresses = () => {
  const [showAddAddrModal, setShowAddAddrModal] = useState<boolean>(false);
  const [availableAddresses, setAvailableAddresses] = useState<Address[]>([]);

  const { getAddresses } = useAddresses();

  const fetchAddress = async () => {
    const result = await getAddresses();
    if (result) setAvailableAddresses(result);
  };

  useEffect(() => {
    fetchAddress();
  }, []);

  return (
    <div>
      {showAddAddrModal ? (
        <AddAddressModal
          setShowAddAddrModal={setShowAddAddrModal}
          onAdd={fetchAddress}
        />
      ) : (
        <>
          {availableAddresses ? (
            <div className="mt-2 flex flex-col gap-6">
              <h1 className="font-semibold">My Addresses</h1>
              {availableAddresses &&
                availableAddresses.map((address) => {
                  return (
                    <AddressItem
                      key={address.id}
                      type={address.type}
                      city={address.city}
                      zipCode={address.zipCode}
                      aptNumber={address.aptNumber}
                      streetAddress={address.streetAddress}
                      isDefault={address.isDefault}
                    />
                  );
                })}
              <div
                onClick={() => setShowAddAddrModal(true)}
                className="flex gap-2 bg-primary-50 border cursor-pointer transition-all duration-300
                hover:bg-primary-600
                border-primary-300 sm:w-56 w-full py-2 items-center justify-center text-nowrap rounded-xl "
              >
                <Image
                  src={assets.icons.plus}
                  width={20}
                  height={20}
                  alt="plus"
                />
                <p>Add Address</p>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-2">
                <NoDataPlaceholder
                  btnName="Add New Address"
                  field1="You don't have any added addresses"
                  field2="Add your address, start shopping!"
                  btnIcon={assets.icons.plus}
                  icon={assets.icons.location_purple}
                  handleAction={() => setShowAddAddrModal(true)}
                />
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default MyAddresses;
