import { useState, useEffect, useRef } from "react";
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function Component() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleAccountClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };

  useEffect(() => {
    document.title = "About ParkEase";
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/png';
    favicon.rel = 'icon';
    favicon.href = "https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png";
    document.head.appendChild(favicon);
  }, []);

  const handleLogout = async () => {
    try {
      Cookies.remove('token');

      localStorage.removeItem('userType');
      localStorage.removeItem('customerId');
      localStorage.removeItem('email');
      localStorage.removeItem('contactNumber');
      localStorage.removeItem('fullName');


      window.location.href = '/';

    } catch (error) {
      console.error('Error during logout:', error);

    }
  };


  const handleManageVehicles = () => {
    window.location.href = '/vehicles';
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      <div className="p-4 flex justify-between items-center bg-white border-b shadow-sm">
        <img
          src="https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png"
          alt="Logo"
          className="h-10"
        />
        <ul className="flex justify-end gap-16">
          <li className="mt-2">
            <Link to="/home">Home</Link>
          </li>
          <li className="mt-2 ">
            <span className="font-bold text-blue-800">About</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800"></span>
          </li>
          <li className="mt-2">
            <Link to="/ticket">Ticket</Link>
          </li>
          <li className="mt-2">
            <Link to="/history">History</Link>
          </li>
          <li className="mt-2">
            <button
              className="rounded-lg bg-blue-800 text-white px-6 py-1.5 text-lg transition duration-300 ease-in-out hover:bg-blue-900"
              onClick={handleAccountClick}
            >
              My Account
            </button>
            {isDropdownOpen && ( // Conditionally render dropdown items
              <ul className="absolute right-0 mt-2 shadow-md rounded-md bg-white overflow-hidden">
                <li className="hover:bg-gray-100 px-4 py-2">
                  <button onClick={handleLogout}>Logout</button>
                </li>
                <li className="hover:bg-gray-100 px-4 py-2">
                  <button onClick={handleManageVehicles}>Manage Vehicles</button>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>

      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-4">About ParkEase</h1>

        <p>
          Welcome to ParkEase, where convenience meets efficient parking solutions!
        </p>

        <h2 className="text-3xl font-bold mt-6 mb-4">Our Vision</h2>
        <p>
          At ParkEase, we envision a world where finding parking is stress-free, quick, and secure. We strive to transform the way people approach parking, making it as simple as a tap on your device.
        </p>

        <h2 className="text-3xl font-bold mt-6 mb-4">Who We Are</h2>
        <p>
          ParkEase is not just a parking application; it's a team of passionate individuals dedicated to simplifying the parking experience. Established in [Year], our journey began with a simple yet profound idea – to make parking hassle-free and enjoyable.
        </p>

        <h2 className="text-3xl font-bold mt-6 mb-4">What We Do</h2>
        <p>
          ParkEase is your go-to solution for all your parking needs. Whether you're a driver searching for a convenient parking spot or a parking garage owner looking to optimize operations, we've got you covered.
        </p>

        <h3 className="text-2xl font-bold mt-4 mb-2">For Drivers</h3>
        <ul className="list-disc ml-8">
          <li>Effortless Parking: Say goodbye to circling the block. With ParkEase, find parking spots effortlessly based on your location.</li>
          <li>Secure Booking: Book your parking spot in advance, pay online, and receive instant confirmations.</li>
          <li>Real-Time Updates: Stay informed with real-time updates on available parking spots and your parking duration.</li>
        </ul>

        <h3 className="text-2xl font-bold mt-4 mb-2">For Garage Owners</h3>
        <ul className="list-disc ml-8">
          <li>Streamlined Operations: Manage your parking garage efficiently with our user-friendly admin panel.</li>
          <li>Booking Verification: Ensure smooth operations by verifying bookings and managing occupancy seamlessly.</li>
          <li>Payment Integration: Receive secure payments online, making transactions quick and hassle-free.</li>
        </ul>

        <h2 className="text-3xl font-bold mt-6 mb-4">Our Commitment</h2>
        <p>
          ParkEase is committed to providing a reliable, secure, and innovative parking solution. We continually evolve our platform to meet the dynamic needs of both drivers and parking garage owners.
        </p>

        <p className="mt-6">
          Thank you for choosing ParkEase – making parking a breeze!
        </p>
      </div>
    </div>
  );
}
