'use client';

import { useState } from "react";
import Cart from "@/components/shared/Cart/CartItems/CartItems";
import Footer from "@/components/shared/Footer/Footer";
import Sidebar from "@/components/shared/Sidebar/Sidebar";
import { HiMiniShoppingCart } from "react-icons/hi2";


const MiddleComp = ({ children }) => {

  const [showSidebar, setShowSidebar] = useState(true);
  const [showCart, setShowCart] = useState(false);

  console.log(children);
  

  return (
    <div className="mx-2">
      {/* sidebar */}
      <div
        className={`hidden md:block fixed z-50 top-[65px] bg-red-200 duration-300 ${
          showSidebar ? "left-0" : "-left-96"
        }`}
      >
        <Sidebar />
      </div>

      {/* children & footer */}
      <div
        className={`transition-all duration-300 ${
          showSidebar ? "md:ml-64 lg:ml-80" : "md:ml-0"
        }`}
      >
        <div className="min-h-screen py-2 md:py-5">{children}</div>
        <Footer />
      </div>

      {/* cart */}
      <button
        onClick={() => setShowCart(true)}
        className="hidden md:block fixed z-20 top-1/2 right-5 transform -translate-y-1/2 shadow-lg text-[10px] md:text-xs text-primary-text"
      >
        <p className="px-2 py-1 bg-secondary-color flex flex-col items-center rounded-t-md">
          <HiMiniShoppingCart className="text-lg" />
          <span>6 Items</span>
        </p>
        <p className="px-2 py-1 bg-slate-500 text-white font-semibold rounded-b-md">
          ৳1000
        </p>
      </button>
      <div
        className={`hidden md:block fixed z-40 top-[65px] duration-300 ${
          showCart ? "right-0" : "-right-[500px]"
        }`}
      >
        <Cart setShowCart={setShowCart} />
      </div>
    </div>
  );
};

export default MiddleComp;
