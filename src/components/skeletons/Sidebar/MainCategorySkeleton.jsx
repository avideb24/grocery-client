import React from 'react';
import CategorySkeleton from './CategorySkeleton';


const MainCategorySkeleton = () => {
    return (
        <>
            <div className='grid grid-cols-2 gap-3 mb-3'>
                <div className="skeleton w-full bg-slate-200 dark:bg-slate-600 h-16 rounded-md"></div>
                <div className="skeleton w-full bg-slate-200 dark:bg-slate-600 h-16 rounded-md"></div>
            </div>
            <div className='space-y-2'>
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

export default MainCategorySkeleton;