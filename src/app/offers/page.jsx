import { getAllOffers } from '@/libs/Offers/getAllOffers';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const OfferPage = async () => {

    const offers = await getAllOffers();


    return (
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>

            {
                offers?.map(offer =>
                    <Link key={offer?.id} href={`/offers/${offer?.title?.toLowerCase()?.replace(/\s+/g, '-')}`} className={`${offer?._count?.offerItems == 0 ? 'hidden' : ''} shadow-md hover:shadow-xl border border-slate-200 dark:border-slate-500 rounded-md`}>
                        <Image src={offer?.banner} className='w-full h-auto object-contain rounded-t-md' width={500} height={500} alt={offer?.title} />
                        <h2 className='text-center py-3 font-bold capitalize'>{offer?.title}</h2>
                    </Link>
                )
            }


        </div>
    );
};

export default OfferPage;