'use client';

import React from 'react';
import { IoIosMailOpen, IoIosCall } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { MdNoteAlt } from "react-icons/md";
import PageTitle from '@/components/shared/PageTitle/PageTitle';


const ContactUsPage = () => {
    return (
        <div>

             {/* page title */}
             <PageTitle title={'Contact Us'} />

            <h2 className='text-base md:text-xl font-bold mb-4'>Contact Us</h2>

            {/* ------- get in touch ------- */}
            <div className='bg-slate-100 dark:bg-slate-600 p-5 my-5 flex flex-col items-center'>

                <h2 className='text-base md:text-lg font-bold mb-4 pb-2 px-5 border-b-[4px] border-b-slate-300'>Get In Touch</h2>
                {/* mobile */}
                <p className='flex items-end gap-3 pb-2'>
                    <span className='font-bold flex items-end gap-1'><IoIosCall className='text-lg md:text-3xl' /> Mobile :</span>
                    <a href="tel:+07216575641" className='hover:underline'>+8801641443111</a>
                </p>
                {/* mail */}
                <p className='flex items-end gap-3 pb-2'>
                    <span className='font-bold flex items-end gap-1'><IoIosMailOpen className='text-lg md:text-3xl' /> Email :</span>
                    <a href="mailto:demo-mail@gmail.com" className='hover:underline'>rakib@vida.com.bd</a>
                </p>
                {/* location */}
                <div className='flex items-end gap-3 pb-2'>
                    <span className='font-bold flex items-end gap-1'><FaLocationDot className='text-lg md:text-3xl' /> Office :</span>
                    <address className='not-italic'>236/5/A, South Prierbag, Amtola Bazar, Mirpur, Dhaka-1216</address>
                </div>

            </div>

            {/* ------contact form -------- */}
            <div className='bg-slate-100 dark:bg-slate-600 px-5 md:px-20 py-5'>

                <div className='font-bold my-3 flex gap-2 pb-2 border-b-2 border-b-slate-300'>
                    <MdNoteAlt className='text-xl md:text-5xl' />
                    <div>
                        <h2 className='text-base md:text-lg'>Want to drop a note?</h2>
                        <p>We would love to listen...</p>
                    </div>
                </div>

                <form className='py-5 space-y-3'>

                    {/* 1st row */}
                    <div className='grid grid-cols-2 gap-2 sm:gap-6'>
                        {/* name */}
                        <div>
                            <label htmlFor="name" className='font-bold'>Name</label>
                            <input type="text" className='w-full bg-transparent border border-slate-300 outline-none px-3 py-1 rounded-[4px]  mt-1' name='name' id='name' placeholder='Your Name...' required />
                        </div>
                        {/* email */}
                        <div>
                            <label htmlFor="email" className='font-bold'>E-mail</label>
                            <input type="email" className='w-full bg-transparent border border-slate-300 outline-none px-3 py-1 rounded-[4px] mt-1' name='email' id='email' placeholder='Your E-mail...' required />
                        </div>
                    </div>

                    {/* 2nd row / message */}
                    <div>
                    <label htmlFor="message" className='font-bold'>Message</label>
                        <textarea name="message" id="message" className='w-full min-h-20 bg-transparent border border-slate-300 outline-none px-3 py-1 rounded-[4px] mt-1' placeholder='Your Message...'></textarea>
                    </div>

                    <input type="submit" value="Send" className='w-full bg-primary-color py-2 rounded-[4px] cursor-pointer text-secondary-text font-bold' />

                </form>

            </div>

        </div>
    );
};

export default ContactUsPage;