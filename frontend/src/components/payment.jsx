import { useState, useEffect, useRef } from "react";
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { useNavigate } from "react-router-dom";
import Notification from "./notification";
import { Link } from 'react-router-dom';

export default function Component({ bId, tFare }) {
    const [cardNumber, setCardNumber] = useState('');
    const [expDate, setExpDate] = useState('');
    const [cvv, setCvv] = useState('');
    const [zipCode, setZipCode] = useState('');
    const [bookingId, setBookingId] = useState('');
    const [totalFare, setTotalFare] = useState('');
    const [notification, setNotification] = useState(null);
    const [savedVehicles, setSavedVehicles] = useState([]);
    const [selectedVehicle, setSelectedVehicle] = useState('');

    useEffect(() => {
        const fetchSavedVehicles = async () => {
            try {
                const customerId = localStorage.getItem("customerId");
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}saved-vehicles/${customerId}`);

                if (response.ok) {
                    const data = await response.json();
                    setSavedVehicles(data);
                } else {
                    console.error('Failed to fetch saved vehicles');
                }
            } catch (error) {
                console.error('Error during saved vehicles fetch:', error);
            }
        };

        fetchSavedVehicles();
    }, []);

    const showNotification = (message, type) => {
        console.log(message)
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };
    const [userDetails, setUserDetails] = useState({
        email: '',
        fullName: '',
        contactNumber: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        document.title = "Payment";
        const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
        favicon.type = 'image/png';
        favicon.rel = 'icon';
        favicon.href = "https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png";
        document.head.appendChild(favicon);
    }, []);

    useEffect(() => {

        const localbookingId = localStorage.getItem('bookingId');
        const localtotalFare = localStorage.getItem('totalFare');


        // Retrieve user details from localStorage
        const customerId = localStorage.getItem('customerId');
        const email = localStorage.getItem('email');
        const fullName = localStorage.getItem('fullName');
        const contactNumber = localStorage.getItem('contactNumber');

        // Set user details in the state
        setUserDetails({
            email: email || '',
            fullName: fullName || '',
            contactNumber: contactNumber || '',
        });

        setBookingId(localbookingId);
        setTotalFare(localtotalFare);


    }, []);

    const handlePurchase = async () => {
        try {
            // Validate card details (you may want to add more validation)
            if (!cardNumber || !expDate || !cvv || !zipCode) {
                showNotification("Please fill in all payment details", "failure");
                return;
            }

            if (!selectedVehicle) {
                showNotification("Please select a vehicle", "failure");
                return;
            }
            // Split the expiration date into month and year
            const [expMonth, expYear] = expDate.split(' / ');

            // Make API request to process payment
            const response = await fetch(process.env.REACT_APP_BACKEND_URL + "process-payment", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    customerId: localStorage.getItem("customerId"),
                    bookingId,
                    amount: totalFare,
                    cardNumber,
                    expMonth,
                    expYear,
                    cvv,
                    zipCode,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                showNotification("Payment Sucessful, redirecting ..", "success");
                navigate('/history')
            } else {
                response.text().then(errorMessage => {
                    showNotification('Failed to process payment: ' + errorMessage, 'failure');
                });
                
            }
        } catch (error) {
            showNotification("Error during payment processing", "failure");
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
                <ul className="flex justify-end gap-16">

                    <li className="mt-2">
                        <Link to="/home">Home</Link>
                    </li>
                    <li className="mt-2 relative">
                        <span className="font-bold text-blue-800">Booking</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800"></span>
                    </li>
                    <li className="mt-2">
                        <Link to="/history">History</Link>
                    </li>
                    <li className="mt-2">
                        <Link to="/about">About Us</Link>
                    </li>
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
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userDetails.email}</dd>
                                </div>
                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">NAME*</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userDetails.fullName}</dd>
                                </div>

                                <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                    <dt className="text-sm font-medium text-gray-500">PHONE NUMBER*</dt>
                                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{userDetails.contactNumber}</dd>
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
                                        <select
                                            className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                            value={selectedVehicle} // Bind to selectedVehicle state
                                            onChange={(e) => setSelectedVehicle(e.target.value)} // Update on change
                                        >
                                            <option value="" disabled>
                                                Select License Plate
                                            </option>
                                            {savedVehicles.map((vehicle) => (
                                                <option key={vehicle.PlateNumber} value={vehicle.PlateNumber}>
                                                    {vehicle.PlateNumber}
                                                </option>
                                            ))}
                                        </select>
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
                                        <option value="" disabled selected>
                                            Select State
                                        </option>
                                        <option value="ON">Ontario</option>
                                        <option value="QC">Quebec</option>
                                        <option value="AB">Alberta</option>
                                        <option value="BC">British Columbia</option>
                                        <option value="MB">Manitoba</option>
                                        <option value="NB">New Brunswick</option>
                                        <option value="NL">Newfoundland and Labrador</option>
                                        <option value="NS">Nova Scotia</option>
                                        <option value="PE">Prince Edward Island</option>
                                        <option value="SK">Saskatchewan</option>
                                        <option value="NT">Northwest Territories</option>
                                        <option value="NU">Nunavut</option>
                                        <option value="YT">Yukon</option>
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
                                <span className="text-gray-700">Total Fare:</span>
                                <input
                                    type="text"
                                    placeholder="--"
                                    value={totalFare} // Set the total fare from props
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
                                    readOnly // Make it non-editable
                                />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Card Number:</span>
                                <input type="text" placeholder="•••• •••• •••• ••••"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Card Expiration:</span>
                                <input type="text" placeholder="MM / YYYY"
                                    value={expDate}
                                    onChange={(e) => setExpDate(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </label>
                            <label className="block">
                                <span className="text-gray-700">Card CVV:</span>
                                <input type="text" placeholder="CVV"
                                    value={cvv}
                                    onChange={(e) => setCvv(e.target.value)}
                                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                            </label>
                        </div>
                        <label className="block mb-6">
                            <span className="text-gray-700">Zip Code:</span>
                            <input type="text" placeholder="ex: 12345"
                                value={zipCode}
                                onChange={(e) => setZipCode(e.target.value)}
                                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm" />
                        </label>
                        <div className="bg-gray-100 p-4 rounded-md mb-6">
                            <p className="text-sm text-gray-700">MOBILE OR PRINTED PASS ACCEPTED</p>
                            <p className="text-sm text-gray-700">Mobile or printed accepted to enter and exit this location.</p>
                        </div>
                        {/* <div className="flex items-center justify-between mb-4">
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
                            
                        </div> */}
                        <div className="flex items-center mb-6">
                            <input type="checkbox" className="accent-orange-400 rounded mr-2" />
                            <span className="text-sm text-gray-700">Yes, send me information about special offers near me.</span>
                        </div>
                        <button
                            onClick={handlePurchase}
                            className="bg-blue-600 text-white px-6 py-2 rounded focus:outline-none hover:bg-blue-700 transition-colors">
                            Purchase here
                        </button>


                    </div>
                </div>



            </div>
            {notification && <Notification message={notification.message} type={notification.type} />}

        </div>
    );
}
