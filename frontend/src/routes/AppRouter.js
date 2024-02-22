/* Author: Ayush Shah
Subject: PRJ 666ZAA
Professor Name: Clint MacDonald */

import SignUp from '../components/signup';
import SignIn from '../components/signin';
import ForgotPassword from '../components/forgot_password';
import AdminPanelHome from '../components/admin_home';
import CustomerPanelHome from '../components/customer_home';
import BookingPage from '../components/booking';
import PaymentPage from '../components/payment';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
         
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          
          <Route path="/signup" element={<SignUp/>} />
          
          
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<SignIn/>} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/home" element={<CustomerPanelHome />} />
            <Route path="/admin" element={<AdminPanelHome />} />
           
         </Route>
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;
  
  export default AppRouter;
