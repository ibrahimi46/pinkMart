"use client";

import BackButton from "@/app/components/BackButton";
import Link from "next/link";

const Loginotp = () => {
  return (
    <main className="flex justify-center mt-6 md:mt-14">
      <div className="md:w-96 w-80 flex flex-col">
        <BackButton />
        <p className="my-6 text-h7 font-semibold">Check your email</p>
        <div className="bg-black-100 md:w-96 w-80 rounded-3xl p-5 flex flex-col gap-8">
          <div>
            <p className="text-black-500">We sent a 6-digit code to</p>
            <p className="font-semibold">johndoe@gmail.com</p>
            <div className="flex gap-2 mt-4">
              <input
                type="text"
                maxLength={1}
                placeholder="0"
                className="w-16 h-16 rounded-2xl text-center font-semibold text-h5 border"
              />
              <input
                type="text"
                maxLength={1}
                placeholder="0"
                className="w-16 h-16 rounded-2xl text-center font-semibold text-h5 border"
              />
              <input
                type="text"
                maxLength={1}
                placeholder="0"
                className="w-16 h-16 rounded-2xl text-center font-semibold text-h5 border"
              />
              <input
                type="text"
                maxLength={1}
                placeholder="0"
                className="w-16 h-16 rounded-2xl text-center font-semibold text-h5 border"
              />
            </div>
          </div>
        </div>
        <p className="text-body-sm mt-4">
          Haven&apos;t received your code?
          <Link href="#" className="text-primary-600 font-semibold">
            &nbsp;&nbsp;Request a New Code
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Loginotp;
