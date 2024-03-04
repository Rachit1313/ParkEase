/*
Name: Raghav Malhotra
Student ID: 153547211
Course: PRJ666 ZAA
Professor: Clint MacDonald
*/

import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignIn = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("userType", data.userType);
        Cookies.set('token', data.token, { expires: 1 }); // Expires after 1 day
      
        // Store userDetails separately
        localStorage.setItem("customerId", data.userDetails.CustomerID);
        localStorage.setItem("email", data.userDetails.Email);
        localStorage.setItem("contactNumber", data.userDetails.ContactNumber);
        localStorage.setItem("fullName", data.userDetails.FullName);

        alert("Login Successfull")
        if (data.userType === "Customer") {
          navigate("/home");
        } else if (data.userType === "Admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        alert("Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
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
          <img src="https://file.rendit.io/n/44XEtnNV5rXLLoY1L0z3.png" alt="Feature illustration" className="max-h-full" />
        </div>
        <div className="w-1/2 p-8 bg-white flex flex-col justify-center shadow-xl">
          <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
          <p className="mb-8 text-gray-600">Log in to your account</p>
          <div className="space-y-4 mb-4">
            <div className="bg-gray-100 p-2 flex items-center rounded-md">
              <img src="https://file.rendit.io/n/c6svcqmwo72766IxzEaI.svg" alt="Email" className="h-6 w-6" />
              <input
                type="email"
                placeholder="Enter your email address"
                className="bg-transparent flex-1 p-2 text-sm outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="bg-gray-100 p-2 flex items-center rounded-md">
              <img src="https://file.rendit.io/n/iB9EiiaEf7FeyQnfKfQq.svg" alt="Password" className="h-6 w-6" />
              <input
                type="password"
                placeholder="Enter your password"
                className="bg-transparent flex-1 p-2 text-sm outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img src="https://file.rendit.io/n/Usxun2AAYCbs4iyMnAIN.svg" alt="Visibility" className="h-6 w-6" />
            </div>
          </div>
          <div className="flex justify-between items-center mb-4">
            <label className="flex items-center text-sm">
              <input type="checkbox" className="mr-2" />
              Remember me
            </label>
            <Link to="/forgot-password" className="text-sm text-blue-500 hover:underline">
              Forgot your password?
            </Link>
          </div>
          <button
            onClick={handleSignIn}
            className="bg-blue-500 text-white text-xl py-2 rounded-md hover:bg-blue-600 mb-2"
          >
            Sign In
          </button>
          <p className="text-xs text-center">
            By continuing you agree to our
            <a href="#" className="font-bold hover:underline">
              {" "}
              Terms & Conditions{" "}
            </a>
            and
            <a href="#" className="font-bold hover:underline">
              {" "}
              Privacy Policy
            </a>
            .
          </p>
          <div className="text-sm text-center mt-4">
            Don't have an account?{" "}
            <Link to="/" className="font-bold text-blue-500 hover:underline">
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
