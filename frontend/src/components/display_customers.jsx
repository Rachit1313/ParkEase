import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const CustomerDetails = () => {

    const [customers, setCustomers] = useState([]);
    
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

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleViewDetails = (CustomerID) => {
        return `/admin/customer-details/${CustomerID}`;
    };

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

            <div className="customer-details-container">
                {/* Right side: Customers */}
                <div className="w-full p-4">
                    <h2 className="text-2xl font-semibold mb-4">Customer Details</h2>
                    <table className="min-w-full">
                        <thead className="bg-gray-200 border-b">
                            <tr>
                                <th className="text-left px-4 py-2">Customer Name</th>
                                <th className="text-left px-4 py-2">Email</th>
                                <th className="text-left px-4 py-2">Phone Number</th>
                                <th className="text-left px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer, index) => (
                                <tr key={index} className="border-b">
                                    <td className="px-4 py-2">{customer.FullName}</td>
                                    <td className="px-4 py-2">{customer.Email}</td>
                                    <td className="px-4 py-2">{customer.ContactNumber}</td>
                                    <Link className="text-blue-500 mr-2"
                                                to={handleViewDetails(customer.CustomerID)}
                                            >View Details</Link>
                                   
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
