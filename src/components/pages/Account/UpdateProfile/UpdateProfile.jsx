'use client';

import { showAlertWithTheme } from '@/components/Theme/AlertTheme';
import AxiosPublic from '@/libs/Axios/AxiosPublic';
import React from 'react';
import { FaEdit } from 'react-icons/fa';


const UpdateProfile = ({ user, setUser, setUserLoading }) => {

    const axiosPublic = AxiosPublic();

    // update user info fn
    const handleUpdateProfile = async (e) => {

        e.preventDefault();

        // close modal
        document.getElementById('my_modal_6').close();

        setUserLoading(true);

        const isDarkMode = localStorage.getItem('theme') == 'dark';

        const updatedInfo = {
            name: e.target.name.value,
            email: e.target.email.value,
            gender: e.target.gender.value,
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
                email: e.target.email.value,
                gender: e.target.gender.value,
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
        <div>

            {/* edit profile btn */}
            <button onClick={() => document.getElementById('my_modal_6').showModal()} className='w-full bg-primary-color font-bold text-secondary-text py-2 flex justify-center items-center gap-1 rounded-md mt-5'>
                <FaEdit />
                <span>Update Profile</span>
            </button>

            {/* edit profile modal */}
            <dialog id="my_modal_6" className="modal">
                <div className="modal-box bg-primary-bg dark:bg-secondary-bg text-primary-text dark:text-secondary-text">

                    {/* close btn */}
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h2 className='flex items-center gap-1 font-bold text-sm md:text-base pb-3 border-b border-b-slate-300 mb-4'>
                        <FaEdit />
                        <span>Update Profile</span>
                    </h2>

                    <form onSubmit={handleUpdateProfile}>

                        {/* name */}
                        <div>
                            <label htmlFor="name" className='font-semibold block mb-1'>Name</label>
                            <input type="text" name='name' className='w-full bg-transparent px-2 py-1 border border-slate-300 rounded-md outline-none' defaultValue={user?.name} placeholder='Your Name...' required />
                        </div>

                        <div className='grid grid-cols-2 gap-3 mt-2'>
                            {/* email */}
                            <div>
                                <label htmlFor="email" className='font-semibold block mb-1'>E-mail</label>
                                <input type="email" name='email' className='w-full bg-transparent px-2 py-1 border border-slate-300 rounded-md outline-none' defaultValue={user?.email} placeholder='Your E-mail...' required />
                            </div>
                            {/* gender */}
                            <div>
                                <label htmlFor="gender" className='font-semibold block mb-1'>Gender</label>
                                <select name="gender" id="gender" defaultValue={user?.gender ? user?.gender : ''} className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 border border-slate-300 rounded-md outline-none' required >
                                    <option value="" disabled>Choose One</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>
                            </div>
                        </div>

                        <div className='grid grid-cols-3 gap-2 my-3'>
                            {/* addressline */}
                            <div>
                                <label htmlFor="addressline" className='font-semibold block mb-1'>Address</label>
                                <input type="text" name='addressline' className='w-full bg-transparent px-2 py-1 border border-slate-300 rounded-md outline-none' defaultValue={user?.addressLine} placeholder='Your Addressline...' required />
                            </div>
                            {/* remarks */}
                            <div>
                                <label htmlFor="remarks" className='font-semibold block mb-1'>Remarks</label>
                                <input type="text" name='remarks' className='w-full bg-transparent px-2 py-1 border border-slate-300 rounded-md outline-none' defaultValue={user?.remarks} placeholder='Your Remarks...' />
                            </div>
                            {/* city */}
                            <div>
                                <label htmlFor="city" className='font-semibold block mb-1'>City</label>
                                <select name="city" id="city" defaultValue={user?.city ? user?.city : ''} className='w-full bg-primary-bg dark:bg-secondary-bg px-2 py-1 border border-slate-300 rounded-md outline-none' required >
                                    <option value="" disabled>Choose One</option>
                                    <option value="Dhaka">Dhaka</option>
                                    <option value="Rangpur">Rangpur</option>
                                </select>
                            </div>
                        </div>

                        {/* submit btn */}
                        <input type="submit" value="Update" className='w-full text-center py-2 bg-primary-color rounded-md text-secondary-text font-bold mt-4 cursor-pointer' />

                    </form>

                </div>
            </dialog>

        </div>

    );
};

export default UpdateProfile;