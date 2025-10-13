import React from "react";

interface ProgressbarProps {
  step: number;
}

const Progressbar = ({ step }: ProgressbarProps) => {
  const total = 5;
  const percentage = (step / total) * 100;
  return (
    <div className="bg-black-100 h-3 rounded-full w-4/5">
      <div
        className="bg-primary-700 h-3 rounded-full transition-all duration-300"
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};

export default Progressbar;
