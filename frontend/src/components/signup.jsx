import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Notification from "./notification";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [fullName, setFullName] = useState("");
  const navigate = useNavigate();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [notification, setNotification] = useState(null);

    const showNotification = (message, type) => {
        console.log(message)
        setNotification({ message, type }); 
        setTimeout(() => setNotification(null), 3000);
    };
  const handleTogglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  useEffect(() => {
    document.title = "Sign Up";
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
      favicon.type = 'image/png';
      favicon.rel = 'icon';
      favicon.href = "https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png";
      document.head.appendChild(favicon);
  }, []);

  const handleSignUp = async () => {

    if (!email.trim()) {
      showNotification("Please enter your email address", "failure");
      return;
    }

    if (!phone.trim()) {
      showNotification("Please enter your phone number", "failure");
      return;
    }

    if (!password.trim()) {
      showNotification("Please enter a password", "failure");
      return;
    }

    if (password != password2) {
      showNotification("Passwords don't match. Please re-enter your password", "failure");
      return;
    }


    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, contactNumber: phone, fullName }),
      });

      if (response.status == 201) {
        showNotification("Registration successful", "failure");
        navigate("/");
      } else {
        showNotification("Registration failed", "failure");
      }
    } catch (error) {
      showNotification("Error during registration", error);
    }
  };


  return (
    <div className="flex flex-col h-screen bg-white">

      <div className="p-4 flex justify-between items-center bg-white border-b shadow-sm">
        <img src="https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png" alt="Logo" className="h-10" />
        <button className="p-2 rounded-full hover:bg-gray-100">
          <img src="https://file.rendit.io/n/furP2W9JLemf4YLkg3jt.svg" alt="Help" className="h-6 w-6" />
        </button>
      </div>
      <div className="flex-grow flex">
        <div className="w-1/2 p-8">
          <img src="https://file.rendit.io/n/hZjEjsXRitzJA6WdsUe9.png" alt="Feature illustration" className="max-h-full" />
        </div>
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Let's Get Started <img src="https://file.rendit.io/n/17VKXlxVIZgayTIa85ea.png" alt="Shuttle" className="inline h-6 w-6" />
            </h1>
            <p className="text-gray-600">Sign up for your account</p>
          </div>
          <div className="space-y-6">
            <div className="flex items-center bg-gray-200 px-4 py-3 rounded-full">
              <img src="https://file.rendit.io/n/n95FgV0wpegyb6Rdz4zV.svg" alt="Email Icon" className="h-6 w-6" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent outline-none w-full ml-4 placeholder-gray-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-gray-200 px-4 py-3 rounded-full">
              <img src="https://file.rendit.io/n/wSDw5pHy4LigWAleyCzf.svg" alt="Phone Icon" className="h-6 w-6" />
              <input
                type="tel"
                placeholder="Enter your phone number"
                className="bg-transparent outline-none w-full ml-4 placeholder-gray-500"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="flex items-center bg-gray-200 px-4 py-3 rounded-full">
              <img src="https://file.rendit.io/n/Ju9AaOy8UtgiWriNceM8.svg" alt="User Icon" className="h-6 w-6" />
              <input
                type="text"
                placeholder="Enter your full name"
                className="bg-transparent outline-none w-full ml-4 placeholder-gray-500"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>




            <div className="flex items-center bg-gray-200 px-4 py-3 rounded-full">
              <img
                src="https://file.rendit.io/n/Ju9AaOy8UtgiWriNceM8.svg"
                alt="Password Icon"
                className="h-6 w-6"
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={"Enter your password"}
                className="bg-transparent outline-none w-full ml-4 placeholder-gray-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={
                  isPasswordVisible
                    ? "https://file.rendit.io/n/ikHzgSwQg6BhPIGl8uJj.svg"
                    : "https://file.rendit.io/n/ikHzgSwQg6BhPIGl8uJj.svg" 
                }
                alt="View Password Icon"
                className="h-6 w-6 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              />
            </div>

            <div className="flex items-center bg-gray-200 px-4 py-3 rounded-full">
              <img
                src="https://file.rendit.io/n/Ju9AaOy8UtgiWriNceM8.svg"
                alt="Password Icon"
                className="h-6 w-6"
              />
              <input
                type={isPasswordVisible ? "text" : "password"}
                placeholder={"Enter your password"}
                className="bg-transparent outline-none w-full ml-4 placeholder-gray-500"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
              <img
                src={
                  isPasswordVisible
                    ? "https://file.rendit.io/n/ikHzgSwQg6BhPIGl8uJj.svg"
                    : "https://file.rendit.io/n/ikHzgSwQg6BhPIGl8uJj.svg" 
                }
                alt="View Password Icon"
                className="h-6 w-6 cursor-pointer"
                onClick={handleTogglePasswordVisibility}
              />
            </div>

          </div>
          <button
            onClick={handleSignUp}
            className="w-full bg-blue-600 text-white py-4 mt-10 rounded-full font-semibold shadow-lg transition duration-300 hover:bg-blue-700"
          >
            Sign Up
          </button>

          <p className="text-center text-xs text-gray-600 mt-4">
            By continuing, you agree to our <span className="font-semibold">Terms & Conditions</span> and{" "}
            <span className="font-semibold">Privacy Policy</span>
          </p>

          <div className="text-center text-xs mt-14">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-bold cursor-pointer">
              Login
            </Link>
          </div>
        </div>
      </div>
      {notification && <Notification message={notification.message} type={notification.type} />}
    
    </div>
  );
};

export default SignUp;
