'use client';

import { showAlertWithTheme } from '@/components/Theme/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import { useUser } from '@/Provider/UserProvider';
import React from 'react';
import { FaEdit, FaSave, FaShippingFast } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";


const ShippingInfo = () => {

    const { user, setUser, setUserLoading } = useUser();
    const axiosPublic = AxiosPublic();

    // update user info fn
    const handleUpdateInfo = async (e) => {
        e.preventDefault();

        setUserLoading(true);
        const isDarkMode = localStorage.getItem('theme') == 'dark';

        // close modal
        document.getElementById('my_modal_2').close();

        const updatedInfo = {
            name: e.target.name.value,
            email: user?.email,
            gender: user?.gender,
            addressLine: e.target.addressline.value,
            remarks: e.target.remarks.value,
            city: e.target.city.value,
        };

        const res = await axiosPublic.patch(`api/user/user/update/${user?.id}`, updatedInfo);

        if (res.data.success) {
            
            const newUserInfo = {
                id: user?.id,
                mobile: user?.mobile,
                name: e.target.name.value,
                email: user?.email,
                gender: user?.gender,
                addressLine: e.target.addressline.value,
                remarks: e.target.remarks.value,
                city: e.target.city.value,
            };

            setUserLoading(false);
            setUser(newUserInfo);

            showAlertWithTheme({
                position: "top-end",
                icon: "success",
                title: "Updated!",
                showConfirmButton: false,
                timer: 1000
            }, isDarkMode);

        }
        else {

            setUserLoading(false);

            showAlertWithTheme({
                position: "top-end",
                icon: "error",
                title: "something Went Wrong!",
                showConfirmButton: false,
                timer: 1000
            }, isDarkMode);
        };

    };


    return (
        <div className='mt-3 p-3 border rounded-md'>

            <div className='flex justify-between items-center gap-2'>
                <h2 className='text-sm md:text-base font-semibold flex items-center gap-1'>
                    <FaShippingFast className='text-xl md:text-2xl' />
                    <span>Shipping Information</span>
                </h2>

                {/* modal btn */}
                <button onClick={() => document.getElementById('my_modal_2').showModal()} className='text-sm md:text-lg'><FaEdit /></button>

                {/* modal box */}
                <dialog id="my_modal_2" className="modal">
                    <div className="modal-box pb-2 bg-primary-bg dark:bg-secondary-bg text-primary-text dark:text-secondary-text">

                        {/* edit form */}
                        <form onSubmit={handleUpdateInfo} className='pt-3'>

                            {/* name */}
                            <div>
                                    <label htmlFor="name" className='font-bold'>Name<span className='text-red-600'>*</span></label>
                                    <input type="text" name='name' defaultValue={user?.name} className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 mt-1' placeholder='Your Name...' id='name' required />
                                </div>

                            <h2 className='font-bold mt-4 mb-2'>Address</h2>
                            <div className='grid grid-cols-3 gap-2'>
                                {/* addressline */}
                                <div>
                                    <label htmlFor="addressline">Addressline<span className='text-red-600'>*</span></label>
                                    <input type="text" name='addressline' defaultValue={user?.addressLine} className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 mt-1' placeholder='Addressline' id='addressline' required />
                                </div>
                                {/* remarks */}
                                <div>
                                    <label htmlFor="remarks">Remarks</label>
                                    <input type="text" name='remarks' defaultValue={user?.remarks} className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 mt-1' placeholder='Remarks' id='remarks' />
                                </div>
                                {/* city */}
                                <div>
                                    <label htmlFor="city">City<span className='text-red-600'>*</span></label>
                                    <select name="city" id="city" className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 rounded-md outline-none border border-slate-300 mt-1' defaultValue={user?.city} required >
                                        <option value="" disabled>Choose one</option>
                                        <option value="Dhaka">Dhaka</option>
                                        <option value="Rangpur">Rangpur</option>
                                        <option value="Dinajpur">Dinajpur</option>
                                    </select>
                                </div>
                            </div>

                            {/* submit btn */}
                            <button type='submit' className='w-full bg-primary-color text-secondary-text font-semibold py-1 rounded-md mt-4 flex justify-center items-center gap-1'>
                                <FaSave />
                                <span>Save</span>
                            </button>

                        </form>

                        <div className="modal-action">
                            <form method="dialog">
                                {/* modal close btn */}
                                <button className="absolute top-4 right-4 text-red-600 text-2xl"><FaCircleXmark /></button>
                            </form>
                        </div>
                    </div>
                </dialog>

            </div>

            <div>
                <div className='grid grid-cols-2 gap-3 pt-3'>

                    <div className='break-words'>
                        <p className='text-[10px] md:text-xs font-bold'>Name <span className='text-red-600'>*</span></p>
                        <p>{user?.name ? user?.name : <span className='text-red-600'>Not Set</span>}</p>
                    </div>

                    <div className='break-words'>
                        <p className='text-[10px] md:text-xs font-bold'>Phone<span className='text-red-600'>*</span></p>
                        <p>{user?.mobile}</p>
                    </div>

                </div>

                <div className='col-span-2 break-words mt-3'>
                    <p className='text-[10px] md:text-xs font-bold'>Delivery Address<span className='text-red-600'>*</span></p>
                    {
                        !user?.addressLine || !user?.city ? 
                        <p className='text-red-600'>Not Set</p>
                        :
                        <p>{user?.addressLine}, {`${user?.remarks ? `${user?.remarks},` : '' }`} {user?.city}</p>
                    }
                </div>

            </div>

        </div>
    );
};

export default ShippingInfo;