// useAuthCheck.js
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const useAuthCheck = () => {
    const navigate = useNavigate();

    const isLoggedIn = Cookies.get('token') !== undefined;
    const userType = localStorage.getItem('userType');
  
    const handleAuth = () => {
      if (isLoggedIn && userType === 'Customer') {
        // Redirect to /home if the user is already logged in
        navigate('/home');
      }
      else if (!isLoggedIn) {
        navigate('/');
      } else if (userType === 'Customer' && window.location.pathname.startsWith('/admin')) {
        navigate('/home');
      } else if (userType === 'Admin' && window.location.pathname.startsWith('/home')) {
        navigate('/admin/dashboard');
      }
    };
  
    return handleAuth;
};

export default useAuthCheck;
