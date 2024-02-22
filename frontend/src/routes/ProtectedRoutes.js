/* Author: Ayush Shah
Subject: PRJ 666ZAA
Professor Name: Clint MacDonald */

// ProtectedRoutes.js
import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import useAuthCheck from '../auth/useAuthCheck'; 

const ProtectedRoutes = () => {
    const handleAuth = useAuthCheck();

    useEffect(() => {
      handleAuth();
    }, []);
  
    return <Outlet />;
};

export default ProtectedRoutes;
