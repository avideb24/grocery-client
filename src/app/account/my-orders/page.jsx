'use client';

import OrderDetails from '@/components/pages/Account/OrderDetails/OrderDetails';
import Button from '@/components/shared/Buttons/Button/Button';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { showAlertWithTheme } from '@/components/Theme/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { useUser } from '@/Provider/UserProvider';
import React, { useEffect, useState } from 'react';
import { FaArrowRight } from "react-icons/fa";


const MyOrdersPage = () => {

    const [active, setActive] = useState('all');
    const [allOrders, setAllOrders] = useState([]);
    const [displayOrders, setDisplayOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { userId } = useUser();
    const axiosPublic = AxiosPublic();


    useEffect(() => {
        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const fetchOrders = async () => {
            setLoading(true);
            try {
                const res = await axiosPublic.get(`/api/user/order/${userId}`);
                if (res.data.success) {
                    const resData = res.data.data;
                    setAllOrders(resData);
                } else {
                    showAlertWithTheme({
                        title: "Something Went Wrong!",
                        icon: "question"
                    }, isDarkMode);
                }
            } catch (error) {
                showAlertWithTheme({
                    title: "Failed to Fetch Orders",
                    icon: "error"
                }, isDarkMode);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchOrders();
        }
    }, [userId, axiosPublic]);

    useEffect(() => {
        if (allOrders?.length > 0) {
            if (active === 'all') {
                setDisplayOrders(allOrders);
            } else {
                const filteredOrders = allOrders.filter(order => order?.status === active);
                setDisplayOrders(filteredOrders);
            }
        }
    }, [active, allOrders]);
    

    return (
        <>
            <PageTitle title={'My Orders'} />
            <h2 className='text-base md:text-xl font-bold'>My Orders</h2>
            <div className='mt-5 md:mt-8'>
                {/* btns */}
                <div className='grid grid-cols-4 border-b border-b-slate-3000'>
                    <button onClick={() => setActive('all')} className={`pb-2 border-b-[6px] ${active == 'all' ? ' border-b-primary-color font-bold' : 'border-b-transparent'} duration-150`}>All</button>
                    <button onClick={() => setActive('processing')} className={`pb-2 border-b-[6px] ${active == 'processing' ? ' border-b-primary-color font-bold' : 'border-b-transparent'} duration-150`}>Processing</button>
                    <button onClick={() => setActive('delivered')} className={`pb-2 border-b-[6px] ${active == 'delivered' ? ' border-b-primary-color font-bold' : 'border-b-transparent'} duration-150`}>Delivered</button>
                    <button onClick={() => setActive('canceled')} className={`pb-2 border-b-[6px] ${active == 'canceled' ? ' border-b-primary-color font-bold' : 'border-b-transparent'} duration-150`}>Canceled</button>
                </div>

                {/* order data */}
                <div className='py-5 overflow-x-auto'>
                    {
                        loading ? (
                            <div className='flex justify-center pt-28 md:pt-32'>
                                <span className="loading loading-bars loading-lg bg-primary-color"></span>
                            </div>
                        ) : (
                            displayOrders?.length === 0 ?
                                <div className='text-center py-4 font-semibold text-red-600'>No orders found!</div>
                                :
                                <table className='w-full text-center border-collapse'>
                                    <thead>
                                        <tr>
                                            <th className='px-1 py-2 border border-slate-300'>Order Id</th>
                                            <th className='px-1 py-2 border border-slate-300'>Delivery Date</th>
                                            <th className='px-1 py-2 border border-slate-300'>Status</th>
                                            <th className='px-1 py-2 border border-slate-300'>Details</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            displayOrders?.map(order =>
                                                <tr key={order?.id}>
                                                    <td className='px-1 py-2 border border-slate-300'>{order?.id}</td>
                                                    <td className='px-1 py-2 border border-slate-300'>{order?.deliveryDate?.slice(0, 10)?.split('-')?.reverse()?.join('-')}</td>
                                                    <td className={`${order?.orderStatus === 'pending' ? 'text-blue-600' : ''} ${order?.orderStatus === 'delivered' ? 'text-green-600' : ''} ${order?.orderStatus === 'canceled' ? 'text-red-600' : ''} px-1 py-2 capitalize border border-slate-300 font-semibold`}>
                                                        <p>{order?.orderStatus}</p>
                                                    </td>
                                                    <td className='px-1 py-2 border border-slate-300 flex justify-center'>
                                                        <Button btnText={'Details'} icon={FaArrowRight} handleClick={()=>document.getElementById(`my_modal_${order?.id}`).showModal()} />
                                                        {/* detail modal */}
                                                        <OrderDetails modalId={order?.id} order={order} />
                                                    </td>
                                                </tr>
                                            )
                                        }
                                    </tbody>
                                </table>
                        )
                    }
                </div>
            </div>
        </>
    );
};

export default MyOrdersPage;
