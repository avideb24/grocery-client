'use client';

import { getAllOffers } from '@/libs/Offers/getAllOffers';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';


const SpecialRoutes = ({loadingMainCategories}) => {

    const [offer, setOffer] = useState([]);

    useEffect(() =>{
        const fetchData = async() => {
            const res = await getAllOffers();
            const filteredOffers = res?.filter(offer => offer._count.offerItems !== 0);
            setOffer(filteredOffers);
        };
        fetchData();
    },[])


    return (
        <div className={`${loadingMainCategories ? 'hidden' : ''} mb-2 py-2 border-y border-y-slate-300 dark:border-y-slate-500 pl-2 font-semibold`}>

            {/* offers */}
            <Link href={'/offers'} className='block'>Offers <span className='text-primary-color font-bold'>{`[${offer?.length}]`}</span></Link>

        </div>
    );
};

export default SpecialRoutes;