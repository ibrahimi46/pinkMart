import Image from "next/image";
import assets from "@/assets";
import { useContext } from "react";
import Loading from "./Loading";
import { UserAccountContext } from "../context/UserAccountContext";

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

interface AddressItemProps extends Address {
  selectedId?: number;
  onSelect: (id: number) => void;
}

const AddressItem = ({
  id,
  type,
  streetAddress,
  city,
  zipCode,
  aptNumber,
  isDefault,
  onSelect,
}: AddressItemProps) => {
  const userAccountContext = useContext(UserAccountContext);
  const { loading, deleteAddress } = userAccountContext!;

  return (
    <div
      onClick={() => onSelect?.(id!)}
      className="flex justify-between items-center bg-white p-4 rounded-3xl border cursor-pointer border-black-200 text-body-md"
    >
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}
      <div className="flex gap-4">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="font-semibold">{type}</h1>
            <h1 className="text-body-sm">{isDefault && "(Default Address)"}</h1>
          </div>
          <p>{`${aptNumber}, ${streetAddress}, ${city} - ${zipCode}`}</p>
        </div>
      </div>
      <div
        onClick={() => {
          deleteAddress(id!);
        }}
        className="bg-primary-100 flex p-1 h-8 rounded-full border-primary-600 border hover:bg-primary-200 hover:border-primary-600
        transition-all duration-300 cursor-pointer"
      >
        <Image src={assets.icons.bin_purple} height={20} width={20} alt="bin" />
      </div>
    </div>
  );
};

export default AddressItem;
