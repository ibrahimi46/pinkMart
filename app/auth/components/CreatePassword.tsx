"use client";

import BackButton from "@/app/components/BackButton";
import Button from "@/app/components/Button";
import assets from "@/assets";
import Image from "next/image";

interface PasswordCheckItemProps {
  text: string;
  icon: string;
}

const PasswordCheckItem = ({ text, icon }: PasswordCheckItemProps) => {
  return (
    <div className="flex gap-3">
      <div className="flex bg-black-200 h-6 w-6 items-center justify-center rounded-full">
        <Image
          src={icon}
          height={14}
          width={14}
          alt=""
          className="invert brightness-0"
        />
      </div>
      <p className="text-body-sm">{text}</p>
    </div>
  );
};

const CreatePassword = () => {
  return (
    <main className="flex justify-center mt-6 md:mt-14">
      <div className="md:w-96 w-80 flex flex-col">
        <BackButton />
        <p className="my-6 text-h7 font-semibold">Create a password</p>
        <div className="bg-black-100 md:w-96 w-80 rounded-3xl p-5 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-body-md">Password</p>
            <input
              type="text"
              placeholder="Password"
              className="h-10 p-3 text-body-sm rounded-lg"
            />
          </div>
          <Button
            name="Continue"
            icon={assets.icons.arrow_right}
            iconPosition="right"
            extraStyles="bg-primary-600 h-8"
            textStyles="text-black-50 text-body-md"
            href=""
          />
          <div className="flex flex-col gap-3">
            <PasswordCheckItem
              text="Must be at least 8 characters long"
              icon={assets.icons.check}
            />
            <PasswordCheckItem
              text="Include at least one uppercase letter (A-Z)"
              icon={assets.icons.check}
            />
            <PasswordCheckItem
              text="No spaces allowed"
              icon={assets.icons.check}
            />
            <PasswordCheckItem
              text="Include at least one number (0-9)"
              icon={assets.icons.check}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default CreatePassword;
