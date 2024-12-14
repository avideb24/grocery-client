import PageTitle from '@/components/shared/PageTitle/PageTitle';
import React from 'react';

const Accordian = ({ question, answer }) => (
    <div className="collapse collapse-plus border border-slate-300">
        <input type="radio" name="my-accordion-3" defaultChecked />
        <div className="collapse-title text-xl font-medium">{question}</div>
        <div className="collapse-content">
            <p>{answer}</p>
        </div>
    </div>
)

const FaqPage = () => {
    return (
        <div>

            {/* page title */}
            <PageTitle title={'FAQ'} />

            <h2 className='text-base md:text-xl font-bold mb-4'>FAQ - Frequently Asked Questions</h2>

            {/* accordian */}
            <div className='bg-transparent space-y-4 md:px-10 my-5'>

                <Accordian
                    question={'How can I get customer support?'}
                    answer={'Our customer service team is available 24/7. They can be reached at +8809610977777 or via email at support@gorillamove.com'}
                />

                <Accordian
                    question={'Can I order over the phone?'}
                    answer={'Yes, 24/7! In order to order at Gorillamove via phone, please call at +8809610977777. Our customer support agents will ensure you receive your desired order right on time.'}
                />

                <Accordian
                    question={'How do you deliver?'}
                    answer={'We have a team of professionally trained delivery agents to ensure the best possible service to our customers.'}
                />

                <Accordian
                    question={'What payment methods do you accept?'}
                    answer={'We accept all major credit and debit cards, mobile banking, and cash on delivery.'}
                />

                <Accordian
                    question={'What is your return policy?'}
                    answer={'You can return any product within 7 days of receiving it. Please ensure the product is in its original condition and packaging.'}
                />

                <Accordian
                    question={'How do I cancel my order?'}
                    answer={'You can cancel your order within 24 hours of placing it by contacting our customer support team.'}
                />

                <Accordian
                    question={'How can I apply a discount code?'}
                    answer={'You can apply a discount code during the checkout process. Enter the code in the designated field and click "Apply".'}
                />

            </div>

        </div>
    );
};

export default FaqPage;
