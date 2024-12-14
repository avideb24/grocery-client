'use client';

import Link from "next/link";
import { HiOutlineMenuAlt1 } from "react-icons/hi";
import { LuSearch } from "react-icons/lu";
import { RiLoginCircleLine } from "react-icons/ri";
import ThemeToggle from "@/components/Theme/ThemeToggle";
import Login from "../Login/Login";
import Button from "../Buttons/Button/Button";
import Image from "next/image";
import userImg from '@/assets/user.png';
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Location from "./Location/Location";
import { useUser } from "@/Provider/UserProvider";
import AxiosPublic from "@/libs/Axios/AxiosPublic";
import Card from "../Card/Card";


const Navbar = ({ showSidebar, setShowSidebar }) => {

    // const [showSidebar, setShowSidebar] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const pathname = usePathname();
    const { user, setUser, userLoading } = useUser();
    const [searchText, setSearchText] = useState('');
    const [searchProducts, setSearchProducts] = useState([]);
    const axiosPublic = AxiosPublic();

    // update searchProducts for every searchtext change
    useEffect(() => {
        if (searchText.length > 0) {
            const fetchProducts = async () => {
                const res = await axiosPublic.get(`/api/user/product/search?search=${searchText}`);
                if (res.data.success) {
                    setSearchProducts(res.data.data);
                }

            };

            fetchProducts();
        };
    }, [axiosPublic, searchText]);

    // prevent body scroll when search results open
    useEffect(() => {
        if (searchText.length > 0) {
            document.body.classList.add('overflow-hidden');
        } else {
            document.body.classList.remove('overflow-hidden');
        }

        return () => {
            document.body.classList.remove('overflow-hidden');
        };
    }, [searchText]);

    // logout fn
    const handleLogout = () => {
        setUser(null);
        localStorage.setItem('userId', null);
    };


    return (
        <header className="sticky top-0 z-50 p-3 mb-3 shadow-md bg-primary-bg dark:bg-secondary-bg">
            <div className="relative">
                <div className="grid items-center grid-cols-2 md:grid-cols-4 gap-3">

                    <div className="flex items-center gap-3">
                        {/* sidebar open / close btn */}
                        <button onClick={() => setShowSidebar(!showSidebar)} className="hidden md:inline-block text-2xl md:text-3xl mt-1"><HiOutlineMenuAlt1 /></button>

                        {/* logo */}
                        <Link href={'/'} className="text-lg md:text-xl font-bold">Grocery</Link>
                    </div>

                    {/* search bar */}
                    <div className="hidden md:block col-span-2 relative">
                        <input type="text" onChange={(e) => setSearchText(e.target.value)} name="search" className="w-full bg-transparent px-2 py-1 border border-slate-300 outline-none rounded-[4px]" placeholder="Search Products (e.g. fish, milk, potato)" />
                        <p className="absolute top-[5px] right-3 p-1"><LuSearch /></p>
                    </div>

                    <nav className="flex justify-end items-center gap-3">
                        {/* user location */}
                        <Location />

                        {/* theme btn */}
                        <ThemeToggle />

                        <>
                            {
                                userLoading ?
                                    <div className="hidden md:block skeleton h-8 w-8 bg-slate-200 dark:bg-slate-600 rounded-full"></div>
                                    :
                                    <div>
                                        {
                                            user ?
                                                <div className="relative z-[60] hidden md:block">
                                                    {/* user image / user menu btn */}
                                                    <button onClick={() => setShowUserMenu(!showUserMenu)}>
                                                        <Image src={userImg} className="rounded-full mt-[2px]" width={30} height={30} alt="User Image" />
                                                    </button>
                                                    {/* user menu */}
                                                    <div className={`w-36 bg-primary-bg dark:bg-secondary-bg border border-slate-300 dark:border-slate-500 absolute -left-28  ${showUserMenu ? 'opacity-100 visible -bottom-[135px]' : 'opacity-0 invisible -bottom-28'} transition-all duration-200 shadow-md py-2 font-semibold rounded-[4px]`} >

                                                        <Link href={'/account/profile'} onClick={() => setShowUserMenu(false)} className="flex justify-center items-center gap-1 px-3 py-1 hover:bg-slate-300 dark:hover:bg-slate-600">
                                                            <span>Profile</span>
                                                        </Link>
                                                        <Link href={'/account/my-orders'} onClick={() => setShowUserMenu(false)} className={`flex justify-center items-center gap-1 px-4 py-1 hover:bg-slate-300 dark:hover:bg-slate-600`}>
                                                            <span>My Orders</span>
                                                        </Link>
                                                        <Link href={'/account/wishlist'} onClick={() => setShowUserMenu(false)} className={`flex justify-center items-center gap-1 px-4 py-1 hover:bg-slate-300 dark:hover:bg-slate-600`}>
                                                            <span>Wishlist</span>
                                                        </Link>
                                                        <button onClick={handleLogout} className="w-full flex justify-center items-center gap-1 px-3 py-1 hover:bg-slate-300 dark:hover:bg-slate-600">
                                                            <span>Logout</span>
                                                        </button>

                                                    </div>
                                                </div>
                                                :
                                                <>
                                                    {/* login / register */}
                                                    <div className="hidden md:block">
                                                        <Button btnText={'Login'} icon={RiLoginCircleLine} handleClick={() => document.getElementById('my_modal_1').showModal()} />
                                                    </div>

                                                    {/* login / register modal */}
                                                    <Login />
                                                </>
                                        }
                                    </div>
                            }
                        </>

                    </nav>

                </div>

                {/* mobile search bar */}
                <div className={`${pathname == '/reels' && 'hidden'} md:hidden w-full mt-3 relative`}>
                    <input type="text" onChange={(e) => setSearchText(e.target.value)} className="w-full bg-transparent p-2 border border-slate-300 outline-none rounded-[4px]" placeholder="Search Products (e.g. fish, milk, potato)" />
                    <p className="absolute top-[6px] right-1 p-1 text-base"><LuSearch /></p>
                </div>

                {/* search result's area */}
                <div className={`${searchText.length > 0 ? '' : 'hidden'} absolute left-[-10px] right-[-10px] top-20 md:top-12 z-[60] w-[calc(100% + 20px)] h-screen bg-primary-bg dark:bg-secondary-bg overflow-y-auto px-5 py-3`}>
                    <h2 className="font-semibold pb-4">Search Result For {`'${searchText}'`}</h2>
                    {
                        searchProducts?.length == 0 ?
                            <div className="text-red-600 text-center mt-32 font-bold">No Product Found!</div>
                            :
                            <div className="flex flex-wrap justify-center sm:justify-start gap-2 md:gap-4">
                                {
                                    searchProducts?.map(product =>
                                        <div key={product?.id} className="">
                                            <Card product={product} />
                                        </div>
                                    )
                                }
                            </div>
                    }
                </div>
            </div>
        </header>
    );
};

export default Navbar;