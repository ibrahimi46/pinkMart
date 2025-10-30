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

interface AddressItemProps extends Address {
  onSelect: (id: number) => void;
  selectedId: number | null;
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
  selectedId,
}: AddressItemProps) => {
  const isSelected = selectedId === id;
  return (
    <div
      className="flex justify-between bg-black-100 p-4 rounded-3xl border cursor-pointer border-black-200 text-body-md"
      onClick={() => onSelect(id!)}
    >
      <div className="flex gap-4">
        <div>
          <div className="flex gap-2 items-center">
            <h1 className="font-semibold">{type}</h1>
            <h1 className="text-body-sm">{isDefault && "(Default Address)"}</h1>
          </div>
          <p>{`${aptNumber}, ${streetAddress}, ${city} - ${zipCode}`}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Image src={assets.icons.edit} height={20} width={20} alt="edit" />
        <p className="hidden sm:block">Edit</p>
      </div>
    </div>
  );
};

export default AddressItem;
