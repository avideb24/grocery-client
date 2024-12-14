'use client';

import React from 'react';
import { IoBag } from "react-icons/io5";
import { FaXmark } from "react-icons/fa6";
import Link from 'next/link';
import Image from 'next/image';
import { FaBasketShopping } from "react-icons/fa6";
import { RiDeleteBin7Fill } from "react-icons/ri";
import LinkButton from '../../Buttons/LinkButton/LinkButton';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useCart } from '@/Provider/CartProvider';
import { useCheckout } from '@/Provider/CheckoutProvider';
import { useRouter } from 'next/navigation';
import { showAlertWithTheme } from '@/components/Theme/AlertTheme';


const CartItems = ({ setShowCart }) => {

    const { cart, loading, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity } = useCart();

    const router = useRouter();
    const { setCheckoutProducts } = useCheckout();

    const totalPrice = cart?.reduce((total, item) => {
        const itemPrice = item?.discountPrice;
        return total + (itemPrice * item?.quantity);
    }, 0);


    // navigate to checkout with orderItmes
    const handleNavigateToCheckout = () => {
        setShowCart(false);
        localStorage.setItem('checkoutProducts', JSON.stringify(cart));
        setCheckoutProducts(cart);
        router.push('/checkout');
    };


    // remove item from cart fn
    const handleRemoveItem = productId => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        showAlertWithTheme({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete",
        }, isDarkMode).then((result) => {

            if (result.isConfirmed) {
                handleRemoveFromCart(productId);
                showAlertWithTheme({
                    position: "top-end",
                    title: "Deleted!",
                    icon: "success",
                    timer: 1000
                }, isDarkMode);
            }

        });

    };


    return (
        <div className={`w-96 h-screen bg-slate-100 dark:bg-slate-600 pb-[65px] shadow-md overflow-y-scroll`}>

            {/*  ------- title and cart close btn -------- */}
            <div className='bg-secondary-color flex justify-between items-center p-2 text-primary-text font-semibold'>
                <h2 className='flex items-center gap-2'>
                    <IoBag className='text-lg' />
                    <span>{cart?.length} Items</span>
                </h2>
                <button onClick={() => setShowCart(false)} className='flex items-center gap-0'>
                    <FaXmark className='mt-[2px]' />
                    <span>Close</span>
                </button>
            </div>

            {/* ------ products ------- */}
            {
                cart?.length == 0 ?
                    <div className='w-full flex flex-col justify-center items-center gap-3 mt-10'>
                        <p className='text-red-600 font-bold'>No Products Added!</p>
                        <button onClick={() => setShowCart(false)}>
                            <LinkButton btnText={'Shop Now'} linkTo={'/'} icon={FaBasketShopping} />
                        </button>
                    </div>
                    :
                    <div className='px-2 pt-4'>

                        {
                            cart?.map(product =>
                                <div key={product?.id} className='grid grid-cols-7 items-center gap-2  border-b border-b-slate-300 py-2'>

                                    {/* quantity */}
                                    <div className='flex flex-col items-center'>
                                        <button onClick={() => handleIncreaseQuantity(product?.id)} ><IoIosArrowUp /></button>
                                        <p>{product?.quantity}</p>
                                        <button onClick={() => handleDecreaseQuantity(product?.id)} disabled={product?.quantity == 1}><IoIosArrowDown /></button>
                                    </div>

                                    {/* image */}
                                    <Link href={`/products/${product?.title?.toLowerCase().replace(/ /g, '-')}`}>
                                        <Image src={product?.thumbnailImage} width={50} height={50} className='w-full object-contain' alt={product?.title} />
                                    </Link>

                                    {/* title & weight */}
                                    <Link href={`/products/${product?.title?.toLowerCase().replace(/ /g, '-')}`} className='col-span-3'>
                                        <h2 className='font-semibold'>{product?.title}</h2>
                                        <div className='text-xs flex items-center gap-2'>
                                            <p><span className='text-base'>৳</span>{product?.discountPrice}</p>
                                            <p>-</p>
                                            <p>{product?.weight}</p>
                                        </div>
                                    </Link>

                                    {/* prices */}
                                    <p className='text-sm  font-bold mr-2'>৳{product?.discountPrice * product?.quantity}</p>

                                    {/* delete btn */}
                                    <button onClick={() => handleRemoveItem(product?.id)} className='text-red-600 text-xl flex justify-end'><RiDeleteBin7Fill /></button>

                                </div>
                            )
                        }

                    </div>
            }

            {/* -------- order place btn --------- */}
            <div className='w-full grid grid-cols-2 bg-slate-100 dark:bg-slate-600 absolute bottom-28 left-0 text-center'>
                <button onClick={handleNavigateToCheckout} className='py-2 bg-secondary-color font-bold text-primary-text' disabled={cart?.length == 0} >Checkout</button>
                <p className='bg-slate-300 py-2 font-bold text-primary-text'>৳ {totalPrice}</p>
            </div>

        </div>
    );
};

export default CartItems;