import React, { useState, useContext, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, fetchUserData, logout } from "../../firebase";

import 'react-toastify/dist/ReactToastify.css';

import CookiePolicy from "../modals/CookiePolicy";
import PrivacyPolicy from "../modals/PrivacyPolicy";
import UserAgreement from "../modals/UserAgreement";

import UserContext from "../../context/UserContext";

export default function MainLayout({children}){
    const [userData, setUserData] = useState({})
    const [user, loading, error] = useAuthState(auth);

    async function fetchData(uid){
        let res = await fetchUserData(uid);
        setUserData(res);
        res.uid && localStorage.setItem('userData', JSON.stringify(res))
    }

    useEffect(() => {
        let userStoredData = localStorage.getItem('userData');
        if(userStoredData?.uid) setUserData(JSON.parse(userStoredData));
        if (loading) return;
        if (!user) return;
        
        fetchData(user.uid);
        
    }, [user, loading]);

    return (
        <div className="bg-white">
            <UserContext.Provider value={userData}>
                {children}
            </UserContext.Provider>
            
            <ToastContainer />
            <CookiePolicy />
            <PrivacyPolicy />
            <UserAgreement />
        </div>
    )
}