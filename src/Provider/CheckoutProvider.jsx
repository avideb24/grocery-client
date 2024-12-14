'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const CheckoutContext = createContext(null);

export const useCheckout = () => useContext(CheckoutContext);


const CheckoutProvider = ({ children }) => {

    const [checkoutProducts, setCheckoutProducts] = useState(null);
    const [checkoutLoading, setCheckoutLoading] = useState(true);


    // set items in initial loading
    useEffect(() => {

        const isExist = localStorage.getItem('checkoutProducts');

        if (isExist) {
            setCheckoutLoading(false)
            setCheckoutProducts(JSON.parse(isExist))
        }

        setCheckoutLoading(false);

    }, []);

    // increase quantity fn
    const handleIncreaseProductQuantity = (productId) => {
        const updatedProducts = checkoutProducts?.map(product => {
            if (product?.id === productId) {
                return { ...product, quantity: product?.quantity + 1 };
            }
            return product;
        });
        setCheckoutProducts(updatedProducts);
        localStorage.setItem('checkoutProducts', JSON.stringify(updatedProducts));
    };

    // decrease quantity fn
    const handleDecreaseProductQuantity = (productId) => {
        const updatedProducts = checkoutProducts?.map(product => {
            if (product?.id === productId && product?.quantity > 1) {
                return { ...product, quantity: product?.quantity - 1 };
            }
            return product;
        });
        setCheckoutProducts(updatedProducts);
        localStorage.setItem('checkoutProducts', JSON.stringify(updatedProducts));
    };


    const values = { checkoutProducts, setCheckoutProducts, checkoutLoading, setCheckoutLoading, handleIncreaseProductQuantity, handleDecreaseProductQuantity };


    return (
        <CheckoutContext.Provider value={values}>
            {children}
        </CheckoutContext.Provider>
    )
};

export default CheckoutProvider;