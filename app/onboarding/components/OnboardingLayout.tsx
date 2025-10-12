import BackButton from "@/app/components/BackButton";
import Progressbar from "./Progressbar";
import Button from "@/app/components/Button";
import assets from "@/assets";

const OnboardingLayout = () => {
  return (
    <main className="bg-primary-200">
      <div className="flex flex-col gap-4">
        <BackButton />
        <Progressbar step={5} total={10} />
      </div>
      <div>middle div</div>
      <Button
        name="Continue"
        icon={assets.arrow_right}
        iconPosition="right"
        iconColor="opacity-30"
        textStyles="text-black-300"
        extraStyles="bg-black-300"
      />
    </main>
  );
};

export default OnboardingLayout;
