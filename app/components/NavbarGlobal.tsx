import Image from "next/image";
import assets from "@/assets";
import Button from "./Button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { UserDataContext } from "../context/UserDataContext";
import reverseGeocode from "../utils/reverseGeocode";

interface NavbarGlobalProps {
  toggleSidebar: () => void;
}

interface NominatimAddress {
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  city?: string;
  town?: string;
  state?: string;
  postcode?: string;
  country?: string;
  country_code?: string;
}

const NavbarGlobal = ({ toggleSidebar }: NavbarGlobalProps) => {
  const [address, setAddress] = useState<NominatimAddress | null>(null);
  const context = useContext(UserDataContext);
  const { isLoggedIn, setStep } = context!;

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await reverseGeocode(latitude, longitude);
      console.log("am in useeffect navbar global");
      console.log(data.address);
      if (data) setAddress(data.address);
      console.log(address);
    });
  }, []);

  return (
    <>
      <div className="bg-black-100 h-32 md:h-20 mb-6 md:py-10 flex flex-col justify-center border-b-2">
        <div className="bg-orange-50 h-24 md:h-12 flex items-start justify-between md:px-16 px-3 py-2">
          {/** left logo and address container shown md onwards */}
          <div className=" gap-6 hidden lg:flex">
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
              <p className="text-body-sm">
                {address
                  ? `${address?.postcode} - ${address?.state}`
                  : "Fetching..."}
              </p>
            </div>
          </div>
          {/** hamburger */}
          <div
            onClick={toggleSidebar}
            className="border lg:hidden border-black-400 p-2 rounded-full hover:bg-black-100 transition-all duration-300 cursor-pointer"
          >
            <Image
              src={assets.icons.hamburger_menu}
              height={20}
              width={20}
              alt="search"
            />
          </div>

          {/** search bar */}
          <div className="lg:w-80 xl:flex-1 md:flex hidden w-56 sm:w-72 md:max-w-2xl items-center gap-2 rounded-3xl py-1 px-3 border-primary-500 border">
            <div className="bg-primary-200 p-1 rounded-full">
              <Image
                src={assets.icons.search_purple}
                height={20}
                width={20}
                alt="search"
              />
            </div>
            <input
              type="text"
              placeholder="Search by..."
              className="border-none outline-0 focus:ring-0 bg-orange-50 w-full rounded-3xl px-2 py-1 text-body-md"
            />
          </div>

          {/** address and search bar on top of each other shows upto sm */}
          <div className="flex sm:flex md:hidden w-full max-w-96 flex-col px-4 gap-2">
            <div className="flex gap-1 w-full justify-center">
              <Image
                src={assets.icons.location}
                height={20}
                width={20}
                alt="location"
              />
              <p className="text-body-sm">
                {address
                  ? `${address?.postcode} - ${address?.state}`
                  : "Fetching..."}
              </p>
            </div>
            {/** search */}
            <div className="flex rounded-3xl py-1 px-2 border-primary-500 border w-full gap-2">
              <div className="bg-primary-200 p-2 rounded-full flex items-center justify-center">
                <Image
                  src={assets.icons.search_purple}
                  height={20}
                  width={20}
                  alt="search"
                />
              </div>
              <input
                type="text"
                placeholder="Search by..."
                className="border-none outline-0 focus:ring-0 bg-orange-50 text-body-md w-full rounded-3xl px-2 py-1"
              />
            </div>
          </div>

          {/** cart logo shows on small screens */}
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

          {/** cart and logo container shows lg onwards */}
          <div className="items-center hidden lg:flex md:gap-4">
            {isLoggedIn ? (
              <>
                <Link href={"/cart"}>
                  <Button
                    name="Cart"
                    icon={assets.icons.cart}
                    iconPosition="left"
                    textStyles="text-body-md"
                    extraStyles="h-8 py-2 px-4 rounded-2xl border-primary-500 bg-white border hover:border-black-800 transition-all duration-300"
                    handleOnClick={() => setStep("cart")}
                  />
                </Link>
                <Link
                  href={"/account"}
                  className="p-2 rounded-full border border-primary-600 bg-white hover:border-black-800 transition-all duration-300"
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
                  extraStyles="h-8 py-2 px-4 rounded-2xl border-primary-500 border bg-white hover:border-black-800 transition-all duration-300"
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
