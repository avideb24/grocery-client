'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';

const AdminDashboard = () => {

    const navigate = useRouter();

    const admin = false;

    // admin checking fn
    useEffect(() => {
        if(!admin){
            navigate.push('/')
        }
    },[admin, navigate])


    return (
        <div>
            admin dashboard
        </div>
    );
};

export default AdminDashboard;