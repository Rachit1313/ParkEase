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
import Ticketing from '../components/ticketing';
import Support from '../components/customer_support';
import InvigilatorPanelHome from '../components/invigilator_homepage';
import AdminDashboard from '../components/admin_dashboard';
import CustomerDetails from '../components/customer_details';
import DisplayCustomers from '../components/display_customers';
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
          <Route path="/ticket" element={<Ticketing/>} />
          <Route path="/support" element={<Support/>} /> 
          <Route path="/invigilator/home" element={<InvigilatorPanelHome/>} /> 
          
          <Route element={<ProtectedRoutes />}>

            <Route path="/" element={<SignIn/>} />
           
            <Route path="/admin" element={<AdminPanelHome />} />
            
            <Route path="/home" element={<CustomerPanelHome />} />
            
            <Route path="/history" element={<BookingPage />} />

            <Route path="/payment" element={<PaymentPage />} />

            <Route path="/admin/dashboard" element={<AdminDashboard/>} />

            <Route path="/admin/customer-details/:customerId" element={<CustomerDetails/>}/> 
          
            <Route path="/admin/all-customers" element={<DisplayCustomers/>}/>
           
         </Route>
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;