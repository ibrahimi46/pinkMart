import Image from "next/image";
import assets from "@/assets";

interface Step1ItemProps {
  name: string;
  source: string;
}

const Step1Item = ({ name, source }: Step1ItemProps) => {
  return (
    <button
      className="bg-black-100 rounded-2xl h-36 justify-center flex flex-col gap-2 
    items-center focus:bg-primary-100 focus:border-primary-500 focus:border cursor-pointer"
    >
      <Image src={source} height={44} width={44} alt="items photo" />
      <p>{name}</p>
    </button>
  );
};

const Step1 = () => {
  return (
    <div className="flex flex-1 gap-10 mt-6">
      <div className="flex flex-col gap-6 flex-1">
        <h1 className="text-h8 sm:text-h6 font-bold">
          What kind of meals do you prefer?
        </h1>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 ">
          <Step1Item
            name="Mushroom"
            source={assets.onboarding.step1.mushroom}
          />
          <Step1Item name="Fish" source={assets.onboarding.step1.fish} />
          <Step1Item name="Ham" source={assets.onboarding.step1.ham} />
          <Step1Item name="Meat" source={assets.onboarding.step1.meat} />
          <Step1Item
            name="Spaghettis"
            source={assets.onboarding.step1.sphagetti}
          />
          <Step1Item name="Shrimp" source={assets.onboarding.step1.shrimp} />
          <Step1Item name="Pizza" source={assets.onboarding.step1.pizza} />
          <Step1Item name="Chicken" source={assets.onboarding.step1.chicken} />
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
