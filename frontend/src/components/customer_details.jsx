import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const CustomerDetails = () => {
    
    const { customerId } = useParams();
    const [customers, setCustomers] = useState([]);
    const [customer, setCustomer] = useState([]);
    const [pastBookings, setPastBookings] = useState([]);

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

   


    
    return (
        <>

            <div className="p-4 flex justify-between items-center bg-white border-b shadow-sm">
                <img
                    src="https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png"
                    alt="Logo"
                    className="h-10"
                />
                <ul className="flex justify-end gap-16">
                    <li className="mt-2 relative">
                        <span className="font-bold text-blue-800">Customer Details</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800"></span>
                    </li>
                    <li className="mt-2">
                        <button
                            className="rounded-lg bg-blue-800 text-white px-6 py-1.5 text-lg transition duration-300 ease-in-out hover:bg-blue-900"
                        >
                            My Account
                        </button>

                    </li>
                </ul>

            </div>



            <div className="flex">



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
                <div className="w-1/2 p-4">
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
