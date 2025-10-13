import Image from "next/image";

interface Step3ItemProps {
  text: string;
}

const Step3Item = ({ text }: Step3ItemProps) => {
  return (
    <button className=" bg-black-100 w-full border border-transparent font-semibold flex justify-between px-4 rounded-full py-3 focus:bg-primary-100 focus:border-primary-500 focus:border cursor-pointer transition-all duration-200">
      {text}
    </button>
  );
};

const Step3 = () => {
  return (
    <div className="flex-1 gap-10">
      <div className="flex">
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-h8 sm:text-h6 font-bold">
            What are your goals with PinkMart?
          </h1>
          <div className="flex flex-wrap gap-4">
            <Step3Item text="One person" />
            <Step3Item text="2" />
            <Step3Item text="3-4" />
            <Step3Item text="5-6" />
            <Step3Item text="More than 6" />
          </div>
        </div>
        <div className="flex-1 hidden lg:flex items-center justify-center">
          <Image
            src="/images/o2.png"
            alt="preview"
            className="max-h-80 object-contain"
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default Step3;
