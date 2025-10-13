import Image from "next/image";

interface Step5Props {
  step5Selected: string;
  setStep5Selected: (text: string) => void;
}

interface Step5ItemProps {
  text: string;
  step5Selected: string;
  setStep5Selected: (text: string) => void;
}

const Step5Item = ({
  text,
  step5Selected,
  setStep5Selected,
}: Step5ItemProps) => {
  return (
    <button
      onClick={() => {
        setStep5Selected(text);
        console.log(text);
      }}
      className={`w-full border border-transparent font-semibold flex justify-between px-4 rounded-full py-3 transition-all duration-200 ${
        step5Selected === text
          ? "bg-primary-100 border-purple-500 border"
          : "bg-black-100"
      }`}
    >
      {text}
    </button>
  );
};

const Step5 = ({ step5Selected, setStep5Selected }: Step5Props) => {
  return (
    <div className="flex-1 gap-10">
      <div className="flex">
        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-h8 sm:text-h6 font-bold">
            How often do you go shopping?
          </h1>
          <div className="flex flex-wrap gap-4">
            <Step5Item
              text="Daily"
              step5Selected={step5Selected}
              setStep5Selected={setStep5Selected}
            />
            <Step5Item
              text="Every 2-3 days"
              step5Selected={step5Selected}
              setStep5Selected={setStep5Selected}
            />
            <Step5Item
              text="Once a week"
              step5Selected={step5Selected}
              setStep5Selected={setStep5Selected}
            />
            <Step5Item
              text="Every 2 weeks"
              step5Selected={step5Selected}
              setStep5Selected={setStep5Selected}
            />
            <Step5Item
              text="Once a month"
              step5Selected={step5Selected}
              setStep5Selected={setStep5Selected}
            />
          </div>
        </div>
        <div className="flex-1 hidden lg:flex items-center justify-center">
          <Image
            src="/images/o5.png"
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

export default Step5;
