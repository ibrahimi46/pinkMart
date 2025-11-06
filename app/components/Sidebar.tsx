"use client";
import Image from "next/image";
import Button from "./Button";
import assets from "@/assets";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

interface SidebarProps {
  isOpen: boolean;
  closeSidebar: () => void;
}

const Sidebar = ({ isOpen, closeSidebar }: SidebarProps) => {
  const authContext = useContext(AuthContext);
  const { logout, user, userDetails } = authContext!;

  return (
    <div
      className={`fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="p-4 flex flex-col h-full justify-start relative">
        <Link href={"/"}>
          <div
            className="flex items-center h-10 cursor-pointer"
            onClick={closeSidebar}
          >
            <Image src={assets.logo} width={48} height={48} alt="" />
            <h1 className="text-h7 text-primary-600 font-bold mb-1">
              PinkMart
            </h1>
          </div>
        </Link>
        <div className="flex flex-col justify-between mt-8 h-full">
          <div
            className="absolute top-4 right-2 bg-black-200 p-2 rounded-full cursor-pointer border hover:border hover:border-black-600
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
          <div>
            {user ? (
              <>
                <div className="flex items-center gap-2 mb-6 relative">
                  <Image
                    src={assets.icons.account}
                    width={50}
                    height={50}
                    alt="profile"
                  />
                  <p className="font-bold">{userDetails?.fullName}</p>
                </div>
                {user.isAdmin ? (
                  <>
                    <div className="flex flex-col gap-2 text-body-md">
                      <Link href={"/account?page=analytics"}>
                        <Button
                          name="Analytics & Reports"
                          iconPosition="left"
                          icon={assets.icons.analytics}
                          extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                          handleOnClick={closeSidebar}
                        />
                      </Link>
                      <Link href={"/account?page=manage-products"}>
                        <Button
                          name="Manage Products"
                          iconPosition="left"
                          icon={assets.icons.products}
                          extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                          handleOnClick={closeSidebar}
                        />
                      </Link>
                      <Link href={"/account?page=manage-orders"}>
                        <Button
                          name="Manage Orders"
                          iconPosition="left"
                          icon={assets.icons.orders}
                          extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                          handleOnClick={closeSidebar}
                        />
                      </Link>
                      <Link href={"/account?page=manage-users"}>
                        <Button
                          name="Manage Users"
                          iconPosition="left"
                          icon={assets.icons.users}
                          extraStyles="px-3 py-1 border border-black-200 w-full border hover:border hover:border-black-600
                  transition-all duration-300"
                          handleOnClick={closeSidebar}
                        />
                      </Link>

                      <Link href={"/ai-search"}>
                        <Button
                          name="AI Image Search"
                          icon={assets.icons.ai_search_icon}
                          iconPosition="left"
                          extraStyles="px-4 py-2 border border-black-200 hover:border-primary-600 transition-all duration-300 w-full"
                          textStyles="text-body-md"
                          handleOnClick={closeSidebar}
                        />
                      </Link>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col gap-4">
                    <Link href={"/account?page=account-details"}>
                      <Button
                        name="Account Details"
                        icon={assets.icons.users}
                        handleOnClick={closeSidebar}
                        iconPosition="left"
                        extraStyles="px-4 border border-black-200 hover:border-primary-600 transition-all duration-300 w-full"
                        textStyles="text-body-md"
                      />
                    </Link>
                    <Link href={"/account?page=orders"}>
                      <Button
                        name="My Orders"
                        icon={assets.icons.orders}
                        handleOnClick={closeSidebar}
                        iconPosition="left"
                        extraStyles="px-4 border border-black-200 hover:border-primary-600 transition-all duration-300 w-full"
                        textStyles="text-body-md"
                      />
                    </Link>
                    <Link href={"/account?page=addresses"}>
                      <Button
                        name="My Addresses"
                        icon={assets.icons.location}
                        handleOnClick={closeSidebar}
                        iconPosition="left"
                        extraStyles="px-4 border border-black-200 hover:border-primary-600 transition-all duration-300 w-full"
                        textStyles="text-body-md"
                      />
                    </Link>
                    <Link href={"/ai-search"}>
                      <Button
                        name="AI Image Search"
                        icon={assets.icons.ai_search_icon}
                        iconPosition="left"
                        extraStyles="px-4 py-2 border border-black-200 hover:border-primary-600 transition-all duration-300 w-full"
                        textStyles="text-body-md"
                        handleOnClick={closeSidebar}
                      />
                    </Link>
                  </div>
                )}
              </>
            ) : (
              <>
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
                  <Link href={"/ai-search"}>
                    <Button
                      name="AI Image Search"
                      icon={assets.icons.ai_search_icon}
                      iconPosition="left"
                      extraStyles="px-4 py-2 border border-black-200 hover:border-primary-600 transition-all duration-300 w-full"
                      textStyles="text-body-md"
                      handleOnClick={closeSidebar}
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
              iconPosition="left"
              extraStyles="w-full border border-black-300 mt-4 py-4 hover:bg-black-400 transition-all duration-300"
              handleOnClick={logout}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
