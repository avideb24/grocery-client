'use client';

import BillingSummary from '@/components/pages/Checkout/BillingSummary/BillingSummary';
import CheckoutItems from '@/components/pages/Checkout/CheckoutItems/CheckoutItems';
import DeliveryDate from '@/components/pages/Checkout/DeliveryDate/DeliveryDate';
import PaymentMethod from '@/components/pages/Checkout/PaymentMethod/PaymentMethod';
import ShippingInfo from '@/components/pages/Checkout/ShippingInfo/ShippingInfo';
import PageTitle from '@/components/shared/PageTitle/PageTitle';
import { showAlertWithTheme } from '@/components/Theme/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { useCart } from '@/Provider/CartProvider';
import { useCheckout } from '@/Provider/CheckoutProvider';
import { useUser } from '@/Provider/UserProvider';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


const CheckoutPage = () => {

    const { user, userLoading } = useUser();
    const { cart, setCart } = useCart();
    const { checkoutProducts, setCheckoutProducts, checkoutLoading } = useCheckout();
    const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split('T')[0]);
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [btnLoading, setBtnLoading] = useState(false);
    const axiosPublic = AxiosPublic();
    const router = useRouter();

    const shippingAmount = 100;

    const subTotalmount = checkoutProducts?.reduce((acc, product) => {
        return acc + product?.discountPrice * product?.quantity;
    }, 0);

    const totalAmount = subTotalmount + shippingAmount;

    // check user exist or not
    useEffect(() => {
        if (!userLoading) {
            if (!user) {
                router.push('/')
                // show login modal
                document.getElementById('my_modal_1').showModal();
            };
        }
    }, [userLoading, user, router])


    // order place fn
    const handlePlaceOrder = async () => {

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        // check user info added or not
        if (!user?.name || !user?.addressLine || !user?.city) {
            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "Please Add Your Info!",
                showConfirmButton: false,
                timer: 1000
            }, isDarkMode);
            // open add user info modal
            document.getElementById('my_modal_2').showModal();
            return;
        }
        else {
            // check payment method selected or not
            if (!paymentMethod) {
                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: "Select Payment Method!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode);

                setBtnLoading(false);
                return;
            }

            setBtnLoading(true);

            const orderItems = checkoutProducts?.map(product => ({
                productId: product?.id,
                quantity: product?.quantity,
                price: product?.discountPrice * product?.quantity,
            }));

            const orderData = {
                userId: user?.id,
                totalAmount: totalAmount,
                orderStatus: "pending",
                deliveryAddress: `${user?.addressLine}, ${user?.remarks ? `${user?.remarks},` : ''} ${user?.city}`,
                deliveryDate: new Date(deliveryDate).toISOString(),
                paymentMethod: paymentMethod,
                paymentStatus: "Not Paid",
                orderItems: orderItems,
            };

            // post order data
            if (user.id) {
                try {
                    const res = await axiosPublic.post('api/user/order/create', orderData);

                    if (res?.data?.success) {

                        setCheckoutProducts(null);

                        showAlertWithTheme({
                            position: "top-end",
                            icon: "success",
                            title: "Order Placed!",
                            showConfirmButton: false,
                            timer: 1500
                        }, isDarkMode);

                        // navigate to homepage
                        router.push('/account/my-orders')

                        // remove ordered items from the cart
                        const updatedCart = cart?.filter(cartItem =>
                            !orderItems?.some(orderItem => orderItem?.productId == cartItem?.id)
                        );
                        setBtnLoading(false);
                        setCart(updatedCart);
                        localStorage.setItem('cart', JSON.stringify(updatedCart));

                    }
                    else {
                        showAlertWithTheme({
                            position: "top-end",
                            icon: "error",
                            title: "Something Went wrong!",
                            showConfirmButton: false,
                            timer: 1500
                        }, isDarkMode);
                    }

                }
                catch (err) {
                    showAlertWithTheme({
                        position: "top-end",
                        icon: "error",
                        title: "Something Went wrong!",
                        showConfirmButton: false,
                        timer: 1500
                    }, isDarkMode);
                    // console.error(err);
                }
            }
        }

    };    


    return (
        <>
            {
                userLoading ?
                    <div className='flex justify-center mt-20 md:mt-36'>
                        <span className="loading loading-bars loading-lg bg-primary-color"></span>
                    </div>
                    :
                    <>
                        <PageTitle title={'Checkout'} />

                        <div className='grid grid-cols-1 lg:grid-cols-2 lg:gap-10'>

                            {/* 1st col */}
                            <div>

                                <h2 className='text-base md:text-lg font-bold'>Ready To Checkout</h2>
                                <p className='font-semibold pb-2'>
                                    <span className='mr-2 text-red-600'>Missed something?</span>
                                    <Link href={'/'}>Let&apos;s shop</Link>
                                </p>

                                <ShippingInfo />

                                <DeliveryDate deliveryDate={deliveryDate} setDeliveryDate={setDeliveryDate} />

                                <div className='w-full h-[2px] bg-slate-300 rounded-full my-2'></div>

                                <CheckoutItems />

                            </div>

                            {/* 2nd col */}
                            <div className='mt-8 lg:mt-0'>

                                <BillingSummary checkoutLoading={checkoutLoading} subTotalmount={subTotalmount} shippingAmount={shippingAmount} totalAmount={totalAmount} />

                                <PaymentMethod paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />

                                <button onClick={handlePlaceOrder} className='w-full font-bold text-white bg-primary-color py-2 my-3 rounded-md' disabled={btnLoading}>
                                    {btnLoading ? <span className="loading loading-spinner loading-md text-white"></span> : 'Place Order'}
                                </button>

                            </div>

                        </div>
                    </>
            }
        </>
    );
};

export default CheckoutPage;