/* Author: Ayush Shah
Subject: PRJ 666ZAA
Professor Name: Clint MacDonald */

import { useState, useEffect, useRef } from "react";
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';


function FeatureSection({ title, description, imgSrc }) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <img src={imgSrc} alt={title} className="mb-4 h-20" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
}

export default function Component() {
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
            <span className="font-bold text-blue-800">Booking</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800"></span>
          </li>
          <li className="mt-2">History</li>
          <li className="mt-2">About Us</li>
          <li className="mt-2">
            <button className="rounded-lg bg-blue-800 text-white px-6 py-1.5 text-lg transition duration-300 ease-in-out hover:bg-blue-900">
              My Account
            </button>
          </li>
        </ul>

      </div>


      <div className="bg-[#001840] min-h-screen flex flex-col items-center justify-center font-poppins text-white">
      <div className="max-w-5xl mx-auto p-8">
        <h1 className="text-5xl font-bold mb-4">Welcome to PARKEASE</h1>
        <p className="text-lg mb-12">
          "Your hassle-free parking companion. Find, reserve, and enjoy secure
          parking with just a few clicks - it's parking made easy for you!"
        </p>
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-8">
           
              
            <div className="flex flex-col gap-16 w-full h-56 font-poppins items-start">
            <div className="flex flex-col gap-12 w-full h-32 items-start">
                <div className="text-2xl font-bold text-[#0044b5] ml-[309px]">BOOKING</div>
                <div className="flex flex-row gap-16 w-full items-start">
                    <div className="text-xs font-medium text-white bg-[#111111] mt-2 w-2/7 h-8 pt-2 px-2 rounded-sm">
                        RESERVE PARKING
                    </div>
                    <div className="flex flex-row gap-5 w-3/4 items-start">
                        <div className="text-xs font-medium text-white bg-[#111111] mt-2 w-2/7 h-8 pt-2 px-2 rounded-sm">
                            ADVANCE RESERVATION
                        </div>
                        <div className="text-xs font-medium text-white bg-[#111111] w-1/5 h-8 mt-2 mr-px pt-2 px-2 rounded-sm">
                            09.00 AM
                        </div>
                        <div className="flex flex-row gap-4 w-1/2 items-start">
                            <div className="text-xs font-medium text-white bg-[#111111] mt-2 w-2/5 h-8 pt-2 px-2 rounded-sm">
                                RECURRING
                            </div>
                            <button className="relative w-3/5 pt-2 pl-10 pr-12">
                                <div className="w-full h-10 bg-[#0044b5] absolute top-0 left-0 rounded-lg" />
                                <span className="text-sm font-bold text-white relative mb-4">
                                    Book Now
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-row gap-16 w-2/3 items-start">
                <div className="text-xs font-medium text-white bg-[#111111] w-1/4 h-8 pt-2 px-2 rounded-sm">
                    TIME REMAINING
                </div>
                <div className="text-xs font-medium text-white bg-[#111111] w-1/4 h-8 pt-2 px-2 rounded-sm">
                    MANAGE ACCOUNT
                </div>
                <div className="text-xs font-medium text-white bg-[#111111] w-1/4 h-8 pt-2 px-2 rounded-sm">
                    CANCEL RESERVATION
                </div>
            </div>
        </div>

            
            
           
          </div>
        </div>
      </div>
    </div>
      
    </div>
  );
}
