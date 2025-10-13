import Image from "next/image";
import assets from "@/assets";

const AuthNavbar = () => {
  return (
    <div className="bg-white py-3 border-b-2">
      <div className="bg-orange-50 py-2 flex justify-center">
        <div className="flex items-center">
          <Image src={assets.logo} width={50} height={50} alt="" />
          <h1 className="text-body-lg md:text-h6 md:font-bold text-primary-600 font-bold">
            PinkMart
          </h1>
        </div>
      </div>
    </div>
  );
};

export default AuthNavbar;
