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
