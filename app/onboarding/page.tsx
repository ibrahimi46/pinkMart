import React from "react";
import BackButton from "../components/BackButton";
import Progressbar from "./components/Progressbar";
import OnboardingBtn from "./components/OnboardingBtn";
import Step1 from "./components/Step1";

const Onboarding = () => {
  return (
    <main className="h-screen mx-6 sm:mx-40 py-14">
      <div className="flex flex-col gap-4">
        <BackButton />
        <Progressbar step={5} total={10} />
      </div>
      <Step1 />
      <div className="mt-24">
        <OnboardingBtn />
      </div>
    </main>
  );
};

export default Onboarding;
