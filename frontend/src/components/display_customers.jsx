import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const CustomerDetails = () => {

    const [customers, setCustomers] = useState([]);
    const navigate = useNavigate()
    
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
        navigate('/admin/dashboard')
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

            <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 ml-4" onClick={() => goBack()}>Go Back</button>
                
            <br/>

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
