"use client";
import Image from "next/image";
import Button from "./Button";
import assets from "@/assets";
import { useUser } from "@/app/utils/useUser";
import Link from "next/link";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const { user, logout } = useUser();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex flex-col h-full justify-between relative">
        <div
          className="absolute top-4 right-2 bg-black-200 p-2 rounded-full cursor-pointer border hover:border hover:border-black-600
                  transition-all duration-300
                  "
          onClick={closeSidebar}
        >
          <Image src={assets.icons.close} height={10} width={10} alt="close" />
        </div>
        <div>
          {user ? (
            <>
              <div className="flex items-center gap-2 mb-6 mt-12 relative">
                <Image
                  src={assets.icons.account}
                  width={50}
                  height={50}
                  alt="profile"
                />
                <p className="font-bold">{user.full_name}</p>
              </div>
              {user.isAdmin ? (
                <>
                  <div className="flex flex-col gap-2">
                    <Link href={"/auth/login"}>
                      <Button
                        name="Admin Dashboard"
                        iconPosition="left"
                        icon={assets.icons.dashboard}
                        extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                        handleOnClick={() => {}}
                      />
                    </Link>
                    <Link href={"/auth/login"}>
                      <Button
                        name="Manage Products"
                        iconPosition="left"
                        icon={assets.icons.products}
                        extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                        handleOnClick={() => {}}
                      />
                    </Link>
                    <Link href={"/auth/login"}>
                      <Button
                        name="Manage Orders"
                        iconPosition="left"
                        icon={assets.icons.orders}
                        extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                        handleOnClick={() => {}}
                      />
                    </Link>
                    <Link href={"/auth/login"}>
                      <Button
                        name="Manage Users"
                        iconPosition="left"
                        icon={assets.icons.orders}
                        extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                        handleOnClick={() => {}}
                      />
                    </Link>
                    <Link href={"/auth/login"}>
                      <Button
                        name="Analytics & Reports"
                        iconPosition="left"
                        icon={assets.icons.analytics}
                        extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                        handleOnClick={() => {}}
                      />
                    </Link>
                  </div>
                </>
              ) : (
                <>
                  <Button
                    name="Account Details"
                    icon={assets.icons.account}
                    handleOnClick={() => {}}
                  />
                  <Button
                    name="My Orders"
                    icon={assets.icons.orders}
                    handleOnClick={() => {}}
                  />
                  <Button
                    name="Addresses"
                    icon={assets.icons.location}
                    handleOnClick={() => {}}
                  />
                  <Button
                    name="Payments"
                    icon={assets.icons.payment}
                    handleOnClick={() => {}}
                  />
                </>
              )}
            </>
          ) : (
            <>
              <div className="mb-6 flex items-center gap-2 relative">
                <div
                  className="absolute top-0 right-0 bg-black-200 p-2 rounded-full cursor-pointer border hover:border hover:border-black-600
                  transition-all duration-300
                  "
                  onClick={closeSidebar}
                >
                  <Image
                    src={assets.icons.close}
                    height={10}
                    width={10}
                    alt="close"
                  />
                </div>
                <Image src={assets.logo} width={60} height={60} alt="Logo" />
                <p className="text-primary-600 font-bold text-body-2xl">
                  PinkMart
                </p>
              </div>
              <div className="flex flex-col gap-2 text-body-md font-regular">
                <Link href={"/auth/login"}>
                  <Button
                    name="Login"
                    iconPosition="left"
                    icon={assets.icons.double_user}
                    extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                    handleOnClick={() => {}}
                  />
                </Link>
                <Link href={"/auth/sign-up"}>
                  <Button
                    name="Sign Up"
                    iconPosition="left"
                    icon={assets.icons.signup}
                    extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                    handleOnClick={() => {}}
                  />
                </Link>
              </div>
            </>
          )}
        </div>

        {user && (
          <Button
            name="Logout"
            icon={assets.icons.logout}
            extraStyles="w-full border mt-4"
            handleOnClick={logout}
          />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
