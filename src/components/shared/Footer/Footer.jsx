'use client';

import Link from "next/link";
import Image from "next/image";
import playStorewhite from '@/assets/footer/play-store-white.png';
import playStoreBlack from '@/assets/footer/play-store-black.png';
import appleStoreWhite from '@/assets/footer/apple-store-white.png';
import appleStoreBlack from '@/assets/footer/apple-store-black.png';
import { FaFacebookSquare, FaInstagramSquare } from "react-icons/fa";


const Footer = () => {
    return (
        <footer className="hidden lg:block px-2 py-7 footer-shadow-top mt-5">

            <div className="grid grid-cols-5 items-start">

                <div className="">
                    {/* logo */}
                    <Link href={'/'} className="text-lg md:text-xl font-bold">Grocery</Link>

                    {/* address */}
                    <address className="not-italic block mt-1">
                        ka/D Block, Mirpur, <br /> Dhaka, Bangladesh.
                    </address>
                </div>

                <div>
                    <h2 className="font-bold mb-2">Help</h2>
                    <div className="flex flex-col gap-2">
                        {/* contact us */}
                        <Link href={'/contact-us'} className="hover:underline w-max">Contact Us</Link>

                        {/* FAQ */}
                        <Link href={'/faq'} className="hover:underline w-max">FAQ</Link>
                    </div>
                </div>

                <div>
                    <h2 className="font-bold mb-2">Our Policy</h2>
                    <div className="flex flex-col gap-2">
                        {/* terms and condition */}
                        <Link href={'/terms-and-condition'} className="hover:underline w-max">Terms and Conditions</Link>

                        {/* privacy policy */}
                        <Link href={'/privacy-policy'} className="hover:underline w-max">Privacy Policy</Link>

                        {/* refund policy */}
                        <Link href={'/refund-policy'} className="hover:underline w-max">Refund Policy</Link>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h2 className="font-bold">Find Us...</h2>
                    <div className="text-lg md:text-2xl flex items-center gap-2">
                        <Link href={'/'} className="hover:text-blue-600 duration-300"><FaFacebookSquare /></Link>
                        <Link href={'/'} className="hover:text-pink-600 duration-300"><FaInstagramSquare /></Link>
                    </div>
                </div>

                {/* google play / apple store */}
                <div className="flex justify-end">
                    <div className="max-w-52 flex items-center gap-2">
                        <Link href={'/'}>
                            <Image src={playStorewhite} className='dark:hidden w-full object-contain' alt="Download Grocery app at play store" />
                        </Link>
                        <Link href={'/'}>
                            <Image src={playStoreBlack} className='hidden dark:block w-full object-contain' alt="Download Grocery app at play store" />
                        </Link>
                        <Link href={'/'}>
                            <Image src={appleStoreWhite} className='dark:hidden w-full object-contain' alt="Download Grocery app at apple store" />
                        </Link>
                        <Link href={'/'}>
                            <Image src={appleStoreBlack} className='hidden dark:block w-full object-contain' alt="Download Grocery app at apple store" />
                        </Link>
                    </div>
                </div>

            </div>


            {/* copyright */}
            <div className="pt-5 text-center text-[10px] md:text-xs">
                @copyright - 2024 • <Link href={'/'} className="hover:underline">Grocery</Link>
            </div>


        </footer>
    );
};

export default Footer;