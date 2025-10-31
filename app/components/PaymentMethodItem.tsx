import Image from "next/image";
import assets from "@/assets";
import { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";
import Loading from "./Loading";

interface PaymentMethods {
  id?: number;
  userId?: number;
  type?: string;
  provider: string;
  cardNumber: string;
  expiryDate: string;
  cvv?: string;
  isDefault?: boolean;
  createdAt?: string;
  deletePayment?: (id: number) => void;
  onDelete?: () => void;
  onSelect?: (id: number) => void;
}

const PaymentMethodItem = ({
  provider,
  cardNumber,
  expiryDate,
  isDefault,
  deletePayment,
  id,
  onDelete,
  onSelect,
}: PaymentMethods) => {
  const context = useContext(UserDataContext);
  const { loading } = context!;

  const handleDelete = async () => {
    if (deletePayment && id) {
      await deletePayment(id);
      onDelete!();
    }
  };

  return (
    <div
      className="bg-white p-4 rounded-2xl border border-black-200 text-body-md flex justify-between items-center"
      onClick={() => onSelect?.(id!)}
    >
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <Loading />
        </div>
      )}
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
      <div
        onClick={() => handleDelete()}
        className="bg-primary-100 p-1 h-8 rounded-full border-primary-600 border hover:bg-primary-200 hover:border-primary-600
        transition-all duration-300 cursor-pointer"
      >
        <Image src={assets.icons.bin_purple} height={20} width={20} alt="bin" />
      </div>
    </div>
  );
};

export default PaymentMethodItem;
