'use client';

import Head from 'next/head';
import React from 'react';

const PageHead = ({title}) => {
    return (
        <Head>
            <title className='capitalize'>Grocery {title == '' ? '' : '-' } {title}</title>
        </Head>
    );
};

export default PageHead;