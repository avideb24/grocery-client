'use client';

import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { getMainCategories } from '@/libs/Sidebar/getMainCategories';
import { getCategories } from '@/libs/Sidebar/getCategories';
import CategoriesSkeleton from '@/components/skeletons/mobile/CategoriesSkeleton/CategoriesSkeleton';


const CategoriesPage = () => {

    const [mainCategories, setMainCategories] = useState(null);
    const [categories, setCategories] = useState(null);
    const [activeMainCategory, setActiveMainCategory] = useState(null);
    const [loadingMainCategories, setLoadingMainCategories] = useState(true);

    // fetch main categories
    useEffect(() => {
        const fetchMainCategory = async () => {
            try {
                const res = await getMainCategories();
                setMainCategories(res?.data);
                setActiveMainCategory(res?.data[0]);
            } catch (error) {
                console.error('Error fetching main categories:', error);
            } finally {
                setLoadingMainCategories(false);
            }
        };
        fetchMainCategory()
    }, []);

    // fetch categories 
    useEffect(() => {
        const fetchCategories = async () => {
            if (activeMainCategory) {
                try {
                    const res = await getCategories(activeMainCategory?.id);
                    setCategories(res?.data);
                } catch (error) {
                    console.error('Error fetching sidebar links:', error);
                }
            }
        };
        fetchCategories();
    }, [activeMainCategory]);


    return (
        <div>

            <PageTitle title={'Categories'} />

            <h1 className='text-base md:text-xl font-bold mb-3'>Categories</h1>

            {
                loadingMainCategories ?
                    <CategoriesSkeleton />
                    :
                    <>
                        {/* main category btn */}
                        < div className='grid grid-cols-2 gap-3 pb-6 md:pb-8'>
                            {
                                mainCategories?.map(mainCategory =>
                                    <button key={mainCategory?.id} onClick={() => setActiveMainCategory(mainCategory)} className={`${activeMainCategory?.title == mainCategory?.title ? 'bg-primary-color text-white' : ''} border border-primary-color p-2 rounded-[4px] duration-300`}>
                                        <Image src={mainCategory?.icon} width={50} height={50} className='w-6 mx-auto pb-1' alt={mainCategory?.title} />
                                        <span className='font-bold'>{mainCategory?.title}</span>
                                    </button>
                                )
                            }
                        </div>

                        {/* category's list */}
                        <div className='grid grid-cols-2 md:grid-cols-4 gap-5'>

                            {
                                categories?.map(category =>
                                    <Link key={category?.id} href={`/categories/${category?.title?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and')}`} className='flex items-center gap-2 shadow-md hover:shadow-lg rounded-[4px] border border-slate-100 px-2 py-1'>
                                        <Image src={category?.icon} className='w-6 object-contain' width={50} height={50} alt='category' />
                                        <h2 className='font-bold capitalize'>{category?.title}</h2>
                                    </Link>
                                )
                            }

                        </div>
                    </>
            }

        </div >
    );
};

export default CategoriesPage;