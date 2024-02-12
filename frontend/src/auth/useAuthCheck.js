/* Author: Ayush Shah
Subject: PRJ 666ZAA
Professor Name: Clint Macdonald */
// useAuthCheck.js
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuthCheck = () => {
    const navigate = useNavigate();

    const isLoggedIn = Cookies.get('token') !== undefined;
    const userType = localStorage.getItem('userType');
  
    const handleAuth = () => {
      if (!isLoggedIn) {
        navigate('/signin');
      } else if (userType === 'Customer' && window.location.pathname.startsWith('/admin')) {
        navigate('/home');
      } else if (userType === 'Admin' && window.location.pathname.startsWith('/home')) {
        navigate('/admin');
      }
    };
  
    return handleAuth;
};

export default useAuthCheck;
