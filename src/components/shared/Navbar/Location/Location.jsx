'use client';

import React from 'react';
import { FaLocationDot } from "react-icons/fa6";


const Location = () => {
    return (
        <div>

            <button className='flex items-center gap-1 text-primary-color font-bold'>
                <FaLocationDot className='text-base md:text-xl' />
                <span>Dhaka</span>
            </button>
            
        </div>
    );
};

export default Location;