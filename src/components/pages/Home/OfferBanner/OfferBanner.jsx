'use client';

import OfferBannersSkeleton from '@/components/skeletons/OfferBannersSkeleton/OfferBannersSkeleton';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

const OfferBanner = () => {

    const axiosPublic = AxiosPublic();
    const [offerBanners, setOfferBanners] = useState([]);
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    // fetch data
    useEffect(() => {
        setLoading(true);
        const fetchOfferBanners = async () => {
            const res = await axiosPublic.get('/api/user/offer/all');
            if (res.data.success) {
                setOfferBanners(res.data.data);
                setLoading(false);
            }
        };
        fetchOfferBanners();
    }, [setLoading, axiosPublic])


    // ref to scrollable container
    const scrollContainerRef = useRef(null);

    // scroll left function
    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: -window.innerWidth / 2, // Scroll by 50% of the viewport width
                behavior: 'smooth'
            });
        }
    };

    // scroll right function
    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({
                left: window.innerWidth / 2, // Scroll by 50% of the viewport width
                behavior: 'smooth'
            });
        }
    };


    // navigate
    const handleNavigate = (title) => {
        router.push(`/offers/${title?.toLowerCase()?.replace(/\s+/g, '-')}`)
    };


    return (
        <>
            {
                loading ?
                    <OfferBannersSkeleton />
                    :
                    <div className="hidden md:block relative mb-3 overflow-hidden">
                        <div ref={scrollContainerRef} className="flex overflow-x-hidden" >
                            {/* banners with scroll */}
                            <div className="flex gap-[2px] flex-nowrap">
                                {
                                    offerBanners?.map(offer =>
                                        <button onClick={() => handleNavigate(offer?.title)} className='flex-shrink-0 w-[50%]' key={offer?.id} disabled={offer?._count?.offerItems == 0} >
                                            <Image src={offer?.banner} className='w-full h-auto object-contain' width={500} height={500} alt={offer?.title} />
                                        </button>
                                    )
                                }
                            </div>
                        </div>

                        {/* prev btn */}
                        <button onClick={scrollLeft} className={`${offerBanners?.length > 2 ? '' : 'hidden'} bg-primary-bg dark:bg-secondary-bg absolute top-1/2 left-0 transform -translate-y-1/2 text-xl md:text-3xl rounded-full z-10`} >
                            <IoIosArrowDropleftCircle />
                        </button>

                        {/* next btn */}
                        <button onClick={scrollRight} className={`${offerBanners?.length > 2 ? '' : 'hidden'} bg-primary-bg dark:bg-secondary-bg absolute top-1/2 right-0 transform -translate-y-1/2 text-xl md:text-3xl rounded-full z-10`} >
                            <IoIosArrowDroprightCircle />
                        </button>

                    </div>
            }
        </>
    );
};

export default OfferBanner;
