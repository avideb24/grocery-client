import React from 'react';
import Image from 'next/image';
import AddToCart from './AddToCart/AddToCart';
import Link from 'next/link';
import AddToWishlist from './AddToWishlist/AddToWishlist';


const Card = ({ product }) => {

    return (
        <div className='w-36 h-max p-2 rounded-[6px] space-y-1 border border-slate-200 dark:border-slate-600 hover:border-primary-color dark:hover:border-primary-color duration-150 relative overflow-hidden shadow-md hover:shadow-lg mb-1'>

            {/* <AddToWishlist productId={product?.id} /> */}

            {/* image */}
            <Link href={`/products/${product?.title?.toLowerCase().replace(/ /g, '-')}`}>
                <Image src={product?.thumbnailImage} width={500} height={500} placeholder='blur' blurDataURL={`data:${product?.thumbnailImage}`} className='w-full h-20 object-contain rounded-[6px]' alt={product?.title} />
            </Link>

            {/* title */}
            <Link href={`/products/${product?.title?.toLowerCase().replace(/ /g, '-')}`}>
                <h2 className='h-9 mt-1 hover:underline leading-tight text-ellipsis overflow-hidden' style={{ wordBreak: 'break-word', overflowWrap: 'break-word', whiteSpace: 'normal' }}>
                    {product?.title?.length > 30 ? `${product?.title?.slice(0,30)}...` : `${product?.title}`}
                </h2>
            </Link>

            {/* weight */}
            <p className='text-[10px] md:text-xs opacity-85'>{product?.weight}</p>

            {/* discounted and regular price */}
            <p className='flex items-center gap-1'>
                <span className='font-bold text-sm md:text-base text-primary-color'>৳{product?.discountPrice}</span>
                <span className='flex items-center text-xs line-through text-red-600'>৳{product?.regularPrice}</span>
            </p>

            <AddToCart product={product} />

        </div>
    );
};

export default Card;
