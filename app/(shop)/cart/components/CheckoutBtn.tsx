import assets from "@/assets";
import Image from "next/image";

interface CheckoutBtnProps {
  cartTotal: string;
}

const CheckoutBtn = ({ cartTotal }: CheckoutBtnProps) => {
  return (
    <div className="bg-primary-600 flex justify-between px-4 py-2 text-body-sm rounded-full w-64">
      <div className="flex gap-2 text-black-50">
        <Image
          height={20}
          width={20}
          src={assets.icons.checkout_white}
          alt="checkout"
        />
        <p>Checkout</p>
      </div>
      <p className="text-black-50">${cartTotal}</p>
    </div>
  );
};

export default CheckoutBtn;
