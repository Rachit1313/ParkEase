import SignUp from '../components/signup';
import SignIn from '../components/signin';
import ForgotPassword from '../components/forgot_password';
import AdminPanelHome from '../components/admin_home';
import CustomerPanelHome from '../components/customer_home';
import BookingPage from '../components/history';
import PaymentPage from '../components/payment';
import AboutPage from '../components/about';
import SavedVehicles from '../components/saved_vehicles'
import Notification from '../components/notification';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProtectedRoutes from './ProtectedRoutes';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
         
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          
          <Route path="/signup" element={<SignUp/>} />
          <Route path="/about" element={<AboutPage/>} /> 
          <Route path="/vehicles" element={<SavedVehicles/>} />
          
           
          <Route element={<ProtectedRoutes />}>
            <Route path="/" element={<SignIn/>} />
           
            <Route path="/admin" element={<AdminPanelHome />} />
            
            <Route path="/home" element={<CustomerPanelHome />} />
            
            <Route path="/history" element={<BookingPage />} />

            <Route path="/payment" element={<PaymentPage />} />
           
         </Route>
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;