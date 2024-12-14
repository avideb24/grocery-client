'use client';

import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaCircleXmark } from "react-icons/fa6";
import 'react-calendar/dist/Calendar.css';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { useUser } from '@/Provider/UserProvider';
import { showAlertWithTheme } from '@/components/Theme/AlertTheme';


const AddToWishlist = ({ productId }) => {

    const [showError, setShowError] = useState(false);
    const { userId } = useUser();
    const axiosPublic = AxiosPublic();
    const [isExist, setIsExist] = useState(false);
    const [value, onChange] = useState('');


    useEffect(() => {

        const isExistInWishlist = async () => {
            const res = await axiosPublic.get(`/api/user/wishList/user/${userId}`);
            if (res?.data?.data?.length > 0) {

                const findProduct = res.data.data.find(item => item?.product?.id == productId);

                if (findProduct) {
                    setIsExist(true);
                }
                else {
                    setIsExist(false);
                }
            }
            else {
                setIsExist(false);
            }
        };

        if (userId) {
            isExistInWishlist();
        }

    }, [axiosPublic, userId, productId]);


    // add to wishlist fn
    const handleAddToWithList = async (e) => {

        e.preventDefault();

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        if (value) {

            const localDate = new Date(value.getTime() - (value.getTimezoneOffset() * 60000));
            const isoDate = localDate.toISOString();

            const wishlistItem = {
                userId: userId,
                productId: productId,
                date: isoDate
            };

            const res = await axiosPublic.post(`/api/user/wishList/createOrUpdate`, wishlistItem);

            if (res.data.success) {

                setIsExist(true);

                // close login modal
                document.getElementById(`my_modal_${productId}`).close();

                showAlertWithTheme({
                    position: "top-end",
                    icon: "success",
                    title: "Added Successfully!",
                    showConfirmButton: false,
                    timer: 1000
                }, isDarkMode);
            }
            else {
                // close login modal
                document.getElementById(`my_modal_${productId}`).close();

                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: "Something Went Wrong!",
                    showConfirmButton: false,
                    timer: 1000
                }, isDarkMode);
            }

            setShowError(false);
        }
        else {
            setShowError(true);
        };
    };


    return (
        <div className='absolute right-2 top-2 text-sm md:text-lg w-6 h-6 rounded-full pt-[1px] text-center bg-primary-bg dark:bg-secondary-bg'>
            {
                isExist ?
                    <p><FaHeart /></p>
                    :
                    <>
                        {/* modal btn */}
                        <button onClick={() => document.getElementById(`my_modal_${productId}`).showModal()}>
                            <IoMdHeartEmpty />
                        </button>

                        {/* modal body */}
                        <dialog id={`my_modal_${productId}`} className="modal">
                            <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-xs md:text-sm">

                                {/* modal close btn */}
                                <form method="dialog">
                                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-red-600 text-xl md:text-2xl"><FaCircleXmark /></button>
                                </form>

                                {/* modal body */}
                                <form onSubmit={handleAddToWithList}>
                                    <label htmlFor="date" className='block font-bold uppercase'>please select a buying date</label>

                                    <p className={`${showError ? '' : 'hidden'} text-center py-2 text-[9px] md:text-xs text-red-600`}>Please select a date</p>

                                    <div className='my-5 flex justify-center'>
                                        <Calendar onChange={onChange} value={value} minDate={new Date()} maxDate={new Date(new Date().setDate(new Date().getDate() + 30))} />
                                    </div>

                                    <button type='submit' className='w-full text-secondary-text font-bold bg-primary-color py-2 rounded-md flex justify-center items-center gap-1'>
                                        <FaHeart className='mt-[2px]' />
                                        <span>Add To Wishlist</span>
                                    </button>
                                </form>

                            </div>
                        </dialog>
                    </>
            }
        </div>
    );
};

export default AddToWishlist;