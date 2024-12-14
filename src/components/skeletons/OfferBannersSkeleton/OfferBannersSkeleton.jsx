import React from 'react';

const OfferBannersSkeleton = () => {
    return (
        <div className='hidden md:grid grid-cols-1 sm:grid-cols-2 gap-2'>
            <div className="skeleton w-full md:h-24 lg:h-36 bg-slate-200 dark:bg-slate-600"></div>
            <div className="skeleton w-full md:h-24 lg:h-36 bg-slate-200 dark:bg-slate-600"></div>
        </div>
    );
};

export default OfferBannersSkeleton;