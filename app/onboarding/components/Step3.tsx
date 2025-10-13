import Image from "next/image";

interface Step3Props {
  step3Selected: string;
  setStep3Selected: (text: string) => void;
}

interface Step3ItemProps {
  text: string;
  step3Selected: string;
  setStep3Selected: (text: string) => void;
}

const Step3Item = ({
  text,
  step3Selected,
  setStep3Selected,
}: Step3ItemProps) => {
  return (
    <button
      onClick={() => {
        setStep3Selected(text);
      }}
      className={`w-full border border-transparent font-semibold flex justify-between px-4 rounded-full py-3 transition-all duration-200 ${
        step3Selected === text
          ? "bg-primary-100 border-purple-500 border"
          : "bg-black-100"
      }`}
    >
      {text}
    </button>
  );
};

const Step3 = ({ step3Selected, setStep3Selected }: Step3Props) => {
  return (
    <div className="flex-1 gap-10">
      <div className="flex">
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-h8 sm:text-h6 font-bold">
            What are your goals with PinkMart?
          </h1>
          <div className="flex flex-wrap gap-4">
            <Step3Item
              text="One person"
              step3Selected={step3Selected}
              setStep3Selected={setStep3Selected}
            />
            <Step3Item
              text="2"
              step3Selected={step3Selected}
              setStep3Selected={setStep3Selected}
            />
            <Step3Item
              text="3-4"
              step3Selected={step3Selected}
              setStep3Selected={setStep3Selected}
            />
            <Step3Item
              text="5-6"
              step3Selected={step3Selected}
              setStep3Selected={setStep3Selected}
            />
            <Step3Item
              text="More than 6"
              step3Selected={step3Selected}
              setStep3Selected={setStep3Selected}
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

export default Step3;
