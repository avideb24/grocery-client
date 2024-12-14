'use client';

import AxiosPublic from '@/libs/Axios/AxiosPublic';
import React, { createContext, useContext, useEffect, useState } from 'react';


const UserContext = createContext(null);

export const useUser = () => useContext(UserContext);


const UserProvider = ({ children }) => {

    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);
    const axiosPublic = AxiosPublic();


    // initial user load
    useEffect(() => {

        const isExistingId = localStorage.getItem('userId');

        if (isExistingId) {

            setUserId(isExistingId);

            const fetchUser = async () => {
                const res = await axiosPublic.get(`/api/user/user/${isExistingId}`);
                setUser(res.data.data);
                setUserLoading(false);
            }

            fetchUser();
        }
        else {
            setUserLoading(false);
        }

    }, [axiosPublic]);


    const values = { userId, setUserId, user, setUser, userLoading, setUserLoading };


    return (
        <UserContext.Provider value={values}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;
