'use client';

import PageTitle from '@/components/shared/PageTitle/PageTitle';
import React from 'react';
import { SiNamebase } from "react-icons/si";
import { FaMobileScreenButton } from "react-icons/fa6";
import { IoIosMail } from "react-icons/io";
import { CgBoy } from "react-icons/cg";
import { RiHomeOfficeLine } from "react-icons/ri";
import UpdateProfile from '@/components/pages/Account/UpdateProfile/UpdateProfile';
import { useUser } from '@/Provider/UserProvider';


const UserProfilePage = () => {

    const { user, setUser, userLoading, setUserLoading } = useUser();

    return (
        <>
            {
                userLoading ?
                    <div className='flex justify-center mt-36 md:mt-52'>
                        <span className="loading loading-bars loading-lg bg-primary-color"></span>
                    </div>
                    :
                    <div>

                        <PageTitle title={'Profile'} />

                        <h2 className='text-base md:text-xl font-bold'>Your Profile</h2>

                        {/* profile infos */}
                        <div className='pt-3 md:py-5 space-y-3'>

                            {/* name */}
                            <div className='border-b border-b-slate-300 pb-3'>
                                <p className='flex items-center gap-2'>
                                    <SiNamebase />
                                    <span>Name</span>
                                </p>
                                <h2 className='text-sm md:text-base mt-1 ml-5'>{user?.name ? user?.name : 'Not Set'}</h2>
                            </div>

                            {/* mobile */}
                            <div className='border-b border-b-slate-300 pb-2'>
                                <p className='flex items-center gap-2'>
                                    <FaMobileScreenButton />
                                    <span>Mobile</span>
                                </p>
                                <h2 className='text-sm md:text-base mt-1 ml-5'>{user?.mobile ? user?.mobile : 'Not Set'}</h2>
                            </div>


                            {/* email */}
                            <div className='border-b border-b-slate-300 pb-2'>
                                <p className='flex items-center gap-2'>
                                    <IoIosMail className='text-base md:text-lg' />
                                    <span>E-mail</span>
                                </p>
                                <h2 className='text-sm md:text-base mt-1 ml-6'>{user?.email ? user?.email : 'Not Set'}</h2>
                            </div>

                            {/* gender */}
                            <div className='border-b border-b-slate-300 pb-2'>
                                <p className='flex items-center gap-2'>
                                    <CgBoy className='text-base md:text-lg' />
                                    <span>Gender</span>
                                </p>
                                <h2 className='text-sm md:text-base mt-1 ml-6'>{user?.gender ? user?.gender : 'Not Set'}</h2>
                            </div>

                            {/* address */}
                            <div className='border-b border-b-slate-300 pb-2'>
                                <p className='flex items-center gap-2'>
                                    <RiHomeOfficeLine className='text-base md:text-lg' />
                                    <span>Address</span>
                                </p>
                                <div className='text-sm md:text-base mt-1 ml-6 flex gap-1'>
                                    <p>{user?.addressLine ? `${user?.addressLine},` : 'Not Set'}</p>
                                    <p>{user?.remarks ? `${user?.remarks},` : ''}</p>
                                    <p>{user?.city ? user?.city : ''}</p>
                                </div>
                            </div>

                        </div>

                        <UpdateProfile user={user} setUser={setUser} setUserLoading={setUserLoading} />
                    </div>
            }
        </>
    );
};

export default UserProfilePage;