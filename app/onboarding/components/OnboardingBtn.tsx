import Image from "next/image";
import assets from "@/assets";

interface onBoardingBtnProps {
  step: number;
  handleNext: () => void;
  disabled: boolean;
}

const OnBoardingBtn = ({ step, handleNext, disabled }: onBoardingBtnProps) => {
  return (
    <button
      disabled={disabled}
      onClick={handleNext}
      className={`flex rounded-full
        w-full justify-center border py-3 sm:w-36 sm:px-6 sm:py-3 gap-2 transition-all duration-200 ${
          disabled
            ? "bg-black-100 text-black-400 font-bold hover:border-black-700"
            : "bg-primary-600 text-black-50 hover:bg-primary-700 hover:text-primary-100 hover:border-primary-100"
        }`}
    >
      {step == 5 ? <p className="">Start</p> : <p className="">Continue</p>}
      <Image
        src={assets.icons.arrow_right_gray}
        width={18}
        height={18}
        alt=""
      />
    </button>
  );
};

export default OnBoardingBtn;
