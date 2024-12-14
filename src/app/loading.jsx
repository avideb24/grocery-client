import React from 'react';

const loading = () => {
    return (
        <div className='w-full h-screen flex justify-center items-center'>
            <span className="-mt-44 md:-mt-28 bg-primary-color loading loading-bars loading-lg"></span>
        </div>
    );
};

export default loading;