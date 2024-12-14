'use client';

import Card from '@/components/shared/Card/Card';
import LinkButton from '@/components/shared/Buttons/LinkButton/LinkButton';
import React, { useRef } from 'react';
import { MdOutlineCallMade } from "react-icons/md";
import { FaCircleChevronRight, FaCircleChevronLeft } from "react-icons/fa6";


const CategoryProducts = ({ categoryTitle, subCategoryTitle, products, relatedProducts }) => {

    const scrollContainerRef = useRef(null);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const scrollLeft = useRef(0);


    // for scroll --------------
    const handleMouseDown = (e) => {
        isDragging.current = true;
        startX.current = e.pageX - scrollContainerRef.current.offsetLeft;
        scrollLeft.current = scrollContainerRef.current.scrollLeft;
        scrollContainerRef.current.style.cursor = 'grabbing';
    };

    const handleMouseLeave = () => {
        isDragging.current = false;
        scrollContainerRef.current.style.cursor = 'default';
    };

    const handleMouseUp = () => {
        isDragging.current = false;
        scrollContainerRef.current.style.cursor = 'default';
    };

    const handleMouseMove = (e) => {
        if (!isDragging.current) return;
        e.preventDefault();
        const x = e.pageX - scrollContainerRef.current.offsetLeft;
        const walk = (x - startX.current) * 2; // Adjust scrolling speed
        scrollContainerRef.current.scrollLeft = scrollLeft.current - walk;
    };

    const handlePrevClick = () => {
        scrollContainerRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    };

    const handleNextClick = () => {
        scrollContainerRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    };
    // ---------------------------


    return (
        <>
            {
                products?.length == 0 ?
                    <></>
                    :
                    <div className='pb-8'>

                        {/* category name and btns */}
                        <div className='flex justify-between items-center gap-5 pb-3'>
                            <h2 className='text-lg md:text-xl font-bold capitalize'>{relatedProducts ? categoryTitle : subCategoryTitle}</h2>
                            <div className='flex-1 h-[1px] bg-slate-300'></div>

                            <div className='flex items-center gap-2'>
                                <div className='flex items-center gap-2 text-primary-color text-lg md:text-xl'>
                                    {/* prev btn */}
                                    <button onClick={handlePrevClick}><FaCircleChevronLeft /></button>
                                    {/* next btn */}
                                    <button onClick={handleNextClick}><FaCircleChevronRight /></button>
                                </div>

                                {/* view all btn */}
                                <LinkButton btnText={'View All'} linkTo={{
                                    pathname: `/categories/${categoryTitle?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and')}`,
                                    query: { subCategory: subCategoryTitle?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and') }
                                }} icon={MdOutlineCallMade} />
                            </div>
                        </div>

                        {/* category products */}
                        <div className='flex gap-2 overflow-scroll whitespace-nowrap select-none scrollbar-hide' ref={scrollContainerRef} onMouseDown={handleMouseDown} onMouseLeave={handleMouseLeave} onMouseUp={handleMouseUp} onMouseMove={handleMouseMove} >
                            {
                                products?.map(product =>
                                    <div key={product?.id} className="inline-block"><Card product={product} /></div>
                                )
                            }
                        </div>

                    </div>
            }
        </>
    );
};

export default CategoryProducts;
