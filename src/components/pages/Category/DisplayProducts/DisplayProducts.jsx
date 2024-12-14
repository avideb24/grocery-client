'use client';

import Card from '@/components/shared/Card/Card';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { TbArrowsSort } from 'react-icons/tb';
import { useSearchParams } from 'next/navigation';
import { getSubCategoryId } from '@/libs/Sidebar/getSubCategoryId';
import { getCategoryId } from '@/libs/Sidebar/getCategoryId';
import { getSubCategoryProducts } from '@/libs/Products/getSubCategoryProducts';
import { getCategoryProducts } from '@/libs/Products/getCategoryProducts';

const DisplayProducts = ({ categoryTitle, subCategories }) => {
    const searchParams = useSearchParams();
    const subCategoryQuery = searchParams.get('subCategory');
    const [displayProducts, setDisplayProducts] = useState([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [isLoading, setIsLoading] = useState(false);

    // decodes
    const decodedSubCategoryQuery = decodeURIComponent(subCategoryQuery?.replace(/-/g, ' ')?.replace(/and/g, '&'));
    const decodedCategoryTitle = decodeURIComponent(categoryTitle?.replace(/-/g, ' ')?.replace(/and/g, '&'));


    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            try {
                let products = [];
                if (subCategoryQuery) {
                    const subCategoryId = await getSubCategoryId(decodedSubCategoryQuery); // Fetch subcategory ID based on query
                    const response = await getSubCategoryProducts(subCategoryId)
                    products = response?.data;
                    setActiveCategory(decodedSubCategoryQuery);
                } else {
                    const categoryId = await getCategoryId(categoryTitle); // Fetch category ID based on title
                    const response = await getCategoryProducts(categoryId);
                    products = response?.data;
                    setActiveCategory('all');
                }
                setDisplayProducts(products);
            } catch (error) {
                console.error("Error fetching products:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchProducts();
    }, [subCategoryQuery, decodedSubCategoryQuery, categoryTitle]);

    // Sort by price
    const handleSortByPrice = (query) => {
        const sortedProducts = [...displayProducts]?.sort((a, b) => {
            if (query === 'lowToHigh') return a?.discountPrice - b?.discountPrice;
            if (query === 'highToLow') return b?.discountPrice - a?.discountPrice;
            return 0;
        });
        setDisplayProducts(sortedProducts);
    };

    if (isLoading) {
        return <div className='w-full flex justify-center items-center pt-32 lg:pt-48'>
            <span className="loading loading-bars loading-lg bg-primary-color"></span>
        </div>;
    };


    return (
        <div>
            <div className='flex justify-between items-center gap-3'>
                <h2 className='text-base md:text-xl font-bold capitalize'>{decodedCategoryTitle}</h2>
                <div className='flex gap-2'>
                    <h3 className='flex items-center gap-1'><TbArrowsSort />Sort By Price</h3>
                    <select onChange={(e) => handleSortByPrice(e.target.value)} className='bg-primary-bg dark:bg-secondary-bg border border-slate-400 text-[10px] md:text-xs px-3 py-1 rounded-[4px] cursor-pointer' defaultValue={''} >
                        <option value="" disabled>Choose One</option>
                        <option value="lowToHigh">Low To High</option>
                        <option value="highToLow">High To Low</option>
                    </select>
                </div>
            </div>

            <div className='py-4 flex flex-wrap gap-2'>
                <Link href={`/categories/${categoryTitle?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and')}`}
                    onClick={() => setActiveCategory('all')}
                    className={`${activeCategory == 'all' ? 'bg-primary-color text-secondary-text' : ''} px-3 py-1 font-semibold border-2 border-primary-color hover:bg-primary-color hover:text-secondary-text rounded-full duration-200`}>
                    All Products
                </Link>
                {
                    subCategories?.map(subCategory =>
                        <Link href={{
                            pathname: `/categories/${categoryTitle?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and')}`,
                            query: { subCategory: subCategory?.title?.toLowerCase()?.replace(/\s+/g, '-').replace(/&/g, 'and') }
                        }}
                            key={subCategory?.id}
                            onClick={() => setActiveCategory(subCategory?.title)}
                            className={`${activeCategory == subCategory?.title?.toLowerCase() ? 'bg-primary-color text-secondary-text' : ''} px-3 py-1 hover:bg-primary-color hover:text-secondary-text font-semibold border-2 border-primary-color rounded-full capitalize duration-200`}>
                            {subCategory?.title}
                        </Link>
                    )}
            </div>

            {
                displayProducts?.length == 0 || displayProducts == undefined ?
                    <div className='font-bold text-center my-20'>No Products Found!</div>
                    :
                    <div className='flex flex-wrap justify-center sm:justify-start items-center gap-2 xl:gap-5'>
                        {
                            displayProducts?.map(product =>
                                <Card key={product?.id} product={product} />
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default DisplayProducts;
