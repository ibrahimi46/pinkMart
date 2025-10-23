import Image from "next/image";
import assets from "@/assets";

interface AccDetailItems {
  field1: string;
  field2: string;
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
  return (
    <div className="flex flex-col gap-3 mt-2">
      <h1 className="font-bold mb-2">Account Details</h1>
      <AccDetailItems field1="Full Name" field2="John Doe" />
      <AccDetailItems field1="Mobile Number" field2="+44 843234442" />
      <AccDetailItems field1="Email Address" field2="johndoe@gmail.com" />
    </div>
  );
};

export default MyAccountComp;
