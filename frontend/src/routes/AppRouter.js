/* Author: Ayush Shah
Subject: PRJ 666ZAA
Professor Name: Clint Macdonald */

import SignUp from '../components/signup';
import SignIn from '../components/signin';
import ForgotPassword from '../components/forgot_password';
import AdminPanelHome from '../components/admin_home';
import CustomerPanelHome from '../components/customer_home';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/" element={<SignUp/>} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/admin" element={<AdminPanelHome />} />
            <Route path="/home" element={<CustomerPanelHome />} />
         </Route>
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
