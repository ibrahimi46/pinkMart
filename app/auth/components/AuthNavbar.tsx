import Image from "next/image";
import assets from "@/assets";
import Link from "next/link";

const AuthNavbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <div className="bg-white py-3 border-b-2">
        <div className="bg-orange-50 py-2 flex justify-center">
          <Link href={"/"} className="flex items-center">
            <Image src={assets.logo} width={50} height={50} alt="" />
            <h1 className="text-body-lg md:text-h6 md:font-bold text-primary-600 font-bold">
              PinkMart
            </h1>
          </Link>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default AuthNavbar;
