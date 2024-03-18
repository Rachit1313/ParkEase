import { useState, useEffect, useRef } from "react";

export default function Component() {


    
    

  return (
    <div className="bg-white font-inter">
      
      <div className="flex justify-between items-center bg-white px-12 py-4 shadow-md">
        <img
          src="https://file.rendit.io/n/caJnSADVuRIw9pBQkNld.png"
          alt="ParkEase Logo"
          className="h-8"
        />
        <div className="flex space-x-5">
          <a href="#scan" className="text-blue-900 hover:underline">Scan number plate</a>
          <a href="#customer-details" className="text-blue-900 hover:underline">View customer details</a>
          <a href="#contact" className="text-blue-900 hover:underline">Contact admin</a>
          <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            My Account
          </button>
        </div>
      </div>
      
      <div className="relative bg-white px-4 sm:px-8 lg:px-12 xl:px-20 2xl:px-40">
        {/* Top bar with phone number */}
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch gap-8 mt-4 lg:mt-12">
          {/* Scan area */}
          <div className="flex-1 bg-no-repeat bg-cover rounded-lg shadow-md h-80 lg:h-96" style={{ backgroundImage: 'url(https://file.rendit.io/n/G9DuYVnoaPtULl8zNlfH.png)' }}>
            <div className="flex flex-col justify-center items-start p-8 h-full">
              
            </div>
          </div>
          {/* Customer details area */}
          <div className="flex-1 bg-white rounded-lg shadow-md h-80 lg:h-96">
              <h1 className="text-3xl font-bold text-gray-800">
                Scan the number plate
              </h1>
              <button className="mt-4 bg-blue-700 text-white text-xl font-bold py-3 px-6 rounded-lg">
                Scan now
              </button>
              <br/>
              <button className="mt-2 text-sm text-gray-500 hover:underline">
                Enter number manually
              </button>
              <br/><br/><br/>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-1xl font-semibold">Customer Details:</h2>
              <span className="bg-green-500 text-white font-semibold text-lg px-4 py-1 rounded-lg">
                $50
              </span>
            </div>
            <div className="text-sm text-blue-700">
              <div className="font-bold">
                Name: <span className="font-normal">John Watson</span>
              </div>
              <div className="font-bold">
                Booking start date: <span className="font-normal">11th Oct, 2023</span>
              </div>
              <div className="font-bold">
                Booking start time: <span className="font-normal">2:00 pm</span>
              </div>
              <div className="font-bold">
                Booking end date: <span className="font-normal">11th Oct, 2023</span>
              </div>
              <div className="font-bold">
                Booking end time: <span className="font-normal">6:00 pm</span>
              </div>
              <div className="font-bold mt-6">
                Parking slot: <span className="font-normal">A02</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between items-start lg:items-stretch gap-8 mt-4 lg:mt-12">
            <h1 className="text-4xl font-bold ml-32 mt-6 mb-6 text-center">Booking Details:</h1>
            <div className="flex flex-row gap-6 justify-center w-full items-start">
                <div className="shadow-md bg-gray-200 flex flex-col w-1/3 items-start pt-8 pb-28 px-10 rounded-lg">
                    <h2 className="text-3xl underline font-bold text-gray-600">
                        Parking Slot: A12
                    </h2>
                    <div className="text-lg text-gray-600 mt-4">
                        <p>Name: John Watson</p>
                        <p>Booking start date: 11th Oct, 2023</p>
                        <p>Booking start time: 2:00 pm</p>
                        <p>Booking end date: 11th Oct, 2023</p>
                        <p>Booking end time: 6:00 pm</p>
                        <div className="mt-4">
                            <p>Payment:</p>
                            <p>Subtotal: $50.00</p>
                            <p>Tax: $6.50</p>
                            <p>Total: $56.50</p>
                        </div>
                    </div>
                </div>
                <div className="shadow-md bg-gray-200 flex flex-col w-1/3 items-start pt-8 pb-28 px-10 rounded-lg">
                    <h2 className="text-3xl underline font-bold text-gray-600">
                        Parking Slot: B04
                    </h2>
                    <div className="text-lg text-gray-600 mt-4">
                        <p>Name: John Watson</p>
                        <p>Booking start date: 11th Oct, 2023</p>
                        <p>Booking start time: 2:00 pm</p>
                        <p>Booking end date: 11th Oct, 2023</p>
                        <p>Booking end time: 6:00 pm</p>
                        <div className="mt-4">
                            <p>Payment:</p>
                            <p>Subtotal: $50.00</p>
                            <p>Tax: $6.50</p>
                            <p>Total: $56.50</p>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="flex justify-center items-center h-screen bg-white">
      <div className="flex container max-w-6xl mx-auto p-8">
        {/* Left side image */}
        <div className="flex-1">
          <img
            src="https://file.rendit.io/n/HbaX1vKM2ftosyJtNvdp.png"
            alt="Support Representative"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Help and contact information */}
        <div className="flex-1 ml-12">
          <h1 className="text-4xl font-semibold mb-2">Need Help?</h1>
          <h2 className="text-2xl text-gray-700 mb-6">Contact Admin</h2>

          {/* Email input */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">
              Enter your email address
            </label>
            <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-200">
              {/* Email icon */}
              <img
                src="https://file.rendit.io/n/8Zz3dbISqMpprOxqOV3t.svg"
                alt="Email"
                className="mr-3 h-5 w-5"
              />
              <input
                type="email"
                id="email"
                placeholder="Enter your email address"
                className="bg-gray-200 outline-none"
              />
            </div>
          </div>

          {/* Message input */}
          <div className="mb-6">
            <label htmlFor="message" className="block text-gray-700 mb-2">
              Enter your message....
            </label>
            <textarea
              id="message"
              rows="4"
              placeholder="Enter your message...."
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            ></textarea>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white uppercase tracking-wider font-inter rounded-md"
            
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    <div className="bg-[#0044b5] w-full font-[Inter] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <img
              src="https://file.rendit.io/n/xFYDvsbQwehzsDDu9ucu.png"
              alt="Logo"
              className="mb-4"
            />
            <p className="text-[#d3d6d8] text-xs">Parking system with premium service</p>
            <div className="flex mt-4">

              <div className="bg-[url(https://file.rendit.io/n/9Wuuw8xRBVu0aGE328kW.svg)] bg-no-repeat mr-2 w-6 h-6"></div>
              <div className="bg-[url(https://file.rendit.io/n/A7phh0LDC7JhOOp20Gt1.svg)] bg-no-repeat mr-2 w-6 h-6"></div>
              <div className="bg-[url(https://file.rendit.io/n/A7phh0LDC7JhOOp20Gt1.svg)] bg-no-repeat mr-2 w-6 h-6"></div>
              <div className="bg-[url(https://file.rendit.io/n/WN3zlc7EFmXxOsQbsLKQ.svg)] bg-no-repeat w-6 h-6"></div>


            </div>
          </div>
          <div>
            <h3 className="font-bold">My Account</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-[#d3d6d8] text-xs">View Profile</li>
              <li className="text-[#d3d6d8] text-xs">Saved Payment Methods</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-[#d3d6d8] text-xs">About</li>
              <li className="text-[#d3d6d8] text-xs">Support and Ticketing</li>
              <li className="text-[#d3d6d8] text-xs">Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Information</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-[#d3d6d8] text-xs">Booking</li>
              <li className="text-[#d3d6d8] text-xs">History</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="border-t border-white border-opacity-25 mt-8 pt-4 text-xs text-[#d3d6d8] flex flex-col sm:flex-row justify-between items-center">
            <div>
              <span className="inline-block align-middle mr-2">
                <img src="https://file.rendit.io/n/Lg4lUAh5EQOZNQZYjLY4.svg" alt="Location" className="w-4" />
              </span>
              1 Young st, Toronto, ON, M5E 1E5
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-block align-middle mr-2">
                <img src="https://file.rendit.io/n/ev2ST39VZhzWk6Wra3rI.svg" alt="Phone" className="w-4" />
              </span>
              123-456-7890
            </div>
            <div className="mt-4 sm:mt-0 mb-4 sm:mb-0">
              <span className="inline-block align-middle mr-2">
                <img src="https://file.rendit.io/n/88IORc8ykEumvEGdhRHX.svg" alt="Email" className="w-4" />
              </span>
              info@parkease.com
            </div>
          </div>
          <div className="text-center py-4 text-[#d3d6d8] text-xs font-light">
            Privacy Policy | Terms & Conditions | Do Not Share My Info
          </div>
        </div>
      </div>
    </div>
  );
}

