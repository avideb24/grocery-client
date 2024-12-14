'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);


const CartProvider = ({ children }) => {

    const [cart, setCart] = useState([]);
    const [loading, setLoading] = useState(true);

    // cart initial load
    useEffect(() => {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            setLoading(false);
            setCart(JSON.parse(savedCart));
        }
        setLoading(false);
    }, []);

    // add to cart fn
    const handleAddToCart = product => {
        const isExist = cart?.find(item => item?.id == product?.id);
        if (isExist) {
            setLoading(false);
            alert('Already Added!')
        }
        else {
            const updatedCart = [...cart, product];
            setCart(updatedCart);
            setLoading(false);
            localStorage.setItem('cart', JSON.stringify(updatedCart));
        }
    };

    // remove product from cart fn
    const handleRemoveFromCart = productId => {
        const updatedCart = cart?.filter(product => product?.id != productId);
        setCart(updatedCart);
        setLoading(false);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // increase quantity fn
    const handleIncreaseQuantity = (productId) => {

        const updatedCart = cart.map(product => {
            if (product?.id === productId) {
                return { ...product, quantity: product?.quantity + 1 };
            }
            return product;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };

    // decrease quantity fn
    const handleDecreaseQuantity = (productId) => {
        const updatedCart = cart?.map(product => {
            if (product?.id === productId && product?.quantity > 1) {
                return { ...product, quantity: product?.quantity - 1 };
            }
            return product;
        });
        setCart(updatedCart);
        localStorage.setItem('cart', JSON.stringify(updatedCart));
    };


    const values = { cart, setCart, loading, handleAddToCart, handleRemoveFromCart, handleIncreaseQuantity, handleDecreaseQuantity };

    return (
        <CartContext.Provider value={values}>
            {children}
        </CartContext.Provider>
    )

};

export default CartProvider;