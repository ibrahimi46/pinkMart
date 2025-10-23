"use client";
import React, { useState } from "react";
import Button from "../components/Button";
import assets from "@/assets";
import Image from "next/image";
import MyAccountComp from "./components/MyAccountComp";

const MyAccount = () => {
  const [activeSection, setActiveSection] = useState<string>("account-details");

  const renderSection = () => {
    switch (activeSection) {
      case "account-details":
        return <MyAccountComp />;
    }
  };
  return (
    <main className="flex gap-6 px-8">
      {/** left sidebar */}
      <div className="hidden md:flex w-1/4 max-w-64 py-2 h-[550px] items-start justify-between flex-col">
        <div className="flex w-full flex-col items-start p-4 bg-black-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src={assets.icons.account}
              height={50}
              width={50}
              alt="pfp"
            />
            <p>John Doe</p>
          </div>
          <Button
            name="Account Details"
            iconPosition="left"
            icon={assets.icons.account}
            textStyles="text-body-md"
            handleOnClick={() => setActiveSection("account-details")}
          />
          <Button
            name="My Orders"
            iconPosition="left"
            icon={assets.icons.orders}
            textStyles="text-body-md"
            handleOnClick={() => setActiveSection("orders")}
          />
          <Button
            name="Addresses"
            iconPosition="left"
            icon={assets.icons.location}
            textStyles="text-body-md"
            handleOnClick={() => setActiveSection("addresses")}
          />
          <Button
            name="Payments"
            iconPosition="left"
            icon={assets.icons.payment}
            textStyles="text-body-md"
            handleOnClick={() => setActiveSection("payments")}
          />
          <Button
            name="Notifications"
            iconPosition="left"
            icon={assets.icons.notification}
            textStyles="text-body-md"
            handleOnClick={() => setActiveSection("notifications")}
          />
          <hr className="border-black-200 my-2 border-t-1 w-full" />
          <Button
            name="Settings"
            iconPosition="left"
            icon={assets.icons.settings}
            textStyles="text-body-md"
            handleOnClick={() => setActiveSection("settings")}
          />
          <Button
            name="Help Center"
            iconPosition="left"
            icon={assets.icons.help}
            textStyles="text-body-md"
            handleOnClick={() => setActiveSection("help")}
          />
        </div>
        <div className="w-full">
          <Button
            name="Logout"
            icon={assets.icons.logout}
            iconPosition="left"
            extraStyles="w-full h-16 border border-black-300"
          />
        </div>
      </div>

      <div className="flex-1 bg-primary-200">{renderSection()}</div>
    </main>
  );
};

export default MyAccount;
