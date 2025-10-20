"use client";

import BackButton from "@/app/components/BackButton";
import Button from "@/app/components/Button";
import assets from "@/assets";
import Image from "next/image";

interface CreatePasswordProps {
  showCreatePassword: boolean;
  setShowCreatePassword: (value: boolean) => void;
  setFirstName: (value: string) => void;
  setSecondName: (value: string) => void;
  setPassword: (value: string) => void;
  handleSubmission: () => void;
}

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

const CreatePassword = ({
  setShowCreatePassword,
  setFirstName,
  setSecondName,
  setPassword,
  handleSubmission,
}: CreatePasswordProps) => {
  return (
    <main className="flex justify-center">
      <div className="md:w-96 w-80 flex flex-col">
        <div onClick={() => setShowCreatePassword(false)}>
          <BackButton />
        </div>
        <p className="my-6 text-h7 font-semibold">Create a password</p>
        <div className="bg-black-100 md:w-96 w-80 rounded-3xl p-5 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <p className="font-semibold text-body-md">First Name</p>
            <input
              type="text"
              placeholder="First Name"
              className="h-10 p-3 text-body-sm rounded-lg"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <p className="font-semibold text-body-md">Second Name</p>
            <input
              type="text"
              placeholder="Second Name"
              className="h-10 p-3 text-body-sm rounded-lg"
              onChange={(e) => setSecondName(e.target.value)}
            />
            <p className="font-semibold text-body-md">Password</p>
            <input
              type="password"
              placeholder="Password"
              className="h-10 p-3 text-body-sm rounded-lg"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Button
            name="Continue"
            icon={assets.icons.arrow_right}
            iconPosition="right"
            extraStyles="bg-primary-600 h-8"
            textStyles="text-black-50 text-body-md"
            handleOnClick={handleSubmission}
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
