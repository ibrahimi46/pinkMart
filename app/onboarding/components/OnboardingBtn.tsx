import Link from "next/link";
import Image from "next/image";
import assets from "@/assets";

const onBoardingBtn = () => {
  return (
    <Link
      href="#"
      className="flex bg-black-300 text-black-400 rounded-full
        w-full justify-center py-3 sm:w-36 sm:px-6 sm:py-3 gap-2 w-fit hover:bg-primary-700 hover:text-primary-100 hover:border-primary-100 transition-all duration-200"
    >
      <p className="">Continue</p>
      <Image
        src={assets.icons.arrow_right_gray}
        width={18}
        height={18}
        alt=""
      />
    </Link>
  );
};

export default onBoardingBtn;
