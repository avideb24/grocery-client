'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { FaUser, FaThList } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import { RiLoginCircleLine, RiLogoutCircleFill } from "react-icons/ri";
import { MdChecklist } from "react-icons/md";
import { useUser } from '@/Provider/UserProvider';
import Button from '@/components/shared/Buttons/Button/Button';
import { showAlertWithTheme } from '@/components/Theme/AlertTheme';


const AccountPage = () => {

    const { setUserId, user, setUser, userLoading } = useUser();
    const router = useRouter();


    const handleLogout = () => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        setUser(null);
        setUserId(null);
        localStorage.setItem('userId', null);
        router.push('/');

        showAlertWithTheme({
            position: "top-end",
            icon: "success",
            title: "Logout Successful!",
            showConfirmButton: false,
            timer: 1500
        }, isDarkMode);
    };

    return (
        <>
            {
                userLoading ?
                    <div className='flex justify-center mt-28 md:mt-40'>
                        <span className="loading loading-bars loading-lg bg-primary-color"></span>
                    </div>
                    :
                    <>
                        {
                            !user ?
                                <div className='flex flex-col items-center gap-5 mt-20'>
                                    <h2 className='text-base font-bold'>Please Signup / Login First!</h2>
                                    {/* login / register popup btn */}
                                    <Button btnText={'Login'} icon={RiLoginCircleLine} handleClick={() => document.getElementById('my_modal_1').showModal()} />
                                </div>
                                :
                                <div className='space-y-3 mx-2'>

                                    <Link href={'/account/profile'} className='w-full flex justify-between items-center gap-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 p-2 shadow-sm border border-slate-100 rounded-[4px]'>
                                        <p className='flex items-center gap-2'>
                                            <FaUser className='text-base' />
                                            <span>Profile</span>
                                        </p>
                                        <IoIosArrowForward />
                                    </Link>

                                    <Link href={'/account/my-orders'} className={`w-full flex justify-between items-center gap-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 p-2 shadow-sm border border-slate-100 rounded-[4px]`}>
                                        <p className='flex items-center gap-2'>
                                            <FaThList className='text-base' />
                                            <span>My Orders</span>
                                        </p>
                                        <IoIosArrowForward />
                                    </Link>

                                    {/* <Link href={'/account/wishlist'} className={`w-full flex justify-between items-center gap-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 p-2 shadow-sm border border-slate-100 rounded-[4px]`}>
                                        <p className='flex items-center gap-2'>
                                            <MdChecklist className='text-base' />
                                            <span>Wishlist</span>
                                        </p>
                                        <IoIosArrowForward />
                                    </Link> */}

                                    <button onClick={handleLogout} className='w-full flex justify-between items-center gap-3 font-semibold hover:bg-slate-200 dark:hover:bg-slate-600 p-2 shadow-sm border border-slate-100 rounded-[4px]'>
                                        <p className='flex items-center gap-2'>
                                            <RiLogoutCircleFill className='text-base' />
                                            <span>Logout</span>
                                        </p>
                                    </button>

                                </div>
                        }
                    </>
            }
        </>
    );
};

export default AccountPage;