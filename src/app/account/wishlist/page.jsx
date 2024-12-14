'use client';

import { showAlertWithTheme } from '@/components/Theme/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { useCheckout } from '@/Provider/CheckoutProvider';
import { useUser } from '@/Provider/UserProvider';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai";


const WishlistPage = () => {

    const { userId } = useUser();
    const [loading, setLoading] = useState(false);
    const [wishlist, setWishlist] = useState(null);
    const axiosPublic = AxiosPublic();
    const { setCheckoutProducts } = useCheckout();
    const router = useRouter();


    // fetch wishlist
    useEffect(() => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        setLoading(true);

        const fetchwishlist = async () => {
            const res = await axiosPublic.get(`/api/user/wishList/user/${userId}`);
            if (res.data.success) {
                setWishlist(res.data.data);
                setLoading(false);
            }
            else {
                setLoading(false);
                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: "Something Went Wrong!",
                    showConfirmButton: false,
                    timer: 1000
                }, isDarkMode)
            };

        };

        fetchwishlist();

    }, [axiosPublic, userId]);


    // remove from wishlist fn
    const handleRemove = async (productId) => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        showAlertWithTheme({
            title: "Remove From Wishlist?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Remove"
        }, isDarkMode).then(async (result) => {
            if (result.isConfirmed) {

                const res = await axiosPublic.delete(`/api/user/wishList/remove?userId=${userId}&productId=${productId}`);

                showAlertWithTheme({
                    title: "Removed!",
                    icon: "success"
                }, isDarkMode);
            }
        }, isDarkMode)
    };


    // buy now fn
    const handleBuyNow = product => {

        const addedProduct = {
            id: product?.id,
            title: product?.title,
            thumbnailImage: product?.thumbnailImage,
            regularPrice: product?.regularPrice,
            discountPrice: product?.discountPrice,
            weight: product?.weight,
            quantity: 1,
        };

        localStorage.setItem('checkoutProducts', JSON.stringify([addedProduct]));
        setCheckoutProducts([addedProduct]);
        router.push('/checkout');
        
    };



    return (
        <>
            {
                loading ?
                    <div className='flex justify-center mt-28 md:mt-40'>
                        <span className="loading loading-bars loading-lg bg-primary-color"></span>
                    </div>
                    :
                    <>
                        <h2 className='text-base md:text-xl font-bold pb-4 md:pb-8'>Wishlisted Items</h2>
                        {
                            wishlist?.length == 0 ?
                                <div className='text-center font-bold text-red-600 mt-16 md:mt-36'>No Product Added!</div>
                                :
                                <div>
                                    {
                                        wishlist?.map(item =>
                                            <div key={item?.product?.id} className='grid grid-cols-7 items-center gap-2 border-b border-b-slate-300 py-3'>

                                                {/* image */}
                                                <Image src={item?.product?.thumbnailImage} width={30} height={30} className='w-10 md:w-14 object-contain' alt={item?.product?.title} />

                                                {/* title / price/ weight */}
                                                <div className='col-span-3'>
                                                    <h2>{item?.product?.title}</h2>
                                                    <div className='flex items-center gap-1 text-[10px] md:text-xs pt-1'>
                                                        <p className='font-bold'>৳{item?.product?.discountPrice}</p>
                                                        <p>-</p>
                                                        <p>{item?.product?.weight}</p>
                                                    </div>
                                                </div>

                                                {/* buy now btn */}
                                                <button onClick={() => handleBuyNow(item?.product)} className='col-span-2 w-20 md:w-28 bg-primary-color text-secondary-text px-3 py-1 rounded-md font-bold text-[9px] md:text-[11px]'>Buy Now</button>

                                                {/* remove btn */}
                                                <button onClick={() => handleRemove(item?.product?.id)} className='text-red-600 text-xl md:text-2xl flex justify-center' ><AiFillDelete /></button>

                                            </div>
                                        )
                                    }
                                </div>
                        }
                    </>
            }
        </>
    );
};

export default WishlistPage;