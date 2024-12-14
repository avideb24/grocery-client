import React from 'react';
import { FaCircleXmark } from "react-icons/fa6";
import { FaBox } from "react-icons/fa";
import Link from 'next/link';
import Image from 'next/image';


const OrderDetails = ({ modalId, order }) => {

    // local time and date
    const bdLocalDateTime = new Intl.DateTimeFormat('en-GB', { timeZone: 'Asia/Dhaka', day: '2-digit', month: '2-digit', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true }).format(new Date(order?.createdAt));


    return (
        <dialog id={`my_modal_${modalId}`} className="modal">
            <div className="modal-box bg-primary-bg dark:bg-secondary-bg">
                <form method="dialog">
                    {/* close btn */}
                    <button className="text-red-600 text-xl md:text-2xl absolute right-4 top-4"><FaCircleXmark /></button>
                </form>

                {/* order details */}
                <div className='pb-4 text-xs md:text-sm'>

                    <h2 className='text-base md:text-xl font-bold uppercase border-b border-b-slate-300 pb-2 mb-3'>Order Details</h2>

                    <div className='border-2 border-slate-300 rounded-lg p-3'>

                        {/* id / time & dates / status */}
                        <div className='flex flex-col justify-between items-center gap-2 border-b-2 border-b-slate-300 pb-3 mb-3'>
                            <FaBox className='text-4xl' />
                            <div className='space-y-1'>
                                {/* order id */}
                                <p>Order ID: <span className='font-bold'>{`#${order?.id}`}</span></p>
                                {/* placed date */}
                                <p>Issued: <span className='font-semibold'>{bdLocalDateTime}</span></p>
                                {/* delivery date */}
                                <p>Delivery: <span className='font-semibold'>{order?.deliveryDate?.slice(0, 10).split('-').reverse()?.join('/')}</span></p>
                                {/* status with conditional color */}
                                <p>Status: <span className={`font-semibold capitalize ${order?.orderStatus == 'pending' ? 'text-blue-600' :
                                    order?.orderStatus == 'processing' ? 'text-yellow-600' :
                                        order?.orderStatus == 'delivered' ? 'text-green-600' :
                                            order?.orderStatus == 'canceled' ? 'text-red-600' :
                                                'text-gray-600'
                                    }`}>
                                    {order?.orderStatus}
                                </span></p>
                                <p className='w-full h-[1px] bg-slate-300'></p>
                                {/* payment method */}
                                <p>Payment Method: <span className='font-semibold uppercase'>{order?.paymentMethod}</span></p>
                                {/* total amount */}
                                <p>Total Amount: <span className='font-semibold'>৳{order?.totalAmount}</span></p>
                                {/* delivery address */}
                                <p>Delivery Address: <span className='font-semibold'>{order?.deliveryAddress}</span></p>
                            </div>
                        </div>

                        {/* ordered products */}
                        <div>
                            <h2 className='pb-2 font-bold text-left'>Ordered Products</h2>
                            <div className='grid grid-cols-2 gap-2'>
                                {
                                    order?.orderItems?.map(item =>
                                        <Link key={item?.id} href={`/products/${item?.product?.title?.toLowerCase().replace(/ /g, '-')}`} className='flex items-center gap-1 border border-slate-200 rounded-md p-2 shadow-md'>
                                            <Image src={item?.product?.thumbnailImage} width={30} height={30} className='w-8 h-8 rounded-md' alt={item?.product?.title} />
                                            <div>
                                                <h2>{item?.product?.title?.length > 15 ? `${item?.product?.title?.slice(0, 15)}...` : `${item?.product?.title}`}</h2>
                                                <p className='flex justify-start gap-1 text-[10px]'>
                                                    <span>৳{item?.price}</span>
                                                    <span>-</span>
                                                    <span>Qty({item?.quantity})</span>
                                                </p>
                                            </div>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>

                    </div>

                </div>

            </div>
        </dialog>
    );
};

export default OrderDetails;