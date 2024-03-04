/*
Name: Ayush Shah
Student ID: 161823216
Course: PRJ666 ZAA
Professor: Clint MacDonald
*/

import { useState, useEffect, useRef } from "react";
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';



export default function Component() {
  const [bookingHistory, setBookingHistory] = useState([]);

  // Helper function to calculate time remaining
  const calculateTimeRemaining = (checkoutTime) => {
    const currentTime = new Date();
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
          <li className="mt-2">About Us</li>
          <li className="mt-2">
            <button className="rounded-lg bg-blue-800 text-white px-6 py-1.5 text-lg transition duration-300 ease-in-out hover:bg-blue-900">
              My Account
            </button>
          </li>
        </ul>

      </div>

      <div className="bg-[#001840] flex flex-col items-center justify-center font-poppins text-white">
        <div className="max-w-5xl mx-auto p-8">
          <h1 className="text-5xl font-bold mb-4">PARKEASE</h1>

          {bookingHistory.length > 0 ? (
            <div className="space-y-4">
              {bookingHistory.map((booking) => (
                <div key={booking.BookingID} className="bg-white shadow-lg rounded-lg overflow-hidden mb-4">
                  <div className="p-8">
                    <h2 className="text-3xl font-bold text-blue-700 mb-6">BOOKING INFORMATION</h2>
                    <div>
                      <p className="text-xl text-gray-700">Parking Slot: {booking.SpotID}</p>
                      <p className="text-xl text-gray-700">Name: {localStorage.getItem("fullName")}</p>
                      <p className="text-xl text-gray-700">
                        Booking start date: {new Date(booking.CheckInTime).toLocaleDateString()}<br />
                        Booking start time: {new Date(booking.CheckInTime).toLocaleTimeString()}
                      </p>
                      <p className="text-xl text-gray-700">
                        Booking end date: {new Date(booking.CheckOutTime).toLocaleDateString()}<br />
                        Booking end time: {new Date(booking.CheckOutTime).toLocaleTimeString()}
                      </p>
                      <p className="text-xl text-gray-700">Garage: {booking.GarageID}</p>
                      <p className="text-2xl text-gray-700 underline hover:bg-gray-200 p-2">
                        Time Remaining: {calculateTimeRemaining(new Date(booking.CheckOutTime))}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p>No booking history found.</p>
          )}
        </div>

      </div>

    </div>
  );
}
