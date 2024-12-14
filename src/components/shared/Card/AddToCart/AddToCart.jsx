'use client';

import React, { useState } from 'react';
import { FaPlus, FaMinus } from "react-icons/fa6";
import { IoBagAdd } from "react-icons/io5";
import Button from '../../Buttons/Button/Button';
import { useCart } from '@/Provider/CartProvider';


const AddToCart = ({ product }) => {

    const { cart, handleAddToCart, handleIncreaseQuantity, handleDecreaseQuantity } = useCart();

    const isExistProduct = cart?.find(item => item?.id == product?.id);

    // product for pass cart array
    const addedProduct = {
        id: product?.id,
        title: product?.title,
        thumbnailImage: product?.thumbnailImage,
        regularPrice: product?.regularPrice,
        discountPrice: product?.discountPrice,
        weight: product?.weight,
        quantity: 1,
    };

    // add to product fn
    const handleAddProduct = () => {
        handleAddToCart(addedProduct);
    };
    

    return (
        <>
            {
                isExistProduct ?
                    <div className='flex justify-center items-center pt-[2px]'>
                        <button onClick={() => handleDecreaseQuantity(isExistProduct?.id)} className='px-2 py-[5px] bg-primary-color text-secondary-text border border-primary-color rounded-l-full' disabled={isExistProduct?.quantity == 1}><FaMinus /></button>
                        <p className='w-8 text-center py-[2px] border-y border-primary-color'>{isExistProduct?.quantity}</p>
                        <button onClick={() => handleIncreaseQuantity(isExistProduct?.id)} className='px-2 py-[5px] bg-primary-color text-secondary-text border border-primary-color rounded-r-full'><FaPlus /></button>
                    </div>
                    :
                    <div className='flex justify-center'>
                        <Button btnText={'Add To Bag'} icon={IoBagAdd} handleClick={handleAddProduct} />
                    </div>
            }
        </>
    );
};

export default AddToCart;