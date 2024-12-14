'use client';

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { FaXmark } from "react-icons/fa6";
import { getStories } from "@/libs/Stories/getStories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCheckout } from "@/Provider/CheckoutProvider";
import { useUser } from "@/Provider/UserProvider";


const Stories = () => {

    const { userId, setUserId, setUser, } = useUser();
    const [stories, setStories] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [currentStory, setCurrentStory] = useState(null);
    const { setCheckoutProducts } = useCheckout();
    const router = useRouter();

    useEffect(() => {
        const fetchStories = async () => {
            const res = await getStories();
            setStories(res?.data)
        };

        fetchStories();
    }, []);


    // Use ref to control progress bar width
    const progressBarRef = useRef(null);

    const openModal = (story) => {
        setCurrentStory(story);
        setIsModalOpen(true);
        setTimeout(() => setIsVisible(true), 10);
    };

    const closeModal = () => {
        setIsVisible(false);
        setTimeout(() => setIsModalOpen(false), 500);
    };

    useEffect(() => {
        if (isModalOpen) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [isModalOpen]);

    useEffect(() => {
        let timer;
        if (isModalOpen && currentStory) {
            // Reset progress bar
            if (progressBarRef.current) {
                progressBarRef.current.style.width = '0%';
                progressBarRef.current.style.transition = 'none';
                setTimeout(() => {
                    progressBarRef.current.style.transition = 'width 15s linear';
                    progressBarRef.current.style.width = '100%';
                }, 10);
            }

            // Automatically move to the next story after 20 seconds
            timer = setTimeout(() => {
                handleNextStory();
            }, 15000);

            // Clear the timer if the story changes
            return () => {
                clearTimeout(timer);
                if (progressBarRef.current) {
                    progressBarRef.current.style.transition = 'none';
                    progressBarRef.current.style.width = '0%';
                }
            };
        }
    }, [currentStory, isModalOpen]);

    const handleNextStory = () => {
        const currentIndex = stories.findIndex(story => story?.id === currentStory?.id);
        if (currentIndex < stories?.length - 1) {
            const nextIndex = currentIndex + 1;
            setCurrentStory(stories[nextIndex]);
        } else {
            closeModal(); // Close modal if it's the last story
        }
    };

    const handlePrevStory = () => {
        const currentIndex = stories.findIndex(story => story.id === currentStory.id);
        if (currentIndex > 0) {
            const prevIndex = currentIndex - 1;
            setCurrentStory(stories[prevIndex]);
        }
    };



    // buy now fn
    const handleBuyNow = (story) => {

        const product = story?.product;

        // added product
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
                stories?.length == 0 || !stories ?
                    <></>
                    :
                    <div className="md:hidden mb-5">
                        <h2 className="text-base md:text-xl font-bold mb-3">Fresh Stories</h2>

                        <div className="flex gap-3 overflow-x-scroll scrollbar-hide">
                            {stories?.map(story => (
                                <div key={story?.id} className="cursor-pointer mr-2 flex-shrink-0 border-2 border-primary-color rounded-full" onClick={() => openModal(story)}>
                                    <Image src={story?.url} width={500} height={500} className="w-16 h-16 object-cover m-[2px] rounded-full" alt="story image" />
                                </div>
                            ))}
                        </div>

                        {isModalOpen && currentStory && (
                            <div className={`w-full fixed inset-0 flex items-center justify-center bg-black z-50 transition-opacity duration-500 ease-in-out ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
                                <div className="relative max-w-96 h-full justify-center">

                                    {/* close btn */}
                                    <button onClick={closeModal} className="absolute top-4 right-0 z-[70] text-white text-2xl"><FaXmark /></button>

                                    {/* prev btn */}
                                    <button onClick={handlePrevStory} className={`absolute z-[60] w-1/2 left-0 h-full cursor-pointer ${stories?.findIndex(story => story?.id === currentStory?.id) === 0 ? 'cursor-default opacity-50' : ''}`}
                                        disabled={stories.findIndex(story => story?.id === currentStory?.id) === 0}
                                    ></button>

                                    {/* next btn */}
                                    <button onClick={handleNextStory} className={`absolute z-[60] w-1/2 right-0 h-full cursor-pointer ${stories?.findIndex(story => story?.id === currentStory?.id) === stories?.length - 1 ? 'cursor-default opacity-50' : ''}`}
                                        disabled={stories?.findIndex(story => story?.id === currentStory?.id) === stories?.length - 1}
                                    ></button>

                                    {/* timeout bar */}
                                    <div className="absolute left-0 top-0 z-50 w-full h-1 bg-transparent overflow-hidden">
                                        <div ref={progressBarRef} className="h-full bg-primary-color" />
                                    </div>

                                    {/*title and buy now btn */}
                                    <div className="w-full absolute z-[80] left-0 px-1 bottom-10 flex flex-col items-center gap-2">

                                        <button onClick={() => handleBuyNow(currentStory)} className="bg-secondary-color h-max text-primary-text font-bold py-1 px-4 rounded-[4px]">Buy Now</button>

                                        <h2 className="text-white font-bold text-sm">{currentStory?.title}</h2>
                                    </div>


                                    <div className={`transform transition-transform duration-500 ease-in-out ${isVisible ? 'scale-100' : 'scale-95'}`}>
                                        <div className='w-full h-screen flex justify-center items-center'>
                                            <Image src={currentStory?.url} width={400} height={400} className='w-80 max-h-[560px] object-cover rounded-md' alt='Story image' />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
            }
        </>
    );
};

export default Stories;
