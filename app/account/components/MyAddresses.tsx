import React, { useState } from "react";
import NoDataPlaceholder from "./NoDataPlaceholder";
import assets from "@/assets";
import Image from "next/image";

const AddressItem = () => {
  return (
    <div className="flex justify-between bg-black-100 p-4 rounded-3xl border border-black-200 text-body-md">
      <div className="flex gap-2">
        <input type="radio" />
        <div>
          <h1 className="font-semibold">Home</h1>
          <p>23782, Westminster road, Encanada</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Image src={assets.icons.edit} height={20} width={20} alt="edit" />
        <p className="hidden sm:block">Edit</p>
      </div>
    </div>
  );
};

const MyAddresses = () => {
  const [address, setAddresses] = useState<object>({});
  return (
    <div>
      {address ? (
        <div className="mt-2 flex flex-col gap-6">
          <h1 className="font-semibold">My Addresses</h1>
          <AddressItem />
          <AddressItem />
          <div className="flex gap-2 bg-primary-50 border border-primary-300 sm:w-56 w-full py-2 items-center justify-center text-nowrap rounded-xl ">
            <Image src={assets.icons.plus} width={20} height={20} alt="plus" />
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
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MyAddresses;
