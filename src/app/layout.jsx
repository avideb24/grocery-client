'use client';

import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { useState } from "react";
import PageTitle from "@/components/shared/PageTitle/PageTitle";
import MobileNavigations from "@/components/mobile/MobileNavigations/MobileNavigations";
import Cart from "@/components/shared/Cart/Cart";
import CartProvider from "@/Provider/CartProvider";
import CheckoutProvider from "@/Provider/CheckoutProvider";
import UserProvider from "@/Provider/UserProvider";


const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {

  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <html lang="en">
      <body className={`${inter.className} text-xs md:text-sm bg-primary-bg text-primary-text dark:bg-secondary-bg dark:text-secondary-text`}>

        <UserProvider>
          <CheckoutProvider>
            <CartProvider>

              <PageTitle title={''} />

              <Navbar showSidebar={showSidebar} setShowSidebar={setShowSidebar} />

              <div className="mx-2">

                {/* sidebar */}
                <div className={`hidden md:block fixed z-40 top-[65px] overflow-y-scroll duration-300 ${showSidebar ? 'left-0' : '-left-96'} sidebar`}>
                  <Sidebar />
                </div>

                {/* children & footer */}
                <div className={`transition-all duration-300 ${showSidebar ? 'md:ml-64 lg:ml-80' : 'md:ml-0'}`}>
                  <div className="min-h-screen pt-2 pb-14 md:pt-2 md:pb-5">
                    {children}
                  </div>
                  <Footer />
                </div>

                {/* cart */}
                <Cart />

              </div>

              {/* mobile navigations */}
              <MobileNavigations />

            </CartProvider>
          </CheckoutProvider>
        </UserProvider>

      </body>
    </html>
  );
};
