"use client";
import React, { useContext, useEffect, useState, Suspense } from "react";
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
import { useSearchParams } from "next/navigation";
import Loading from "../components/Loading";
import HelpCenter from "./components/HelpCenter";

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

function MyAccountContent() {
  const [activeSection, setActiveSection] = useState<string>("");
  const context = useContext(UserDataContext);
  const { logout, userDetails, user, userPfp } = context!;
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("page");
    if (section) {
      setActiveSection(section);
    } else if (user?.isAdmin) {
      setActiveSection("admin-dashboard");
    } else if (!user?.isAdmin) {
      if (section === "addresses") setActiveSection("addresses");
      else if (section === "payments") setActiveSection("payments");
    }
  }, [user, searchParams]);

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
      case "help-center":
        return <HelpCenter />;
    }
  };
  return (
    <main className="flex gap-6 px-8 overflow-hidden min-h-[calc(100vh-120px)] w-screen">
      {/** left sidebar */}
      <div className="hidden md:flex w-1/4 max-w-64 py-2 h-[480px] items-start justify-between flex-col">
        <div className="flex w-full flex-col items-start p-4 bg-black-100 border border-black-300 rounded-2xl">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-10 w-10 rounded-full overflow-hidden flex items-center justify-center">
              {userPfp ? (
                <Image
                  src={userPfp}
                  alt="pfp"
                  className="w-full h-full object-cover"
                  width={40}
                  height={40}
                />
              ) : (
                <Image
                  src={assets.icons.account}
                  alt="account"
                  className="w-10 h-10 object-contain"
                  width={24}
                  height={24}
                />
              )}
            </div>
            <p>{userDetails?.fullName}</p>
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
            name="Help Center"
            iconPosition="left"
            icon={assets.icons.help}
            textStyles="text-body-md"
            handleOnClick={() => setActiveSection("help-center")}
          />
        </div>
        <div className="w-full">
          <Button
            name="Logout"
            icon={assets.icons.logout}
            iconPosition="left"
            extraStyles="w-full h-12 border border-black-300 bg-white hover:bg-black-400 transition-all duration-300 rounded-3xl"
            handleOnClick={logout}
          />
        </div>
      </div>

      {/**right area */}
      <div className="flex-1 min-w-0">{renderSection()}</div>
    </main>
  );
}

export default function MyAccount() {
  return (
    <Suspense fallback={<Loading />}>
      <MyAccountContent />
    </Suspense>
  );
}
