'use client';

import React, { useState } from 'react';
import { IoBag } from "react-icons/io5";
import CartItems from './CartItems/CartItems';
import { usePathname } from 'next/navigation';
import { useCart } from '@/Provider/CartProvider';


const Cart = () => {

    const { cart, loading } = useCart();
    const pathname = usePathname();
    const [showCart, setShowCart] = useState(false);

    const totalPrice = cart?.reduce((total, item) => {
        const itemPrice = item?.discountPrice;
        return total + (itemPrice * item?.quantity);
    }, 0);

    // pathnames that hide cart btn
    const hiddenPaths = ['/checkout', '/account/my-orders', '/account/profile', '/account/wishlist'];


    return (
        <>
            <div className={`${hiddenPaths?.includes(pathname) ? 'hidden' : ''}`}>
                <button onClick={() => setShowCart(true)} className="hidden md:block fixed z-20 top-1/2 right-5 transform -translate-y-1/2 shadow-lg text-[10px] md:text-xs text-primary-text border-4 border-primary-bg dark:border-secondary-bg rounded-md font-semibold">
                    <p className="px-2 py-1 bg-secondary-color flex flex-col items-center rounded-t-md">
                        <IoBag className="text-lg" />
                        {
                            loading ?
                                <span className="loading loading-dots loading-sm mx-3"></span>
                                :
                                <span>{cart?.length} Items</span>
                        }
                    </p>
                    <div className='bg-slate-500 rounded-b-md'>
                        {
                            loading ?
                                    <span className="loading loading-dots loading-sm mx-2 bg-primary-bg dark:bg-secondary-bg"></span>
                                :
                                <p className="px-2 py-1 text-white font-semibold ">৳{cart?.length == 0 ? '0' : `${totalPrice}`}</p>
                        }
                    </div>
                </button>
                <div className={`hidden md:block fixed z-40 top-[65px] duration-300 ${showCart ? 'right-0' : '-right-[500px]'} `}>
                    <CartItems setShowCart={setShowCart} />
                </div>
            </div>
        </>
    );
};

export default Cart;