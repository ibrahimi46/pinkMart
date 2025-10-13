import Image from "next/image";
import assets from "@/assets";

interface Step2Props {
  step2Selected: string;
  setStep2Selected: (name: string) => void;
}

interface Step2ItemProps {
  name: string;
  step2Selected: string;
  setStep2Selected: (name: string) => void;
}

const Step2Item = ({
  name,
  step2Selected,
  setStep2Selected,
}: Step2ItemProps) => {
  return (
    <button
      onClick={() => setStep2Selected(name)}
      className={`flex gap-2 border rounded-full px-4 py-2 justify-center cursor-pointer transition-all duration-200 ${
        step2Selected === name
          ? "bg-primary-100 border-purple-500 border"
          : "bg-black-100"
      }`}
    >
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

const Step2 = ({ step2Selected, setStep2Selected }: Step2Props) => {
  return (
    <div className="flex-1 gap-10">
      <div className="flex">
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-h8 sm:text-h6 font-bold">
            What are your goals with PinkMart?
          </h1>
          <div className="flex flex-wrap gap-4">
            <Step2Item
              name="Save time on shopping"
              step2Selected={step2Selected}
              setStep2Selected={setStep2Selected}
            />
            <Step2Item
              name="Eat healthier"
              step2Selected={step2Selected}
              setStep2Selected={setStep2Selected}
            />
            <Step2Item
              name="Try new recipes"
              step2Selected={step2Selected}
              setStep2Selected={setStep2Selected}
            />
            <Step2Item
              name="Save money"
              step2Selected={step2Selected}
              setStep2Selected={setStep2Selected}
            />
            <Step2Item
              name="Simplify meal planning"
              step2Selected={step2Selected}
              setStep2Selected={setStep2Selected}
            />
            <Step2Item
              name="Reduce food waste"
              step2Selected={step2Selected}
              setStep2Selected={setStep2Selected}
            />
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
