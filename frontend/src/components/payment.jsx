import { useState, useEffect, useRef } from "react";
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';



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

                    <li className="mt-2">Home</li>
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


            <div className="px-4 py-6 sm:px-6 lg:px-8">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white shadow overflow-hidden sm:rounded-lg">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">1. YOUR INFORMATION</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">We will email your parking pass to the email address you provide.</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">EMAIL*</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">ex- jane.doe@gmail.com</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">FIRST NAME*</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">ex- Jane</dd>
                                </div>
                                <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">LAST NAME*</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">ex- Doe</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">PHONE NUMBER*</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">(201) 555-0123</dd>
                                </div>
                            </dl>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">2. VEHICLE INFORMATION</h3>
                            <p className="mt-1 max-w-2xl text-sm text-gray-500">Make sure your license plate matches the vehicle you park to avoid a parking ticket or towing. If you drive a large vehicle, please refer to the height restriction of this location.</p>
                        </div>
                        <div className="border-t border-gray-200">
                            <dl>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">LICENSE PLATE*</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                                        <input
                                            type="text"
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            placeholder="Enter License Plate"
                                        // Add any additional attributes or event handlers as needed
                                        />
                                    </dd>
                                </div>

                                <div className="bg-gray-50 px-4 py-5 sm:px-6">
                                    <p className="text-sm text-gray-600">Enter your full plate number to avoid citation. Max of 8 characters. Do not include spaces or special characters.</p>
                                </div>
                                <div className="flex gap-2">
                                    <div className="bg-gray-200 p-3 rounded flex items-center justify-center">
                                        <img src="https://via.placeholder.com/20x13" alt="Flag" className="w-5 h-4" />
                                    </div>
                                    <select
                                        className="border border-gray-300 p-3 rounded flex-1"
                                    >
                                        <option>State</option>
                                    </select>
                                </div>
                            </dl>
                        </div>
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">3. Payment INFORMATION</h3>
                        </div>
                        <div className="flex items-center mb-4">
                            <i className="text-orange-400 fas fa-wallet mr-2" />
                            <button className="bg-orange-200 text-orange-700 py-2 px-4 rounded-lg flex items-center">
                                <i className="far fa-credit-card mr-2" />
                                Pay with Credit Card
                            </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                            <label className="block">
                                <span className="text-gray-700">Card Number:</span>
                                <input type="text" placeholder="•••• •••• •••• ••••" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Card Expiration:</span>
                                <input type="text" placeholder="MM / YYYY" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Card CVV:</span>
                                <input type="text" placeholder="CVV" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </label>
                        </div>
                        <label className="block mb-6">
                            <span className="text-gray-700">Zip Code:</span>
                            <input type="text" placeholder="ex: 12345" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <div className="bg-gray-100 p-4 rounded-md mb-6">
                            <p className="text-sm text-gray-700">MOBILE OR PRINTED PASS ACCEPTED</p>
                            <p className="text-sm text-gray-700">Mobile or printed accepted to enter and exit this location.</p>
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <button className="text-blue-600 flex items-center gap-2 font-medium">
                                ADD A PROMO OR ACCESS CODE <span className="text-red-500">{'>'}</span>
                            </button>
                            <div className="flex mt-4">
                                <input
                                    type="text"
                                    className="text-input flex-1 border-gray-300 rounded-l-md shadow-sm"
                                    placeholder="Enter Promo or Access Code"
                                />
                                <button
                                    className="bg-[#0044b5] text-white font-bold py-2 px-6 rounded-r-lg"
                                >
                                    APPLY
                                </button>
                            </div>
                            
                        </div>
                        <div className="flex items-center mb-6">
                            <input type="checkbox" className="accent-orange-400 rounded mr-2" />
                            <span className="text-sm text-gray-700">Yes, send me information about special offers near me.</span>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded focus:outline-none hover:bg-blue-700 transition-colors">
                                Purchase here
                       </button>


                    </div>
                </div>



            </div>
        </div>
    );
}
