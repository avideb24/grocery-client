'use client';

import { useState } from "react";
import Navbar from "@/components/shared/Navbar/Navbar";
import Footer from "@/components/shared/Footer/Footer";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import Cart from "@/components/shared/Cart/Cart";
import MobileNavigations from "@/components/mobile/MobileNavigations/MobileNavigations";
import CartProvider from "@/Provider/CartProvider";
import CheckoutProvider from "@/Provider/CheckoutProvider";
import UserProvider from "@/Provider/UserProvider";


const MiddleComp = ({ children }) => {
  
  const [showSidebar, setShowSidebar] = useState(true);

  return (
    <UserProvider>
      <CheckoutProvider>
        <CartProvider>

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
  );
};

export default MiddleComp;
