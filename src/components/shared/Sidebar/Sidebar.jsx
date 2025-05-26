'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getMainCategories } from '@/libs/Sidebar/getMainCategories';
import { getCategories } from '@/libs/Sidebar/getCategories';
import { IoIosArrowForward } from "react-icons/io";
import MainCategorySkeleton from '@/components/skeletons/Sidebar/MainCategorySkeleton';
import CategorySkeleton from '@/components/skeletons/Sidebar/CategorySkeleton';
import { VscDebugBreakpointLog } from "react-icons/vsc";
import SpecialRoutes from './SpecialRoutes/SpecialRoutes';

const Sidebar = () => {
    const [mainCategories, setMainCategories] = useState(null);
    const [categories, setCategories] = useState(null);
    const [activeCategory, setActiveCategory] = useState(null);
    const [expandedCategoryId, setExpandedCategoryId] = useState(null);
    const [loadingMainCategories, setLoadingMainCategories] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(false);

    // Fetch main categories
    useEffect(() => {
        const fetchMainCategories = async () => {
            try {
                const res = await getMainCategories();
                setMainCategories(res?.data);
                setActiveCategory(res?.data[0]);
            } catch (error) {
                console.error('Error fetching main categories:', error);
            } finally {
                setLoadingMainCategories(false);
            }
        };
        fetchMainCategories();
    }, []);

    // Fetch categories when active category changes
    useEffect(() => {
        const fetchCategories = async () => {
            if (activeCategory) {
                setLoadingCategories(true);
                try {
                    const res = await getCategories(activeCategory?.id);
                    setCategories(res?.data);
                } catch (error) {
                    console.error('Error fetching sidebar links:', error);
                } finally {
                    setLoadingCategories(false);
                }
            }
        };
        fetchCategories();
    }, [activeCategory]);

    // Subcategory toggle
    const handleCategoryClick = (categoryId) => {
        setExpandedCategoryId(expandedCategoryId === categoryId ? null : categoryId);
    };


    return (
        <div className='md:w-60 lg:w-72 bg-primary-bg dark:bg-secondary-bg h-[calc(100vh-65px)] p-3 sidebar-shadow'>
            {/* Main Categories */}
            <div>
                {
                    loadingMainCategories ?
                        <MainCategorySkeleton />
                        :
                        <div className='grid grid-cols-2 gap-3'>
                            {
                                mainCategories?.map(mainCategory =>
                                    <button key={mainCategory?.id} onClick={() => setActiveCategory(mainCategory)} className={`${activeCategory?.title === mainCategory?.title ? 'bg-primary-color text-white' : ''} border border-primary-color p-2 rounded-[4px] duration-300`} >
                                        <Image src={mainCategory?.icon} width={50} height={50} className='w-6 mx-auto pb-1' alt={mainCategory?.title} />
                                        <span className='font-semibold text-[10px] md:text-xs 2xl:text-sm'>{mainCategory?.title}</span>
                                    </button>
                                )
                            }
                        </div>
                }
            </div>

            {/* Category links with subcategories */}
            <div className='mt-3 space-y-1'>
                {
                    loadingCategories ?
                        <div className='space-y-2'>
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                            <CategorySkeleton />
                        </div>
                        :
                        <>
                            <SpecialRoutes loadingMainCategories={loadingMainCategories} />
                            {
                                categories?.map(category => (
                                    <div key={category?.id}>
                                        <Link href={`/categories/${category?.title?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and')}`} onClick={() => handleCategoryClick(category?.id)} className='flex items-center justify-between w-full font-semibold p-1 hover:bg-slate-200 dark:hover:bg-slate-600 rounded-[6px] duration-200'
                                        >
                                            <div className='flex items-center gap-3'>
                                                <Image src={category?.icon} width={50} height={50} className='w-6' alt={category?.title} />
                                                <span>{category?.title}</span>
                                            </div>
                                            <span className={`${expandedCategoryId === category.id ? 'rotate-90' : ''} duration-200`}><IoIosArrowForward /></span>
                                        </Link>

                                        {/* Sub-category */}
                                        <div className={`ml-6 mt-1 space-y-1 overflow-hidden transition-max-height duration-300 ease-in-out ${expandedCategoryId === category.id ? 'max-h-[500px]' : 'max-h-0'}`} >
                                            {category?.subCategories?.map(subCategory => (

                                                <Link key={subCategory?.id}
                                                    href={{
                                                        pathname: `/categories/${category?.title?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and')}`,
                                                        query: { subCategory: subCategory?.title?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and') }
                                                    }}

                                                    className='w-full  flex gap-1 font-semibold text-gray-700 dark:text-gray-300 py-1 hover:bg-slate-200 dark:hover:bg-slate-600 ml-3 px-2 rounded-md' >
                                                    <VscDebugBreakpointLog className='mt-1' />
                                                    {subCategory?.title}
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))
                            }
                        </>
                }
            </div>
        </div>
    );
};

export default Sidebar;
