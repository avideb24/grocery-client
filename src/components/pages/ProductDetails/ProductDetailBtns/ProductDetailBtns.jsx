'use client';

import React, { useState } from 'react';
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoBagAdd } from "react-icons/io5";
import { useCart } from '@/Provider/CartProvider';
import { useCheckout } from '@/Provider/CheckoutProvider';
import { useRouter } from 'next/navigation';

const ProductDetailBtns = ({ product }) => {

    const { cart, handleAddToCart, handleIncreaseQuantity, handleDecreaseQuantity } = useCart();
    const { setCheckoutProducts } = useCheckout();
    const router = useRouter();

    const isExistProduct = cart?.find(item => item?.id == product?.id);

    // added product
    const addedProduct = {
        id: product?.id,
        title: product?.title,
        thumbnailImage: product?.thumbnailImage,
        regularPrice: product?.regularPrice,
        discountPrice: product?.discountPrice,
        weight: product?.weight,
        quantity: 1,
    };

    // navigate to checkout with order data
    const handleNavigateToCheckout = () => {
        localStorage.setItem('checkoutProducts', JSON.stringify([addedProduct]));
        setCheckoutProducts([addedProduct]);
        router.push('/checkout');
    };
    

    return (
        <div className='flex gap-4 pb-3 border-b border-b-slate-300'>

            {
                isExistProduct ?
                    <div className='flex items-center'>
                        <button onClick={() => handleDecreaseQuantity(isExistProduct?.id)} className='p-2 sm:p-3 border border-primary-color rounded-l-[4px]' disabled={isExistProduct?.quantity == 1}><FaMinus /></button>
                        <p className='w-8 sm:w-14 text-center py-[6px] sm:py-[9px] border-y border-primary-color'>{isExistProduct?.quantity}</p>
                        <button onClick={() => handleIncreaseQuantity(isExistProduct?.id)} className='p-2 sm:p-3 border border-primary-color rounded-r-[4px]'><FaPlus /></button>
                    </div>
                    :
                    <button onClick={() => handleAddToCart(addedProduct)} className='px-4 sm:px-6 py-2 bg-primary-color text-secondary-text border border-primary-color hover:bg-transparent hover:text-primary-color font-semibold rounded-md duration-200 flex items-center gap-1'>
                        <IoBagAdd />
                        <span>Add To Bag</span>
                    </button>
            }

            {/* buy now */}
            <button onClick={handleNavigateToCheckout} className='bg-primary-color px-5 sm:px-6 py-2 rounded-md font-semibold text-secondary-text border-2 border-transparent hover:border-primary-color hover:bg-transparent hover:text-primary-color duration-200'>Buy Now</button>

        </div>
    );
};

export default ProductDetailBtns;