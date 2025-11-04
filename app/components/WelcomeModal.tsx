"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import assets from "@/assets";

const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const hasSeenModal = localStorage.getItem("hasSeenWelcomeModal");
    if (!hasSeenModal) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem("hasSeenWelcomeModal", "true");
  };

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 sm:inset-0 
        rounded-t-3xl border z-50 transform transition-all duration-300 flex sm:items-center sm:justify-center
        ${
          isOpen
            ? "translate-y-0  pointer-events-auto bg-black/50 backdrop-blur-sm"
            : "translate-y-full"
        }
        
        `}
    >
      <div className="bg-white p-5 w-[550px] h-auto rounded-3xl flex flex-col gap-4 relative border border-black-300">
        <div
          onClick={handleClose}
          className="absolute  right-3 top-4 border hover:border hover:border-black-700 border-black-100 hover:bg-black-100 transition-all duration-300 p-2 rounded-full cursor-pointer"
        >
          <Image src={assets.icons.close} height={20} width={20} alt="close" />
        </div>
        <div className="flex flex-col gap-4">
          <h1 className="text-body-xl font-bold text-primary-600">Hey!</h1>
          <h2 className="text-body-lg font-semibold">Welcome to pinkMart</h2>
          <hr />
          <div className="flex flex-col gap-3 text-body-md">
            <p>For demo purposes you may access admin account with the following credentials</p>
            <div className="bg-black-100 p-3 rounded-2xl">
              <p className="font-semibold mb-1">username:</p>
              <p className="text-primary-600">johndoe@pinkmart.net</p>
              <p className="font-semibold mb-1 mt-2">password:</p>
              <p className="text-primary-600">admin</p>
            </div>
            <p className="text-black-400 text-body-sm">
              Note: please do not delete all the products or users you may delete a few for demo purposes
            </p>
            <p className="text-black-400 text-body-sm">Enjoy</p>
            <p className="text-black-400 text-body-sm">
              For suggestions: please contact:{" "}
              <a
                href="mailto:anasibrahimi4664@gmail.com"
                className="text-primary-600 hover:underline"
              >
                anasibrahimi4664@gmail.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeModal;

