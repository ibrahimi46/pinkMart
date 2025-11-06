import Image from "next/image";
import assets from "@/assets";
import Button from "./Button";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import reverseGeocode from "../utils/reverseGeocode";
import CartModal from "./CartModal";
import { SearchContext } from "../context/SearchContext";
import { ProductsContext } from "../context/ProductsContext";
import { CartContext } from "../context/CartContext";

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
  const cartContext = useContext(CartContext);
  const authContext = useContext(AuthContext);
  const searchContext = useContext(SearchContext);
  const productContext = useContext(ProductsContext);
  const { isLoggedIn, userPfp } = authContext!;
  const { cartTotalItems, handleStepNext } = cartContext!;
  const { searchQuery, setSearchQuery } = searchContext!;
  const { products } = productContext!;

  const [address, setAddress] = useState<NominatimAddress | null>(null);
  const [showCartModal, setShowCartModal] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const data = await reverseGeocode(latitude, longitude);
      if (data) setAddress(data.address);
    });
  }, []);

  return (
    <>
      <div className="bg-black-100 h-32 md:h-20 mb-6 md:py-10 flex flex-col justify-center border-b-2">
        <div className=" h-24 md:h-12 flex items-start justify-between md:px-16 px-3 py-2">
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
            <div className="flex gap-1 items-center cursor-pointer">
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
            <div className="bg-primary-100 p-1 rounded-full">
              <Image
                src={assets.icons.search_purple}
                height={20}
                width={20}
                alt="search"
              />
            </div>
            <input
              type="text"
              placeholder={searchQuery || "Search by..."}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-none outline-0 focus:ring-0  w-full rounded-3xl px-2 py-1 text-body-md"
            />
          </div>

          {/** address and search bar on top of each other shows upto sm */}
          <div className="flex sm:flex md:hidden w-full max-w-96 flex-col px-4 gap-2">
            <div className="flex gap-1 w-full justify-center cursor-pointer">
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
          <div
            className=" bg-primary-500 lg:hidden p-2 rounded-full relative"
            onMouseEnter={() => setShowCartModal(true)}
            onMouseLeave={() => setShowCartModal(false)}
          >
            <Link
              href={"/cart?page=cart"}
              onClick={() => handleStepNext("cart")}
            >
              <Image
                src={assets.icons.cart}
                height={20}
                width={20}
                alt="search"
                className="filter invert"
              />
            </Link>
            <div
              className={`absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg py-2 px-4
                transition-all duration-300 ease-in-out z-50
                ${cartTotalItems > 0 ? "w-80" : "w-64"}
                ${
                  showCartModal
                    ? "opacity-100 translate-y-0 pointer-events-auto"
                    : "opacity-0 -translate-y-2 pointer-events-none"
                }`}
            >
              <CartModal products={products} />
            </div>
          </div>

          {/** cart and logo container shows lg onwards */}
          <div className="items-center hidden lg:flex md:gap-4">
            <Link href="/ai-search">
              <Button
                name="AI Image Search"
                icon={assets.icons.ai_search_icon}
                iconPosition="left"
                textStyles="text-body-sm"
                extraStyles="h-10 px-3 bg-white hover:border-black-800 border border-primary-500 transition-all duration-300"
              />
            </Link>
            {isLoggedIn ? (
              <>
                <div
                  className="relative"
                  onMouseEnter={() => setShowCartModal(true)}
                  onMouseLeave={() => setShowCartModal(false)}
                >
                  <Link
                    href={"/cart?page=cart"}
                    onClick={() => handleStepNext("cart")}
                  >
                    <div className="bg-primary-100 p-2 rounded-3xl flex gap-2 items-center">
                      <div className="bg-white rounded-3xl flex gap-1 p-1">
                        <Image
                          src={assets.icons.cart_purple}
                          height={15}
                          width={15}
                          alt="cart"
                        />
                        <p className="text-primary-600 text-body-sm">
                          {cartTotalItems}
                        </p>
                      </div>
                      <div className="text-body-md">Cart</div>
                    </div>
                  </Link>
                  <div
                    className={`absolute top-full mt-2 right-0 bg-white border border-gray-200 rounded-2xl shadow-lg py-2 px-4 
                    transition-all duration-300 ease-in-out z-50
                    ${cartTotalItems > 0 ? "w-96" : "w-72"}
                    ${
                      showCartModal
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <CartModal products={products} />
                  </div>
                </div>
                <Link
                  href="/account"
                  className="rounded-full h-10 w-10 bg-white hover:border-black-800 transition-all duration-300 overflow-hidden"
                >
                  {userPfp ? (
                    <Image
                      src={userPfp}
                      alt="pfp"
                      width={40}
                      height={40}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <Image
                      src={assets.icons.account}
                      alt="account"
                      width={20}
                      height={20}
                      className="object-contain w-full h-full p-1"
                    />
                  )}
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
