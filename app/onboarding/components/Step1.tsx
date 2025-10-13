import Image from "next/image";
import assets from "@/assets";

interface Step1Props {
  step1Selected: string;
  setStep1Selected: (name: string) => void;
}

interface Step1ItemProps {
  name: string;
  source: string;
  step1Selected: string;
  setStep1Selected: (name: string) => void;
}

const Step1Item = ({
  name,
  source,
  step1Selected,
  setStep1Selected,
}: Step1ItemProps) => {
  return (
    <button
      onClick={() => setStep1Selected(name)}
      className={`bg-black-100 rounded-2xl h-36 justify-center flex flex-col gap-2 cursor-pointer transition-all duration-200 
        items-center ${
          step1Selected === name
            ? "bg-primary-100 border-primary-500 border"
            : "bg-black-100"
        }`}
    >
      <Image src={source} height={44} width={44} alt="items photo" />
      <p>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
    </button>
  );
};

const Step1 = ({ step1Selected, setStep1Selected }: Step1Props) => {
  const options = [
    "mushroom",
    "fish",
    "ham",
    "meat",
    "sphagetti",
    "shrimp",
    "pizza",
    "chicken",
  ] as const;
  return (
    <div className="flex gap-10">
      <div className="flex flex-col gap-6 flex-1">
        <h1 className="text-h8 sm:text-h6 font-bold">
          What kind of meals do you prefer?
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 ">
          {options.map((item) => {
            return (
              <Step1Item
                key={item}
                name={item}
                source={assets.onboarding.step1[item]}
                setStep1Selected={setStep1Selected}
                step1Selected={step1Selected}
              />
            );
          })}
        </div>
      </div>

      <div className="flex-1 hidden lg:flex items-center justify-center">
        <Image
          src="/images/o1.png"
          alt="preview"
          className="max-h-80 object-contain"
          width={500}
          height={500}
        />
      </div>
    </div>
  );
};

export default Step1;
