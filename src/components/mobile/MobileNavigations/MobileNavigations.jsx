'use client';

import Link from 'next/link';
import React from 'react';
import { RiHome4Line } from "react-icons/ri";
import { BiCategory } from "react-icons/bi";
import { FiUser } from "react-icons/fi";
import { IoBagOutline } from "react-icons/io5";
import { GoVideo } from "react-icons/go";
import { usePathname } from 'next/navigation';
import { useCart } from '@/Provider/CartProvider';

const MobileNavigations = () => {

    const { cart } = useCart();

    const pathname = usePathname();

    return (
        <div className='md:hidden fixed left-0 bottom-0 w-full z-10 bg-primary-bg dark:bg-secondary-bg'>
            <div className="grid grid-cols-4 text-center font-semibold border border-slate-300 text-xl rounded-full overflow-hidden mb-1">

                {/* reels */}
                {/* <Link href={'/reels'} className={`w-full p-3 duration-200 rounded-full ${pathname == '/reels' ? 'bg-secondary-bg text-secondary-text dark:bg-primary-bg dark:text-primary-text' : 'bg-transparent'}`} title='Reels'>
                    <GoVideo className='mx-auto' />
                </Link> */}


                {/* home */}
                <Link href={'/'} className={`w-full p-3 duration-200 rounded-full ${pathname === '/' ? 'bg-secondary-bg text-secondary-text dark:bg-primary-bg dark:text-primary-text' : 'bg-transparent'}`} title='Home'>
                    <RiHome4Line className='mx-auto' />
                </Link>

                {/* category */}
                <Link href={'/categories'} className={`w-full p-3 duration-200 rounded-full ${pathname == '/categories' ? 'bg-secondary-bg text-secondary-text dark:bg-primary-bg dark:text-primary-text' : 'bg-transparent'}`} title='Category'>
                    <BiCategory className='mx-auto' />
                </Link>

                {/* cart */}
                <Link href={'/cart'} className={`w-full p-3 duration-200 rounded-full ${pathname === '/cart' ? 'bg-secondary-bg text-secondary-text dark:bg-primary-bg dark:text-primary-text' : 'bg-transparent'}`} title='Bag'>
                    <p className='w-fit relative mx-auto'>
                        <IoBagOutline />
                        {
                            cart?.length == 0 ?
                                <></>
                                :
                                <span className={`h-3 absolute -top-1 -right-3 text-[9px] px-1 ${pathname == '/cart' ? 'bg-primary-bg dark:bg-secondary-bg dark:text-secondary-text text-primary-text' : 'bg-secondary-bg text-secondary-text dark:bg-primary-bg dark:text-primary-text'} rounded-full`}>
                                    <span className='block -mt-[9px] font-bold'>{cart?.length}</span>
                                </span>
                        }
                    </p>

                </Link>

                {/* account */}
                <Link href={'/account'} className={`w-full p-3 duration-200 rounded-full ${pathname == '/account' ? 'bg-secondary-bg text-secondary-text dark:bg-primary-bg dark:text-primary-text' : 'bg-transparent'}`} title='Account'>
                    <FiUser className='mx-auto' />
                </Link>
            </div>
        </div>
    );
};

export default MobileNavigations;
