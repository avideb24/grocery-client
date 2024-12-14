import PageTitle from '@/components/shared/PageTitle/PageTitle';
import React from 'react';

const RefundPolicyPage = () => {
    return (
        <div>

            <PageTitle title={'Refund Policy'} />

            <h2 className='text-base md:text-xl font-bold mb-4'>Refund Policy</h2>

            <div className='space-y-4 py-4'>

                <div>
                    <h3 className='font-bold mb-2'>Our Refund Policy</h3>
                    <p>Our refund policy is straightforward to ensure customer satisfaction. If you are not satisfied with the products received due to defects, damages, or any other valid reasons, you may report the issue to our customer support team within 24 hours (within 6 hours for perishable products). After reviewing the claim, if it is found valid, we will initiate a full refund. The refunded amount will be credited back to the same account or payment method used for the original purchase.</p>
                </div>

                <div>
                    <h3 className='font-bold mb-2'>Replacement & Refunds</h3>
                    <p>We have a simple and easy replacement policy; our customer can always make a claim for valid reasons. We make sure we deliver the high-quality products to you, still we expect rare scenarios of dissatisfaction regarding the defects, damages, freshness, quality, quantity, pricing & packing issues of received items where customers can report the case within 24 hours to our customer support team (within 6 hours for perishable products). Since we place customers first, we assure a full refund / replacement if the customer is not satisfied with the products. In case of refund, the amount will be credited to the same account or payment made.</p>
                </div>

                <div>
                    <h3 className='font-bold mb-2'>Customer Obligations</h3>
                    <p>All shoppers have to register and login to the website/ the app for managing accounts and placing the orders on the site. You have to ensure the details provided are correct and legit to make the services and communication better. By agreeing to the terms and conditions, the users agree to receive phone calls, messages, emails, deliverables, gifts and all means of informational & promotional communication in the details provided. Customers further authorise the Company to share / disclose the information to any third party service provider or any affiliates, group of companies, their authorised agents or third party service providers. The customer can opt out the promotional communication either on the “My Account” or by contacting the customer services. Customers are bound to accept the orders placed, pay for the same and be at the delivery location to receive the same. Customers can opt for the contactless delivery with online payment. If a customer is not available at location necessary arrangements shall be made to receive the order or they must reschedule / cancel before the cut off time based on the next availability. In the event of non-delivery of order based on misinformation or unavailability at delivery time (wrong address, wrong name, unreported unavailability, call unattended), customer is bound to pay for the cost incurred by Gorillamove, including delivery charge, cost of perishable goods and other expenses upon the rescheduled delivery. By placing an order, customers agree to be bound by accepting the product with condition, quantity, and price included in the product&apos;s description.</p>
                </div>

            </div>

        </div>
    );
};

export default RefundPolicyPage;