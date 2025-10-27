"use client";
import React, { useContext, useEffect, useState } from "react";
import Button from "../components/Button";
import assets from "@/assets";
import Image from "next/image";
import MyAccountComp from "./components/MyAccountComp";
import OrdersComp from "./components/OrdersComp";
import Payments from "./components/Payments";
import MyAddresses from "./components/MyAddresses";
import AdminDashboard from "./(admin)/AdminDashboard";
import ManageProducts from "./(admin)/ManageProducts";
import ManageOrders from "./(admin)/ManageOrders";
import ManageUsers from "./(admin)/ManageUsers";
import Analytics from "./(admin)/Analytics";
import { UserDataContext } from "../context/UserDataContext";

const userMenu = [
  {
    name: "Account Details",
    icon: assets.icons.account,
    key: "account-details",
  },
  { name: "My Orders", icon: assets.icons.orders, key: "orders" },
  { name: "Addresses", icon: assets.icons.location, key: "addresses" },
  { name: "Payments", icon: assets.icons.payment, key: "payments" },
];

const adminMenu = [
  {
    name: "Admin Dashboard",
    icon: assets.icons.dashboard,
    key: "admin-dashboard",
  },
  {
    name: "Manage Products",
    icon: assets.icons.products,
    key: "manage-products",
  },
  { name: "Manage Orders", icon: assets.icons.orders, key: "manage-orders" },
  { name: "Manage Users", icon: assets.icons.users, key: "manage-users" },
  {
    name: "Analytics & Reports",
    icon: assets.icons.analytics,
    key: "analytics",
  },
];

const MyAccount = () => {
  const [activeSection, setActiveSection] = useState<string>("");
  const context = useContext(UserDataContext);
  const { logout, user } = context!;

  useEffect(() => {
    if (user) {
      setActiveSection(user.isAdmin ? "admin-dashboard" : "account-details");
    }
  }, [user]);

  const renderSection = () => {
    switch (activeSection) {
      case "account-details":
        return <MyAccountComp />;
      case "orders":
        return <OrdersComp />;
      case "payments":
        return <Payments />;
      case "addresses":
        return <MyAddresses />;
      case "admin-dashboard":
        return <AdminDashboard />;
      case "manage-products":
        return <ManageProducts />;
      case "manage-orders":
        return <ManageOrders />;
      case "manage-users":
        return <ManageUsers />;
      case "analytics":
        return <Analytics />;
    }
  };
  return (
    <main className="flex gap-6 px-8 h-[calc(100vh-140px)] overflow-hidden w-screen">
      {/** left sidebar */}
      <div className="hidden md:flex w-1/4 max-w-64 py-2 h-full items-start justify-between flex-col">
        <div className="flex w-full flex-col items-start p-4 bg-black-100 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <Image
              src={assets.icons.account}
              height={50}
              width={50}
              alt="pfp"
            />
            <p>{user?.full_name}</p>
          </div>
          {!user?.isAdmin
            ? userMenu.map((user) => (
                <div key={user.key}>
                  <Button
                    key={user.key}
                    name={user.name}
                    iconPosition="left"
                    icon={user.icon}
                    textStyles="text-body-md"
                    handleOnClick={() => setActiveSection(user.key)}
                  />
                </div>
              ))
            : adminMenu.map((item) => (
                <div key={item.key}>
                  <Button
                    name={item.name}
                    iconPosition="left"
                    icon={item.icon}
                    textStyles="text-body-md"
                    handleOnClick={() => setActiveSection(item.key)}
                  />
                </div>
              ))}

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
            handleOnClick={logout}
          />
        </div>
      </div>

      {/**right area */}
      <div className="flex-1 min-w-0">{renderSection()}</div>
    </main>
  );
};

export default MyAccount;
