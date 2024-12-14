'use client';

import React from 'react';
import { MdOutlineDateRange } from "react-icons/md";


const DeliveryDate = ({ deliveryDate, setDeliveryDate }) => {

    // select date fn
    const handleDateSelection = (daysToAdd) => {
        const selectedDate = new Date();
        selectedDate.setDate(selectedDate.getDate() + daysToAdd);
        setDeliveryDate(selectedDate.toISOString().split('T')[0]); 
    };


    return (
        <div className='py-4 md:py-5'>

            <div className='text-sm md:text-base font-bold mb-3 flex items-end gap-1'>
                <MdOutlineDateRange className='text-2xl md:text-3xl text-primary-color' />
                <h2>Select Delivery Date</h2>
            </div>

            <div className='grid grid-cols-3 gap-2'>
                <button onClick={() => handleDateSelection(0)} className={`py-2 font-bold border-2 border-primary-color ${deliveryDate == new Date().toISOString().split('T')[0] ? 'bg-primary-color text-secondary-text' : 'bg-transparent'} rounded-md duration-200`}>Today</button>

                <button onClick={() => handleDateSelection(1)} className={`py-2 font-bold border-2 border-primary-color ${deliveryDate == new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] ? 'bg-primary-color text-secondary-text' : 'bg-transparent'} rounded-md duration-200`}>Tomorrow</button>

                <button onClick={() => handleDateSelection(2)} className={`py-2 font-bold border-2 border-primary-color ${deliveryDate == new Date(new Date().setDate(new Date().getDate() + 2)).toISOString().split('T')[0] ? 'bg-primary-color text-secondary-text' : 'bg-transparent'} rounded-md duration-200`}>Day After Tomorrow</button>
            </div>
        </div>
    );
};

export default DeliveryDate;
