'use client';

import PageTitle from '@/components/shared/PageTitle/PageTitle';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { RiDeleteBin7Fill } from 'react-icons/ri';
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useCart } from '@/Provider/CartProvider';
import { useCheckout } from '@/Provider/CheckoutProvider';
import { useRouter } from 'next/navigation';
import Swal from 'sweetalert2';
import { showAlertWithTheme } from '@/components/Theme/AlertTheme';


const CartPage = () => {

    const { cart, loading, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity } = useCart();
    const router = useRouter();
    const { setCheckoutProducts } = useCheckout();

    // item remove form cart
    const handleRemoveItem = (productId) => {

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

    // navigate to checkout with orderItems
    const handleNavigateToCheckout = () => {
        localStorage.setItem('checkoutProducts', JSON.stringify(cart));
        setCheckoutProducts(cart);
        router.push('/checkout');
    };


    return (
        <>

            <PageTitle title={'My Cart'} />

            <h2 className='text-base md:text-xl font-bold'>My Cart</h2>

            {
                loading ?
                    <div className='text-center pt-28'>
                        <span className="loading loading-bars loading-lg bg-primary-color"></span>
                    </div>
                    :
                    <div className='space-y-3 py-3'>

                        {
                            cart?.length == 0 ?
                                < div className='text-red-600 text-center py-8 font-semibold'> No Products Added!</div>
                                :
                                <>
                                    {
                                        cart?.map(product =>
                                            <div key={product?.id} className='grid grid-cols-7 items-center gap-2 mx-2 p-2 border border-slate-300 rounded-[4px]'>

                                                {/* quantity */}
                                                <div className='flex flex-col items-center'>
                                                    <button onClick={() => handleIncreaseQuantity(product?.id)} ><IoIosArrowUp /></button>
                                                    <p>{product?.quantity}</p>
                                                    <button onClick={() => handleDecreaseQuantity(product?.id)} disabled={product?.quantity == 1}><IoIosArrowDown /></button>
                                                </div>

                                                {/* image */}
                                                <Link href={`/products/${product?.title?.toLowerCase().replace(/ /g, '-')}`}>
                                                    <Image src={product?.thumbnailImage} width={50} height={50} className='w-10 md:w-20 object-contain' alt='Product Image' />
                                                </Link>

                                                {/* title & weight */}
                                                <Link href={`/products/${product?.title?.toLowerCase().replace(/ /g, '-')}`} className='col-span-3'>
                                                    <h2 className='font-bold'>{product?.title}</h2>
                                                    <div className='flex items-center gap-1 text-[10px]'>
                                                        <p><span className='text-xs'>৳</span>{product?.discountPrice}</p>
                                                        <p>-</p>
                                                        <p>{product?.weight}</p>
                                                    </div>
                                                </Link>

                                                {/* prices */}
                                                <p className='text-sm font-bold mr-2'><span className='text-lg'>৳</span>{product?.quantity * product?.discountPrice}</p>

                                                {/* delete btn */}
                                                <button onClick={() => handleRemoveItem(product?.id)} className='text-red-600 text-xl flex justify-end'><RiDeleteBin7Fill /></button>

                                            </div>
                                        )
                                    }
                                </>

                        }
                    </div>
            }

            {/* navigate to checkout */}
            <button onClick={handleNavigateToCheckout} className='w-full bg-primary-color text-secondary-text font-bold flex justify-center items-center mt-5 py-2 rounded-md ' disabled={cart?.length == 0} >Checkout</button>

        </>
    );
};

export default CartPage;