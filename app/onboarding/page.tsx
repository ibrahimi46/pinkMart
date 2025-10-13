import React from "react";
import BackButton from "../components/BackButton";
import Progressbar from "./components/Progressbar";
import OnboardingBtn from "./components/OnboardingBtn";
import Step3 from "./components/Step3";

const Onboarding = () => {
  return (
    <main className="min-h-screen mx-6 sm:mx-40 py-16 sm:h-full flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <BackButton />
        <Progressbar step={5} total={10} />
      </div>
      <Step3 />
      <OnboardingBtn />
    </main>
  );
};

export default Onboarding;
