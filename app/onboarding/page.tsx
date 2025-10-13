"use client";

import React, { useState } from "react";
import BackButton from "../components/BackButton";
import Progressbar from "./components/Progressbar";
import OnboardingBtn from "./components/OnboardingBtn";
import Step1 from "./components/Step1";
import Step2 from "./components/Step2";
import Step3 from "./components/Step3";
import Step4 from "./components/Step4";
import Step5 from "./components/Step5";
import OnboardLoadingPage from "./OnboardLoadingPage";

const Onboarding = () => {
  const [step, setStep] = useState<number>(1);

  const [step1Selected, setStep1Selected] = useState<string>("");
  const [step2Selected, setStep2Selected] = useState<string>("");
  const [step3Selected, setStep3Selected] = useState<string>("");
  const [step4Selected, setStep4Selected] = useState<string>("");
  const [step5Selected, setStep5Selected] = useState<string>("");

  const handleNext = () => {
    if (step < 5) {
      setStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  const isButtonEnabled = () => {
    switch (step) {
      case 1:
        return !!step1Selected;
      case 2:
        return !!step2Selected;
      case 3:
        return !!step3Selected;
      case 4:
        return !!step4Selected;
      case 5:
        return !!step5Selected;
      default:
        return false;
    }
  };

  return (
    <main className="min-h-screen mx-6 sm:mx-40 py-16 sm:h-full flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <BackButton handleBack={handleBack} />
        <Progressbar step={step} />
      </div>
      {step === 1 && (
        <Step1
          step1Selected={step1Selected}
          setStep1Selected={setStep1Selected}
        />
      )}
      {step === 2 && (
        <Step2
          step2Selected={step2Selected}
          setStep2Selected={setStep2Selected}
        />
      )}
      {step === 3 && (
        <Step3
          step3Selected={step3Selected}
          setStep3Selected={setStep3Selected}
        />
      )}
      {step === 4 && (
        <Step4
          step4Selected={step4Selected}
          setStep4Selected={setStep4Selected}
        />
      )}
      {step === 5 && (
        <Step5
          step5Selected={step5Selected}
          setStep5Selected={setStep5Selected}
        />
      )}
      <OnboardingBtn
        step={step}
        handleNext={handleNext}
        disabled={!isButtonEnabled()}
      />
    </main>
  );
};

export default Onboarding;
