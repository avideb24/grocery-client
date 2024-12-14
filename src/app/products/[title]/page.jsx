import React from 'react';
import Image from 'next/image';
import CategoryProducts from '@/components/shared/CategoryProducts/CategoryProducts';
import ProductDetailBtns from '@/components/pages/ProductDetails/ProductDetailBtns/ProductDetailBtns';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { getSingleProduct } from '@/libs/Products/getSingleProduct';
import { getProductId } from '@/libs/Products/getProductId';
import { getCategoryProducts } from '@/libs/Products/getCategoryProducts';


const SingleProductPage = async ({ params }) => {

    const encodedTitle = params?.title;
    const decodedTitle = decodeURIComponent(encodedTitle)?.replace(/-/g, ' ');

    // get product id by title
    const productId = await getProductId(decodedTitle);

    // // get product by id
    const product = await getSingleProduct(productId);

    // page title
    const pageTitle = decodedTitle?.replace(/\b\w/g, char => char.toUpperCase());

    // related products
    const relatedProducts = await getCategoryProducts(product?.subCategory?.category?.id);

     // Calculate discount percentage
  const calculateDiscountPercentage = (regularPrice, discountPrice) => {
    if (!regularPrice || !discountPrice) return 0;
    return Math.round(((regularPrice - discountPrice) / regularPrice) * 100);
  };

  const discountPercentage = calculateDiscountPercentage(product?.regularPrice, product?.discountPrice);


    return (
        <>
            {
                !product ?
                    <div className='text-red-600 font-bold'>Something Went wrong!</div>
                    :
                    <div className='py-5'>

                        <PageTitle title={`${pageTitle}`} />

                        <div className='flex flex-col sm:flex-row gap-6 pb-10'>

                            <div className='w-full h-36 sm:w-4/12 sm:h-full'>
                                {/* image */}
                                <Image src={product?.thumbnailImage} width={500} height={500} className='w-full h-full object-contain rounded-[6px]' alt={product?.title} priority />
                            </div>

                            <div className='w-full sm:w-8/12 space-y-3'>

                                {/* stock */}
                                {
                                    product?.stock < 30 ?
                                        <p className='inline-block text-[10px] md:text-xs text-white bg-red-600 px-2 py-1 rounded-sm'>Low Stock</p>
                                        :
                                        <p className='inline-block text-[10px] md:text-xs text-white bg-green-600 px-2 py-1 rounded-sm'>In Stock</p>
                                }

                                {/* title & weight */}
                                <div className='flex items-center gap-2'>
                                    <h2 className='text-base md:text-xl font-semibold'>{product?.title}</h2>
                                    <span>-</span>
                                    <p>{product?.weight}</p>
                                </div>

                                {/* regular & discounted prices */}
                                <div className='flex items-center gap-10 lg:gap-20 py-2 my-2 border-y border-y-slate-300'>
                                    <div className='flex items-center gap-2'>
                                        <p className=' text-primary-color'>৳<span className='text-base md:text-xl font-bold'>{product?.discountPrice}</span></p>
                                        <p className='text-red-600 line-through'>৳{product?.regularPrice}</p>
                                    </div>
                                    <div className='bg-secondary-color px-6 lg:px-12 py-2 lg:py-3 font-bold text-base lg:text-2xl rounded-bl-full rounded-tr-full'>• {discountPercentage}% off</div>
                                </div>

                                {/* add to cart & buy now btn */}
                                <ProductDetailBtns product={product} />

                                {/* category */}
                                <p>Category: {product?.subCategory?.category?.title}</p>

                                {/* description */}
                                {/* <div>{product?.description}</div> */}
                                <div className='common-scrollbar p-2 h-32 overflow-y-auto border border-slate-300 dark:border-slate-500 rounded-md'>{product?.description}</div>

                            </div>

                        </div>

                        {/* related products */}
                        <CategoryProducts categoryTitle={product?.subCategory?.category?.title} subCategoryTitle={product?.subCategory?.title} products={relatedProducts?.data} relatedProducts={true} />

                    </div>
            }
        </>
    );
};

export default SingleProductPage;


