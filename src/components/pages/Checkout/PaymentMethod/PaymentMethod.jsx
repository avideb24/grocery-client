'use client';

import React from 'react';
import CODImg from '@/assets/payment/Cash-On-Delivery-Icon.png';
import bkashImg from '@/assets/payment/Bkash-Icon.png';
import nagadImg from '@/assets/payment/Nagad-Icon.png';
import { MdOutlinePayment } from "react-icons/md";
import Image from 'next/image';


const PaymentMethod = ({ paymentMethod, setPaymentMethod }) => {

    return (
        <div className="bg-primary-bg dark:bg-secondary-bg text-primary-text dark:text-secondary-text py-4">

            <div className='text-sm md:text-base font-bold mb-2 flex items-center gap-1'>
                <MdOutlinePayment className='text-2xl md:text-3xl text-primary-color' />
                <h2>Select Payment Method</h2>
            </div>


            {/* COD */}
            <button onClick={() => setPaymentMethod('cod')} className={`flex justify-center items-center gap-1 px-3 py-1 font-bold border border-slate-300 ${paymentMethod == 'cod' ? 'bg-primary-color border-primary-color text-secondary-text' : ''} shadow-md rounded-md duration-200`}>
                <span>Cash On Delivery</span>
                <Image src={CODImg} className='w-6 object-contain' width={30} height={30} alt='Cash On Delivery - payment method' />
            </button>

            {/* -------or-------- */}
            <div className='grid grid-cols-5 items-center gap-2 my-2'>
                <p className='w-full h-[1px] bg-slate-300 dark:bg-slate-600 col-span-2'></p>
                <p className='text-center font-bold'>Or</p>
                <p className='w-full h-[1px] bg-slate-300 dark:bg-slate-600 col-span-2'></p>
            </div>

            {/* pay with */}
            <div className='flex items-center gap-2'>
                <h3 className='font-bold mr-2'>Pay With -</h3>

                {/* bkash */}
                <button onClick={() => setPaymentMethod('bkash')} className={`flex justify-center items-center gap-1 px-3 py-1 font-bold border border-slate-300 ${paymentMethod == 'bkash' ? 'bg-primary-color border-primary-color text-secondary-text' : ''} shadow-md rounded-md duration-200`}>
                    <span>Bkash</span>
                    <Image src={bkashImg} className='w-6 object-contain' width={30} height={30} alt='Cash On Delivery - payment method' />
                </button>

                {/* nagad */}
                <button onClick={() => setPaymentMethod('nagad')} className={`flex justify-center items-center gap-1 px-3 py-1 font-bold border border-slate-300 ${paymentMethod == 'nagad' ? 'bg-primary-color border-primary-color text-secondary-text' : ''} shadow-md rounded-md duration-200`}>
                    <span>Nagad</span>
                    <Image src={nagadImg} className='w-6 object-contain' width={30} height={30} alt='Cash On Delivery - payment method' />
                </button>

            </div>

        </div>
    );
};

export default PaymentMethod;