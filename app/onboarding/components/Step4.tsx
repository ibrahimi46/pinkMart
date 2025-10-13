import Image from "next/image";

interface Step4Props {
  step4Selected: string;
  setStep4Selected: (text: string) => void;
}

interface Step4ItemProps {
  text: string;
  step4Selected: string;
  setStep4Selected: (text: string) => void;
}

const Step4Item = ({
  text,
  step4Selected,
  setStep4Selected,
}: Step4ItemProps) => {
  return (
    <button
      onClick={() => {
        setStep4Selected(text);
        console.log(text);
      }}
      className={`w-full border border-transparent font-semibold flex justify-between px-4 rounded-full py-3 transition-all duration-200 ${
        step4Selected === text
          ? "bg-primary-100 border-purple-500 border"
          : "bg-black-100"
      }`}
    >
      {text}
    </button>
  );
};

const Step4 = ({ step4Selected, setStep4Selected }: Step4Props) => {
  return (
    <div className="flex-1 gap-10">
      <div className="flex">
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-h8 sm:text-h6 font-bold">
            How many meals would you like per week?
          </h1>
          <div className="flex flex-wrap gap-4">
            <Step4Item
              text="1-2 meals"
              step4Selected={step4Selected}
              setStep4Selected={setStep4Selected}
            />
            <Step4Item
              text="3-4 meals"
              step4Selected={step4Selected}
              setStep4Selected={setStep4Selected}
            />
            <Step4Item
              text="5-6 meals"
              step4Selected={step4Selected}
              setStep4Selected={setStep4Selected}
            />
            <Step4Item
              text="7-8 meals"
              step4Selected={step4Selected}
              setStep4Selected={setStep4Selected}
            />
            <Step4Item
              text="More than 10 meals"
              step4Selected={step4Selected}
              setStep4Selected={setStep4Selected}
            />
          </div>
        </div>
        <div className="flex-1 hidden lg:flex items-center justify-center">
          <Image
            src="/images/o4.png"
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

export default Step4;
