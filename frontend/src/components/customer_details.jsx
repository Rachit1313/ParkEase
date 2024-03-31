import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const CustomerDetails = () => {
    
    const { customerId } = useParams();
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);
    const navigate = useNavigate()

    useEffect(() => {

    const fetchPastBookings = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}booking-history/${customerId}`);
            if (response.ok) {
                const data = await response.json();
                setPastBookings(data);
            } else {
                console.error('Failed to fetch past bookings');
            }
        } catch (error) {
            console.error('Error fetching past bookings:', error);
        }
    };    

    const fetchCustomers = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_V1_URL + 'customers');
            if (response.ok) {
                const data = await response.json();
                setCustomers(data);
            } else {
                console.error('Failed to fetch customers');
            }
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    const findCustomer = () => {
        const foundCustomer = customers.find(customer => customer.CustomerID === parseInt(customerId));
        if (foundCustomer) {
            setCustomer(foundCustomer);
        } else {
            console.error('Customer not found');
        }
    };

    fetchCustomers();
    fetchPastBookings();

    if (customerId && customers.length > 0) {
        findCustomer();
    }



    }, [customerId, customers]);

   
    const handleLogout = () => {
        // Navigate to /signin
        navigate('/');

        // Remove specific items from localStorage
        localStorage.removeItem("AdminID");
        localStorage.removeItem("Email");
        localStorage.removeItem("ContactNumber");
        localStorage.removeItem("FullName");
    };

    const goBack = () => {
        navigate('/admin/all-customers')
    }


    
    return (
        <>

<div className="bg-white">
                <div className="flex justify-between items-center p-4">
                    {/* Header Contact Information */}
                    <div className="flex items-center space-x-4">
                        <img
                            src="https://file.rendit.io/n/caJnSADVuRIw9pBQkNld.png"
                            alt="Company Logo"
                            className="h-12"
                        />
                    </div>

                    {/* Notification and Settings */}
                    <div className="flex items-center space-x-3 mr-5">

                        <img
                            src="https://file.rendit.io/n/cezRbURLsp1Dgk7DiXTi.svg"
                            alt="Logout Icon"
                            className="h-6 w-6"
                            onClick={handleLogout}
                        />
                    </div>
                </div>


            </div>
            <br/><br/>

            <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 ml-4" onClick={() => goBack()}>Go Back</button>
                
            <br/><br/><br/> 

            <div className="flex ml-5">



                {/* Left side: Customer details */}
                <div className="w-1/2 p-4 bg-gray-100">
                    <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
                    <div className="border border-gray-300 rounded-md p-4 mb-4">
                        <div className="flex items-center mb-2">
                            <strong className="w-1/4">Name:</strong>
                            <span>{customer.FullName}</span>
                        </div>
                        <div className="flex items-center mb-2">
                            <strong className="w-1/4">Email:</strong>
                            <span>{customer.Email}</span>
                        </div>
                        <div className="flex items-center">
                            <strong className="w-1/4">Phone:</strong>
                            <span>{customer.ContactNumber}</span>
                        </div>
                        
                    </div>
                </div>


                {/* Right side: Past bookings */}
                <div className="w-1/2 p-4 mr-5">
                    <h2 className="text-2xl font-semibold mb-4">Past Bookings</h2>
                    <table className="min-w-full">
                        <thead className="bg-gray-200 border-b">
                            <tr>
                                <th className="text-left px-4 py-2">Booking Slot</th>
                                <th className="text-left px-4 py-2">Garage ID</th>
                                <th className="text-left px-4 py-2">Check-in Time</th>
                                <th className="text-left px-4 py-2">Checkout Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {pastBookings.map((booking, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{booking.SpotID}</td>
                                    <td className="px-4 py-2">{booking.GarageID}</td>
                                    <td className="px-4 py-2">{booking.CheckInTime}</td>
                                    <td className="px-4 py-2">{booking.CheckOutTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default CustomerDetails;
