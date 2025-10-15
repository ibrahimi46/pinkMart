import Image from "next/image";
import assets from "@/assets";
import Button from "./Button";

const NavbarGlobal = () => {
  return (
    <>
      <div className="bg-black-100 h-20 flex flex-col justify-center border-b-2">
        <div className="bg-orange-50 h-12 flex items-center justify-between px-16 py-2">
          <div className="flex gap-6">
            <div className="flex items-center h-10 cursor-pointer">
              <Image src={assets.logo} width={48} height={48} alt="" />
              <h1 className="text-h7 text-primary-600 font-bold mb-1">
                PinkMart
              </h1>
            </div>
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

          <div className="flex-1 flex max-w-xl items-center gap-2 rounded-3xl p-2 border-primary-500 border">
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

          <div className="flex gap-4 items-center">
            <Button
              name="Cart"
              icon={assets.icons.cart}
              iconPosition="left"
              textStyles="text-body-md"
              extraStyles="h-8 py-2 px-4 rounded-2xl border-primary-500 border"
              href=""
            />

            <Button
              name="Login"
              icon={assets.icons.double_user}
              iconPosition="left"
              textStyles="text-body-md"
              extraStyles="h-8 py-2 px-4 rounded-2xl border-primary-500 border"
              href="/auth/login"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default NavbarGlobal;
