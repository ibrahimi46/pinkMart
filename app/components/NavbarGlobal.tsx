import Image from "next/image";
import assets from "@/assets";
import Button from "./Button";
import Link from "next/link";
import { useContext } from "react";
import { UserDataContext } from "../context/UserDataContext";

interface NavbarGlobalProps {
  toggleSidebar: () => void;
}

const NavbarGlobal = ({ toggleSidebar }: NavbarGlobalProps) => {
  const context = useContext(UserDataContext);
  const { isLoggedIn } = context!;
  return (
    <>
      <div className="bg-black-100 h-32 sm:h-20 mb-6 md:py-10 flex flex-col justify-center border-b-2">
        <div className="bg-orange-50 h-24 sm:h-12 flex items-start sm:items-center justify-between md:px-16 px-3 py-2">
          {/** */}
          <div className=" gap-6 hidden md:flex">
            <Link href={"/"}>
              <div className="flex items-center h-10 cursor-pointer">
                <Image src={assets.logo} width={48} height={48} alt="" />
                <h1 className="text-h7 text-primary-600 font-bold mb-1">
                  PinkMart
                </h1>
              </div>
            </Link>
            <div className="flex gap-1 items-center">
              <Image
                src={assets.icons.location}
                height={20}
                width={20}
                alt="location"
              />
              <p className="text-body-sm">10115 New York</p>
            </div>
          </div>

          <div
            onClick={toggleSidebar}
            className="md:hidden border border-black-400 p-2 rounded-full hover:bg-black-100 transition-all duration-300 cursor-pointer"
          >
            <Image
              src={assets.icons.hamburger_menu}
              height={20}
              width={20}
              alt="search"
            />
          </div>

          <div className="lg:w-80 xl:flex-1 sm:flex hidden w-56 sm:w-72 md:max-w-2xl items-center gap-2 rounded-3xl p-2 border-primary-500 border">
            <Image
              src={assets.icons.search}
              height={20}
              width={20}
              alt="search"
            />
            <input
              type="text"
              placeholder="Search by..."
              className="border-none outline-0 focus:ring-0 bg-orange-50 text-body-md"
            />
          </div>

          <div className="flex sm:hidden flex-col items-center gap-5">
            <div className="flex gap-1">
              <Image
                src={assets.icons.location}
                height={20}
                width={20}
                alt="location"
              />
              <p className="text-body-sm">10115 New York</p>
            </div>
            {/** search */}
            <div className="flex rounded-3xl p-2 border-primary-500 border">
              <Image
                src={assets.icons.search}
                height={20}
                width={20}
                alt="search"
              />
              <input
                type="text"
                placeholder="Search by..."
                className="border-none outline-0 focus:ring-0 bg-orange-50 text-body-md"
              />
            </div>
          </div>

          <div className=" bg-primary-500 lg:hidden p-2 rounded-full">
            <Link href={"/cart"}>
              <Image
                src={assets.icons.cart}
                height={20}
                width={20}
                alt="search"
                className="filter invert"
              />
            </Link>
          </div>

          <div className="items-center hidden lg:flex md:gap-4">
            {isLoggedIn ? (
              <>
                <Link href={"/cart"}>
                  <Button
                    name="Cart"
                    icon={assets.icons.cart}
                    iconPosition="left"
                    textStyles="text-body-md"
                    extraStyles="h-8 py-2 px-4 rounded-2xl border-primary-500 border"
                  />
                </Link>
                <Link
                  href={"/account"}
                  className="bg-black-100 p-2 rounded-full border border-primary-600"
                >
                  <Image
                    src={assets.icons.account}
                    height={20}
                    width={20}
                    alt="pfp"
                  />
                </Link>
              </>
            ) : (
              <Link href={"/auth/login"}>
                <Button
                  name="Login"
                  icon={assets.icons.double_user}
                  iconPosition="left"
                  textStyles="text-body-md"
                  extraStyles="h-8 py-2 px-4 rounded-2xl border-primary-500 border"
                />
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarGlobal;
