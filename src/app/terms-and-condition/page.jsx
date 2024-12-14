import PageTitle from '@/components/shared/PageTitle/PageTitle';
import React from 'react';

const termAndConditionPage = () => {
    return (
        <div>

            {/* page title */}
            <PageTitle title={'Terms And Condition'} />

            <h2 className='text-base md:text-xl font-bold border-b border-b-slate-300 mb-5 pb-2'>Terms & Condition</h2>

            <div className='space-y-5 mt-4'>

                <div className='font-bold'>
                    <h2 className='text-lg md:text-4xl pb-2'>Hello!👋</h2>
                    <p className='text-sm md:text-base'>Welcome to Grocery Mart</p>
                </div>

                <p>Grocery Mart ("Grocery") provides access to the Grocery.com website, the mobile application, or any other media ("Website") subject to the terms and conditions ("Terms") outlined on this page. By using the Website, you, as a registered or guest user who meets the eligibility criteria stated here ("User"), agree to adhere to these Terms. Please read them carefully. Your continued use of the Website signifies your acceptance of these Terms. If you do not agree to these Terms, you should not use the Website or our services.</p>

                <p>By accepting these Terms, you also agree to follow Grocery Policies (including but not limited to the Privacy Policy available at [Privacy Policy Link]) as updated from time to time.</p>

                <p>In these Terms, references to "you" and "User" refer to the end-user/customer accessing the Website and using the services provided through the Website. References to "Website," "Grocery," "Grocery.com," "we," "us," and "our" refer to Grocery Limited.</p>

                <p>The content herein constitutes an electronic record in terms of the Information & Communication Technology Act, 2006 and its applicable rules and amendments. Therefore, this document does not require any physical or digital signatures and constitutes a valid and binding agreement between the Website and the User.</p>

                <p>The Website is managed by Grocery Limited, a company registered under the laws of Bangladesh, with its registered office at [Your Registered Office Address]. All references to the Website in these Terms are inclusive of this entity.</p>

                <p>The Website may contain links to other websites that are not operated by Grocery. Grocery has no control over these linked sites and assumes no responsibility for them or any loss or damage arising from your use of them. Your use of the linked sites is subject to the terms and conditions contained within each respective site.</p>

                <p>These Terms will remain in effect until terminated by either you or Grocery as outlined below.</p>

                <p>We reserve the right to modify these Terms at any time. Changes will become effective when posted on the Website. By continuing to use the Website after any changes are posted, you accept the Terms as modified.</p>

                <p> Your agreement with Grocery can be terminated by (i) ceasing to access the Website; or (ii) closing your account, if such an option is available to you.</p>

            </div>

        </div>
    );
};

export default termAndConditionPage;