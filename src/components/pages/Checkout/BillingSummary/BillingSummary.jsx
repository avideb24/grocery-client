import React from 'react';
import { IoMdListBox } from 'react-icons/io';


const BillingSummary = ({checkoutLoading, subTotalmount, shippingAmount, totalAmount}) => {

    return (
        <div className='border-b border-b-slate-300 font-semibold pb-3'>
                <h2 className='font-bold mb-2 flex items-end gap-1 text-sm md:text-base'>
                    <IoMdListBox className='text-2xl md:text-3xl text-primary-color' />
                    <span>Billing Summary</span>
                </h2>
                <div className=' flex flex-col gap-y-1 font-bold px-4'>
                    <p className='flex justify-between items-center'>
                        <span>Sub-Total</span>
                        <span>৳{checkoutLoading ? '0' : subTotalmount}</span>
                    </p>
                    <p className='flex justify-between items-center'>
                        <span>Shipping</span>
                        <span>৳{checkoutLoading ? '0' : shippingAmount}</span>
                    </p>

                    {/* refer or coupon code */}
                    <div className='p-2 my-2 border border-dashed border-primary-color flex justify-between items-center gap-2 rounded-md'>
                        <p>Apply Coupon</p>
                        <input type="text" className='w-36 px-2 py-[2px] bg-transparent border border-slate-300 outline-none rounded-md' placeholder='Type code...' />
                    </div>

                    <p className='font-bold text-lg md:text-xl flex justify-between items-center border-t border-t-slate-300 pt-2'>
                        <span>Total</span>
                        <span>৳{checkoutLoading ? '0' : totalAmount}</span>
                    </p>
                </div>
            </div>
    );
};

export default BillingSummary;