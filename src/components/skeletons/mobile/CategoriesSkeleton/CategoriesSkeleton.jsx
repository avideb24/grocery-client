import React from 'react';
import CategorySkeleton from '../../Sidebar/CategorySkeleton';

const CategoriesSkeleton = () => {
    return (
        <>
            <div className='grid grid-cols-2 gap-3 pb-6 md:pb-8'>
                <div className="skeleton w-full h-16 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
                <div className="skeleton w-full h-16 bg-slate-200 dark:bg-slate-600 rounded-md"></div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-4'>
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
            </div>
        </>
    );
};

export default CategoriesSkeleton;