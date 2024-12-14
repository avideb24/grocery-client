import PageTitle from '@/components/shared/PageTitle/PageTitle';
import React from 'react';

const PrivacyPolicy = () => {
    return (
        <div>

            {/* page title */}
            <PageTitle title={'Privacy Policy'} />

            <h2 className='text-base md:text-lg font-bold mb-4'>Privacy Policy</h2>

            <div className='space-y-4 my-3'>

                <div>
                    <h3 className='font-bold mb-2'>Information Collection and Use</h3>
                    <p>For a better experience while using our Service, we may require you to provide us with certain personally identifiable information, including but not limited to: Name including First & Last name, email, address, phone number, postal code, demographic profile (age, gender, occupation, address, etc.), and the information about the pages on the website you visit/access, the link clicks on the website, number of times you access the pages and browsing information. The information that we request is retained on your device or on our secure servers based on the app / the website. The information collected is used for providing and improving the service. We will not use or share your information with anyone except as described in this Privacy Policy. The app does use third party services that may collect information used to identify you. The terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, which is accessible at the website, unless otherwise defined in this Privacy Policy.</p>
                </div>

                <div>
                    <h3 className='font-bold mb-2'>Children&apos;s Privacy</h3>
                    <p>These Services do not address anyone under the age of 13. We do not knowingly collect personal identifiable information from children under 13. In the case we discover that a child under 13 has provided us with personal information, we immediately delete this from our servers. If you are a parent or guardian and you are aware that your child has provided us with personal information, please contact us so that we will be able to do necessary actions.</p>
                </div>

                <div>
                    <h3 className='font-bold mb-2'>License & Site Access</h3>
                    <p>Grocery grants you limited access and use of the website/ the app and not to download or modify it or any portion of it, except with a written / electronic consent from Gorillamove. This doesn&apos;t include any resale or commercial use of the website/ the app or its contents; any collection and use of any product listings, description, or prices; any derivative use of the website/ the app or its contents; any downloading or copying or recording any form information (including any type of media, text, page layout, or form) for any purpose. The website/ the app or any portion of Gorillamove may not be reproduced, duplicate, copied, sold, resold, visited or otherwise exploited for any commercial purpose without written / electronic consent from Gorillamove. Any unauthorized use terminates the permission or license granted by Gorillamove, severe breach or disrupting behaviours may entail legal proceedings.</p>
                </div>

                <div>
                    <h3 className='font-bold mb-2'>Pricing, Quantity & Quality</h3>
                    <p>All the products listed on the website / the app will be sold at MRP unless otherwise specified. The price mentioned at time of ordering will be charged while delivery. We have made our best effort to display the true colour tone of all our products that appears on the website / the app. However, the actual colour tone you see depends on your monitor and we can&apos;t guarantee the same result over all monitors, so few of the products delivered may differ from the displayed image. We are bound to deliver the best quality items in the described quantity, if you have any issues, please contact the customer centre with the proof of evidence we will make necessary steps to resolve the issues within 48 hours of submission as replacement or refund based on customer interest. Customer & Gorillamove are only bound to enter into a legal dispute based on who is issuing an electronic or written ROFR (Right of First Refusal) with legit reasons.</p>
                </div>

                <div>
                    <h3 className='font-bold mb-2'>Cancellation</h3>
                    <p>As a customer, you have the right to cancel your order anytime up to the cut off time of the slot you have placed an order by cancelling in the website or the app calling our customer service. In case you made payment for the order, we will refund the same. Order cancellation in cut off time and at time of delivery is not entertained, if the delivery is kept delayed customers have the option to reschedule or cancel the delivery. As a Service provider, we have sole discretion to cancel any orders suspected with fraudulent transactions or any order or customers that defy the terms and conditions of using the service. For accountability we will maintain the data regarding all the negative listed transactions & customers, if needed we will be sharing the same with legal or concerned entities for further proceedings.</p>
                </div>


            </div>
            
        </div>
    );
};

export default PrivacyPolicy;