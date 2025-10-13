import Image from "next/image";
import assets from "@/assets";

interface Step2ItemProps {
  name: string;
}

const Step2Item = ({ name }: Step2ItemProps) => {
  return (
    <button className="bg-black-100 group flex gap-2 rounded-full px-4 py-2 justify-center focus:bg-primary-100 focus:border-primary-500 focus:border cursor-pointer transition-all duration-200">
      <p className="whitespace-nowrap">{name}</p>
      <Image
        src={assets.icons.check}
        width={22}
        height={22}
        alt=""
        className="hidden group-focus:block"
      />
    </button>
  );
};

const Step2 = () => {
  return (
    <div className="flex-1 gap-10">
      <div className="flex">
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-h8 sm:text-h6 font-bold">
            What are your goals with PinkMart?
          </h1>
          <div className="flex flex-wrap gap-4">
            <Step2Item name="Save time on shopping" />
            <Step2Item name="Eat healthier" />
            <Step2Item name="Try new recipes" />
            <Step2Item name="Save money" />
            <Step2Item name="Simplify meal planning" />
            <Step2Item name="Reduce food waste" />
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

export default Step2;
