import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Notification from "./notification";

export default function Component() {
  
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);

    const showNotification = (message, type) => {
        console.log(message)
        setNotification({ message, type }); 
        setTimeout(() => setNotification(null), 3000);
    };
  const handleResetPassword = async () => {
    
    if (!email.trim()) {
      alert("Please enter a valid email address");
      return;
    }
  
    // Add a email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("Please enter a valid email address");
      return;
    }
    
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "forgotPassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("New password sent to your email. Please sign-in again.");
        navigate("/signin");
      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
    <div className="p-4 flex justify-between items-center bg-white border-b shadow-sm">
        <img
            src="https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png"
            alt="Logo"
            className="h-10"
        />
        <button className="p-2 rounded-full hover:bg-gray-100">
            <img
                src="https://file.rendit.io/n/furP2W9JLemf4YLkg3jt.svg"
                alt="Help"
                className="h-6 w-6"
            />
        </button>
    </div>
    
    <div className="flex-grow flex">
        <div className="w-1/2 p-8">
            <img
                src="https://file.rendit.io/n/aP5vLhEjfFfqYSMKXZvU.png"
                alt="Feature illustration"
                className="max-h-full"
            />
        </div>
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Reset Password</h1>
          <p className="mb-6 text-sm text-gray-600">
            Enter your email to reset your password
          </p>
          <div className="flex items-center bg-gray-200 p-3 rounded-lg mb-6">
            <img
              src="https://file.rendit.io/n/c6svcqmwo72766IxzEaI.svg"
              alt="Email Icon"
              className="w-5 h-5 mr-2"
            />
            <input
              type="email"
              placeholder="Enter your registered email"
              className="bg-transparent w-full focus:outline-none text-sm text-gray-600 placeholder-gray-400"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button 
           onClick={handleResetPassword}
           className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg hover:bg-blue-700 transition-colors mb-2">
            Reset password
          </button>
          <a
            href="/signin"
            className="text-xs text-blue-600 hover:underline inline-block"
          >
            Back to Login
          </a>
        </div>
    </div>
    {notification && <Notification message={notification.message} type={notification.type} />}
    
</div>  
  );
}
