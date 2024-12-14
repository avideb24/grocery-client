'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaMinus, FaPlus, FaListCheck } from 'react-icons/fa6';
import { useCheckout } from '@/Provider/CheckoutProvider';


const CheckoutItems = () => {

    const { checkoutProducts, checkoutLoading, handleIncreaseProductQuantity, handleDecreaseProductQuantity } = useCheckout();


    return (
        <div className='py-3'>

            <h2 className='text-sm md:text-base font-bold flex items-center gap-2'>
                <FaListCheck className='text-xl md:text-2xl text-primary-color' />
                <span>Selected Items</span>
            </h2>

            {
                checkoutLoading ?
                    <div className='py-4 flex justify-center'>
                        <span className="loading loading-dots loading-lg bg-primary-color"></span>
                    </div>
                    :
                    <div className='space-y-3 py-3 px-3'>

                        {
                            checkoutProducts?.map(product =>
                                <div key={product?.id} className='grid grid-cols-7 items-center gap-2 p-2 border-b border-b-slate-300 rounded-[4px]'>

                                    {/* image */}
                                    <Link href={'/products/1'}>
                                        <Image src={product?.thumbnailImage} width={50} height={50} className='w-10 md:w-20 object-contain' alt={product?.title} />
                                    </Link>

                                    {/* title & weight */}
                                    <Link href={'/products/1'} className='col-span-3'>
                                        <h2 className='font-bold'>{product?.title}</h2>
                                        <div className='flex gap-1 items-center'>
                                            <p>৳{product?.discountPrice}</p>
                                            <p>-</p>
                                            <p className='text-xs'>{product?.weight}</p>
                                        </div>
                                    </Link>

                                    {/* quantity */}
                                    <div className='flex gap-3 col-span-2'>
                                        <button onClick={() => handleDecreaseProductQuantity(product?.id)} disabled={product?.quantity == 1}><FaMinus /></button>
                                        <p className='p-2 rounded-full border'>{product?.quantity}</p>
                                        <button onClick={() => handleIncreaseProductQuantity(product?.id)} ><FaPlus /></button>
                                    </div>

                                    {/* prices */}
                                    <p className='text-right font-bold'>৳{product?.discountPrice * product?.quantity}</p>

                                </div>
                            )
                        }

                    </div>
            }


        </div>
    );
};

export default CheckoutItems;