'use client';

import { showAlertWithTheme } from '@/components/Theme/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { useUser } from '@/Provider/UserProvider';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { FaCircleXmark } from "react-icons/fa6";
import { RiLoginCircleFill } from "react-icons/ri";

const Login = () => {

    const [active, setActive] = useState('login');
    const [number, setNumber] = useState('');
    const [otp, setOtp] = useState('');
    const [showError, setShowError] = useState(false);
    const [showOtpError, setOtpShowError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [countdown, setCountdown] = useState(0);
    const [isResendDisabled, setIsResendDisabled] = useState(false);
    const axiosPublic = AxiosPublic();
    const router = useRouter();
    const { setUser } = useUser();


    // login fn
    const handleLogin = async (e) => {

        e.preventDefault();
        setLoading(true);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        // validate number
        const validateNumber = () => {
            if (number.startsWith('+8801') && number.length === 14) {
                return true;
            } else if (number.startsWith('01') && number.length === 11) {
                return true;
            } else {
                return false;
            }
        };

        if (validateNumber()) {

            const res = await axiosPublic.post('/api/auth/loginOrRegister', { mobile: number });

            if (res?.data?.success) {
                setActive('otp');
                setLoading(false);
            }
            else {
                setLoading(false);

                showAlertWithTheme({
                    position: "top-end",
                    icon: "error",
                    title: "Something Went Wrong!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode)
            };
            setLoading(false);
        }
        else {
            setLoading(false);
            setShowError(true);
        };
    };

    // otp fn
    const handleOTP = async (e) => {

        e.preventDefault();
        setLoading(true);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const loginData = { mobile: number, otp: parseInt(otp) };

        const userRes = await axiosPublic.post('api/auth/verify', loginData);


        if (userRes.data.success) {
            const userInfoRes = await axiosPublic.get(`/api/user/user/${userRes.data.data.id}`);

            if (userInfoRes.data.success) {

                // set user to provider and userId to localStorage
                setUser(userInfoRes.data.data);
                localStorage.setItem('userId', userRes.data.data.id);

                // close login modal
                document.getElementById('my_modal_1').close();
                setLoading(false);

                // navigate to home
                showAlertWithTheme({
                    position: "top-end",
                    icon: "success",
                    title: "Login Successful!",
                    showConfirmButton: false,
                    timer: 1500
                }, isDarkMode)
                router.push('/');

            }
            else {
                setLoading(false);

                showAlertWithTheme({
                    positieon: "top-end",
                    icon: "error",
                    title: "Wrong OTP!",
                    showConfirmButton: fals,
                    timer: 1500
                }, isDarkMode)
            }
            setLoading(false);
        }
        else {
            setLoading(false);
            setOtpShowError(true);
        }

    };

    // resend otp fn
    const handleResendOTP = () => {
        setIsResendDisabled(true);
        setCountdown(15);

        const countdownInterval = setInterval(() => {
            setCountdown(prevCount => prevCount - 1);
        }, 1000);

        setTimeout(() => {
            clearInterval(countdownInterval);
            setIsResendDisabled(false);
        }, 15000);
    };


    return (
        <dialog id="my_modal_1" className="modal">
            <div className="modal-box bg-primary-bg dark:bg-secondary-bg relative p-10">
                <h2 className='text-sm md:text-lg font-bold border-b border-b-slate-300 pb-2 mb-3 flex justify-center items-center gap-1'>
                    <RiLoginCircleFill className='mt-[2px]' />
                    <span>Signup / Login</span>
                </h2>

                {/* login form */}
                <form onSubmit={handleLogin} className={`${active === 'login' ? 'opacity-100 block' : 'opacity-0 hidden'} w-full px-3 md:px-10 py-3 duration-300`}>
                    {/* mobile */}
                    <div>
                        <label htmlFor="mobile" className='block uppercase'>Please enter your mobile number</label>
                        <input onChange={(e) => { setNumber(e.target.value), setShowError(false) }} type="number" name='mobile' value={number} className='w-full bg-transparent border border-slate-300 px-2 py-1 outline-none mt-2 rounded-md' id='mobile' placeholder='e.g. +8801723622148' required />
                    </div>
                    <p className={`${showError ? '' : 'hidden'} my-1 text-red-600 text-[9px] md:text-[11px] text-center`}>Please type a Bangladeshi Number e.g. +8801723622127</p>
                    {/* submit btn */}
                    <button type='submit' className='w-full block py-2 mt-6 bg-primary-color rounded-md text-white font-bold cursor-pointer' >
                        {loading ? <span className="loading loading-spinner loading-md"></span> : 'Signup / Login'}
                    </button>
                </form>


                {/* --------------- otp form ---------------- */}
                <form onSubmit={handleOTP} className={`${active === 'otp' ? 'opacity-100 block' : 'opacity-0 hidden'} w-full px-3 md:px-10 py-3 space-y-2 duration-300`}>
                    <p className='text-center text-primary-color mb-3'>We&apos;ve sent an OTP to <span className='font-bold'>{number}</span></p>
                    <div>
                        <label htmlFor="otp" className='block uppercase'>Please enter the OTP</label>
                        <input onChange={(e) => { setOtp(e.target.value), setLoading(false) }} type="number" name='otp' value={otp} className='w-full bg-transparent border border-slate-300 px-2 py-1 outline-none mt-2 rounded-md' id='otp' placeholder='Type OTP...' required />
                    </div>

                    <div className='grid grid-cols-2 gap-3 pt-2'>
                        {/* enter btn */}
                        <button type='submit' className='w-full py-1 bg-primary-color rounded-[4px] text-white font-bold block cursor-pointer'>
                            {loading ? <span className="loading loading-spinner loading-md"></span> : 'Enter'}
                        </button>
                        {/* resend btn */}
                        <button type='button' onClick={handleResendOTP} className={`w-full py-1 rounded-[4px] font-bold block ${isResendDisabled ? 'bg-gray-400 cursor-not-allowed' : 'bg-secondary-color text-primary-text cursor-pointer'}`} disabled={isResendDisabled} >
                            {isResendDisabled ? `Resend (${countdown}s)` : 'Resend'}
                        </button>
                    </div>

                    {/* otp error */}
                    <p className='text-center text-red-600'>{showOtpError ? 'Invalid OTP' : ''}</p>

                    <div onClick={() => { setActive('login'), setNumber(''), setOtp('') }} className='flex justify-center'>
                        <button type='button' className='mt-6 text-[10px] md:text-xs hover:underline'>Back To Login</button>
                    </div>
                </form>

                {/* modal close btn */}
                <div className="modal-action absolute -top-3 right-3">
                    <form method="dialog">
                        <button onClick={() => { setActive('login'), setNumber(''), setOtp('') }} className="text-red-600 text-xl md:text-3xl"><FaCircleXmark /></button>
                    </form>
                </div>
            </div>
        </dialog>
    );
};

export default Login;
