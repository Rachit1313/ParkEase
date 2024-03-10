import { useState, useEffect, useRef } from "react";
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';


export default function Component() {
  const [bookingHistory, setBookingHistory] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleAccountClick = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };


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

    useEffect(() => {
      document.title = "History";
      const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
        favicon.type = 'image/png';
        favicon.rel = 'icon';
        favicon.href = "https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png";
        document.head.appendChild(favicon);
    }, []);

    const handleManageVehicles = () => {
        window.location.href = '/vehicles'; 
    };
  
  
  // Helper function to calculate time remaining
  const calculateTimeRemaining = (checkoutTime, checkInTime) => {
    const currentTime = new Date();
    
    if (checkoutTime <= currentTime) {
      return 'Expired';
    }

    if (checkInTime > currentTime) {
      return 'Not started';
    }

    const remainingTimeMillis = checkoutTime - currentTime;

    const hours = Math.floor(remainingTimeMillis / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTimeMillis % (1000 * 60 * 60)) / (1000 * 60));

    return `${hours}hr ${minutes}min`;
  };

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/booking-history/${localStorage.getItem("customerId")}`);

        if (response.ok) {
          const data = await response.json();
          setBookingHistory(data);
        } else {
          alert("Failed to fetch booking history");
        }
      } catch (error) {
        alert("Error during booking history fetch:", error);
      }
    };

    fetchBookingHistory();
  }, []);

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
          <li className="mt-2 relative">
            <span className="font-bold text-blue-800">History</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800"></span>
          </li>
          <li className="mt-2">
            <Link to="/about">About Us</Link>
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

      <div className="bg-[#001840] flex flex-col items-center justify-center font-poppins text-white">
  <div className="max-w-full mx-auto p-12">
    <h1 className="text-5xl font-bold mb-4">Your PARKEASE History</h1>

    {bookingHistory.length > 0 ? (
      <div className="space-y-4">
        <table className="w-full table-auto bg-white text-black shadow-md rounded-md overflow-hidden">
          <thead>
            <tr className="bg-[#001840] text-white">
              <th className="py-2 px-4 border-b border-[#001840]">Parking Slot</th>
              <th className="py-2 px-4 border-b border-[#001840]">Name</th>
              <th className="py-2 px-4 border-b border-[#001840]">Booking Start</th>
              <th className="py-2 px-4 border-b border-[#001840]">Booking End</th>
              <th className="py-2 px-4 border-b border-[#001840]">Garage</th>
              <th className="py-2 px-4 border-b border-[#001840]">Time Remaining</th>
            </tr>
          </thead>
          <tbody>
            {bookingHistory.map((booking, index) => (
              <tr key={booking.BookingID} className={`bg-white shadow-lg rounded-lg overflow-hidden ${index % 2 === 0 ? 'even-row' : 'odd-row'}`}>
                <td className="py-2 px-4 border-b border-[#001840]">{booking.SpotID}</td>
                <td className="py-2 px-4 border-b border-[#001840]">{localStorage.getItem("fullName")}</td>
                <td className="py-2 px-4 border-b border-[#001840]">
                  {new Date(booking.CheckInTime).toLocaleDateString()} <br />
                  {new Date(booking.CheckInTime).toLocaleTimeString()}
                </td>
                <td className="py-2 px-4 border-b border-[#001840]">
                  {new Date(booking.CheckOutTime).toLocaleDateString()} <br />
                  {new Date(booking.CheckOutTime).toLocaleTimeString()}
                </td>
                <td className="py-2 px-4 border-b border-[#001840]">{booking.GarageID}</td>
                <td className="py-2 px-4 border-b border-[#001840]">
                  {calculateTimeRemaining(new Date(booking.CheckOutTime), new Date(booking.CheckInTime))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <p>No booking history found.</p>
    )}
  </div>
</div>


    </div>
  );
}
