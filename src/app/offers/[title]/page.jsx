import Card from '@/components/shared/Card/Card';
import { getOfferId } from '@/libs/Offers/getOfferId';
import { getSingleOffer } from '@/libs/Offers/getSingleOffer';
import Image from 'next/image';
import React from 'react';
import { FaThList } from "react-icons/fa";


const SingleOffer = async ({ params }) => {

    const encodedTitle = params.title;
    const decodedTitle = decodeURIComponent(encodedTitle)?.replace(/-/g, ' ')?.replace(/\b\w/g, char => char.toUpperCase());

    // offerId by title
    const offerId = await getOfferId(decodedTitle);

    // offer by id
    const offer = await getSingleOffer(offerId?.id);
    

    return (
        <>
            {
                !offer?.success ?
                    <div className='text-red-600'>Something Went Wrong!</div>
                    :
                    <>
                    <Image src={offer?.data?.banner} className='w-full object-cover' width={1300} height={500} alt={offer?.data?.title} />
                    <h2 className='text-base md:text-xl font-bold py-3 flex items-center gap-1'><FaThList className='-mt-[2px]' />Offered Items</h2>
                        <div className='flex justify-center md:justify-start items-center gap-2 md:gap-4'>
                            {
                                offer?.data?.offerItems?.map(item =>
                                    <Card key={item?.product?.id} product={item?.product} />
                                )
                            }
                        </div>
                    </>
            }
        </>
    );
};

export default SingleOffer;