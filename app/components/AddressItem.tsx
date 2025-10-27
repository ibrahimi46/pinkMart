import Image from "next/image";
import assets from "@/assets";

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

export default AddressItem;
