import React from 'react';

const CardSkeleton = () => {
    return (
        <div className="w-36 space-y-1">
            <div className="bg-slate-300 dark:bg-slate-600 skeleton h-20 w-full"></div>
            <div className="bg-slate-300 dark:bg-slate-600 skeleton h-4 w-full"></div>
            <div className="bg-slate-300 dark:bg-slate-600 skeleton h-4 w-20"></div>
            <div className="bg-slate-300 dark:bg-slate-600 skeleton h-4 w-16"></div>
            <div className="bg-slate-300 dark:bg-slate-600 skeleton h-7 w-full"></div>
        </div>
    );
};

export default CardSkeleton;