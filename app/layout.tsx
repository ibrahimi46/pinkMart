"use client";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavbarGlobal from "./components/NavbarGlobal";
import { usePathname } from "next/navigation";
import Footer from "./components/Footer";
import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { AuthProvider } from "./context/AuthContext";
import Providers from "./providers";
import { SearchProvider } from "./context/SearchContext";
import { ProductProvider } from "./context/ProductsContext";
import { AdminProvider } from "./context/AdminContext";
import { CartContextProvider } from "./context/CartContext";
import { UserAccountContextProvider } from "./context/UserAccountContext";
import { Analytics } from "@vercel/analytics/next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const metadata: Metadata = {
  title: "Pink Mart",
  description: "Just another grocery store!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathName = usePathname();
  const isAuthPage = pathName.startsWith("/auth");
  const isAccountPage = pathName.startsWith("/account");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased h-screen w-screen bg-black-50`}
      >
        <Providers>
          <AuthProvider>
            <CartContextProvider>
              <UserAccountContextProvider>
                <SearchProvider>
                  <ProductProvider>
                    <AdminProvider>
                      {!isAuthPage && (
                        <>
                          <NavbarGlobal
                            toggleSidebar={() =>
                              setIsSidebarOpen(!isSidebarOpen)
                            }
                          />
                          <Sidebar
                            isOpen={isSidebarOpen}
                            closeSidebar={() => setIsSidebarOpen(false)}
                          />
                        </>
                      )}
                      <main>{children}</main>
                      {!isAccountPage && <Footer />}
                    </AdminProvider>
                  </ProductProvider>
                </SearchProvider>
              </UserAccountContextProvider>
            </CartContextProvider>
          </AuthProvider>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
