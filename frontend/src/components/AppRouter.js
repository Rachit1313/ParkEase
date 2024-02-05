import SignUp from './signup';
import SignIn from './signin';
import ForgotPassword from './forgot_password';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const AppRouter = () => {
    return (
      <Router>
        <Routes>
          <Route path="/signin" element={<SignIn/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
          <Route path="/" element={<SignUp/>} />
        </Routes>
      </Router>
    );
  };
  
  export default AppRouter;