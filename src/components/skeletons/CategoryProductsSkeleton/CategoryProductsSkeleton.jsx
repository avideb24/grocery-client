import React from 'react';
import CardSkeleton from '../CardSkeleton/CardSkeleton';

const CategoryProductsSkeleton = () => {
    return (
        <div className=''>
            <div className='flex items-center gap-5'>
                <div className='bg-slate-300 dark:bg-slate-600 skeleton w-28 h-5'></div>
                <div className='bg-slate-300 dark:bg-slate-600 skeleton flex-1 h-[2px]'></div>
                <div className='flex items-center gap-2'>
                    <div className='bg-slate-300 dark:bg-slate-600 skeleton w-5 h-5 rounded-full'></div>
                    <div className='bg-slate-300 dark:bg-slate-600 skeleton w-5 h-5 rounded-full'></div>
                    <div className='bg-slate-300 dark:bg-slate-600 skeleton w-20 h-6 rounded-full'></div>
                </div>
            </div>
            <div className='flex gap-2 overflow-hidden mt-3'>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
                <div className='w-36'>
                    <CardSkeleton />
                </div>
            </div>
        </div>
    );
};

export default CategoryProductsSkeleton;