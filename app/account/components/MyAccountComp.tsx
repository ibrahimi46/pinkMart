import Image from "next/image";
import assets from "@/assets";
import { useContext } from "react";
import { UserDataContext } from "@/app/context/UserDataContext";

interface AccDetailItems {
  field1?: string;
  field2?: string;
}

const AccDetailItems = ({ field1, field2 }: AccDetailItems) => {
  return (
    <div className="flex justify-between border border-black-300 p-3  rounded-2xl">
      <div className="">
        <h1 className="font-bold text-body-md">{field1}</h1>
        <p className="text-black-300 text-body-sm">{field2}</p>
      </div>
      <Image src={assets.icons.edit} height={20} width={20} alt="edit" />
    </div>
  );
};

const MyAccountComp = () => {
  const context = useContext(UserDataContext);
  const { user, userDetails } = context!;

  return (
    <div className="flex flex-col gap-3 mt-2">
      <h1 className="font-bold mb-2">Account Details</h1>
      <AccDetailItems field1="Full Name" field2={userDetails?.fullName} />
      <AccDetailItems field1="Mobile Number" field2={userDetails?.phone} />
      <AccDetailItems field1="Email Address" field2={userDetails?.email} />
    </div>
  );
};

export default MyAccountComp;
