import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const useAuthCheck = () => {
  
  const navigate = useNavigate();

  const isLoggedIn = Cookies.get('token') !== undefined;
  const userType = localStorage.getItem('userType');

  const handleAuth = () => {
    if (isLoggedIn) {
      switch (userType) {
        case 'Customer':
          if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/invigilator')) {
            navigate('/home'); // Redirect customers away from admin or invigilator pages
          }
          break;
        case 'Admin':
          if (window.location.pathname.startsWith('/home') || window.location.pathname.startsWith('/invigilator')) {
            navigate('/admin/dashboard'); // Redirect admins away from customer or invigilator pages
          }
          break;
        case 'Invigilator':
          if (window.location.pathname.startsWith('/admin') || window.location.pathname.startsWith('/home')) {
            navigate('/invigilator/home'); // Redirect invigilators away from admin or customer pages
          }
          break;
        default:
          break;
      }
    } else {
      // If not logged in at all, navigate to the login page
      navigate('/');
    }
  };

  return handleAuth;
};

export default useAuthCheck;

