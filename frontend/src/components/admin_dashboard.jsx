import { useState, useEffect, useRef } from "react";
import Notification from "./notification";
import './css/modal.css'
import Chart from 'chart.js/auto';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';

export default function Component() {

    const [invigilatorsData, setInvigilatorsData] = useState([]);
    const [notification, setNotification] = useState(null);
    const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFullName, setAddFullName] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addContactNumber, setAddContactNumber] = useState('');
    const [addPassword, setAddPassword] = useState('');
    const [bookings, setBookings] = useState([]);
    const [earningsData, setEarningsData] = useState([]);
    const [adminFullName, setAdminFullName] = useState('Admin');
    const navigate = useNavigate();
    const [parkingStats, setParkingStats] = useState({
        totalSpots: 'Loading...',
        availableSpots: 'Loading...',
        bookedSpots: 'Loading...'
    });

    useEffect(() => {
        // Adjust the URL as needed based on your API's structure
        fetch(process.env.REACT_APP_BACKEND_V1_URL + '/parking-stats')
            .then(response => response.json())
            .then(data => {
                setParkingStats({
                    totalSpots: data.totalSpots,
                    availableSpots: data.availableSpots,
                    bookedSpots: data.bookedSpots
                });
            })
            .catch(error => {
                console.error('Error fetching parking stats:', error);
                // Handle error, maybe set some error message in state to show in UI
            });
    }, []);

    useEffect(() => {
        // Retrieve the full name from localStorage and update the state
        const storedFullName = localStorage.getItem('FullName');
        if (storedFullName) {
            setAdminFullName(storedFullName);
        }
    }, []);



    const showNotification = (message, type) => {
        console.log(message)
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };


    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const handleAddModalOpen = () => setIsAddModalOpen(true);
    const handleAddModalClose = () => setIsAddModalOpen(false);



    const handleEmployeeUpdate = () => {

        if (!fullName || !contactNumber) {
            showNotification('Full name and contact number are required.', "failure");
            return;
        }

        if (!employeeId) {
            showNotification('Employee ID is required.', "failure");
            return;
        }

        // Make a PATCH request to update the employee data
        fetch(`${process.env.REACT_APP_BACKEND_V1_URL}employees/${employeeId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fullName,
                contactNumber,
            }),
        })
            .then(response => {
                if (response.ok) {
                    fetchInvigilators();
                    showNotification("Employee data has been updated", "success");
                    setIsOpen(false);
                    setFullName("");
                    setContactNumber("");
                    setEmployeeId("");


                } else {
                    showNotification("Failed to update employee data", "failure");
                    throw new Error('Failed to update employee data');
                }
            })

    };

    const fetchEarningsData = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_V1_URL + 'transactions/monthly-income');
            if (response.ok) {
                const data = await response.json();
                const months = data.map(item => item.month);
                const amounts = data.map(item => item.totalAmount);
                setEarningsData({ months, amounts });


            } else {
                console.error('Failed to fetch earnings data');
            }
        } catch (error) {
            console.error('Error fetching earnings data:', error);
        }
    };



    // Fetch today's bookings data from backend
    const fetchTodayBookings = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_V1_URL + "bookings/today");
            if (response.ok) {
                const data = await response.json();
                setBookings(data);
            } else {
                console.error('Failed to fetch today\'s bookings');
            }
        } catch (error) {
            console.error('Error fetching today\'s bookings:', error);
        }
    };



    const handleEdit = (invigilator) => {
        // Set the employeeId state
        setEmployeeId(invigilator.InvigilatorID);
        // Set the default values for fullName and contactNumber
        setFullName(invigilator.FullName);
        setContactNumber(invigilator.ContactNumber);
        // Open the modal
        setIsOpen(true);
    };

    const fetchInvigilators = async () => {
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_V1_URL + 'employees');
            if (response.ok) {
                const data = await response.json();
                setInvigilatorsData(data);
            } else {
                console.error('Failed to fetch invigilators data');
            }
        } catch (error) {
            console.error('Error fetching invigilators:', error);
        }
    };

    const handleLogout = () => {
        
        // Remove specific items from localStorage
        localStorage.removeItem("AdminID");
        localStorage.removeItem("Email");
        localStorage.removeItem("ContactNumber");
        localStorage.removeItem("FullName");

        Cookies.remove('token');
        
        // Navigate to /signin
        navigate('/');

        
    };

    useEffect(() => {
        // Fetch invigilator data from backend
        fetchInvigilators();
        // Fetch today's bookings
        fetchTodayBookings();
        // Fetch Earnings
        fetchEarningsData();



    }, []);

    useEffect(() => {
        if (earningsData.months && earningsData.amounts) {
            console.log(earningsData.months.length)
            drawChart();
        }
    }, [earningsData]);

    const drawChart = () => {
        const ctx = document.getElementById('earningsChart').getContext('2d');
        const months = earningsData.months;
        const amounts = earningsData.amounts;

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Earnings per Month',
                    data: amounts,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            stepSize: 50
                        }
                    }
                }
            }
        });
    };


    const handleDeleteInvigilator = (id) => {

        fetch(`${process.env.REACT_APP_BACKEND_V1_URL}employees/${id}`, {
            method: 'DELETE'
        })
            .then(response => {
                if (response.ok) {
                    setInvigilatorsData(prevInvigilatorsData => {
                        return prevInvigilatorsData.filter(invigilator => invigilator.InvigilatorID !== id);
                    });
                    showNotification("Employee data has been deleted", "success");
                } else {
                    showNotification("Error while deleting employee data", "failure");
                }
            })
            .catch(error => showNotification('Error deleting invigilator:', "failure"));
    };

    const handleAddEmployee = () => {
        if (!addEmail || !addPassword || !addContactNumber || !addFullName) {
            showNotification('Please fill out all fields.', 'failure');
            return;
        }

        // Create a new invigilator object with the input field values
        const newInvigilator = {
            email: addEmail,
            password: addPassword,
            contactNumber: addContactNumber,
            fullName: addFullName
        };

        // Make a POST request to add the new invigilator
        fetch(`${process.env.REACT_APP_BACKEND_V1_URL}employees`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newInvigilator),
        })
            .then(response => {
                if (response.ok) {
                    showNotification('Invigilator has been added', 'success');
                    setIsAddModalOpen(false);
                    fetchInvigilators();
                    setAddFullName("")
                    setAddEmail("")
                    setAddContactNumber("")
                    setAddPassword("")

                } else {
                    response.text().then(errorMessage => {
                        showNotification('Failed to add invigilator: ' + errorMessage, 'failure');
                    });

                }
            })

    };





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


            <div className="flex h-auto bg-[#f1f1f1]">
                <aside className="flex flex-col w-1/4 p-8 bg-white">
                    <div className="flex items-center mb-16">
                        <img
                            src="https://www.iconpacks.net/icons/2/free-user-icon-3296-thumb.png"
                            alt="User"
                            className="w-20 h-20 rounded-full mr-4"
                        />
                        <div>
                            <h2 className="text-base text-[#888888]">Welcome,</h2>
                            <h1 className="text-xl font-bold">{adminFullName}</h1>
                        </div>
                    </div>
                    <nav>
                        <a href="#" className="block py-4 px-8 text-white font-bold bg-[#0044b5]">Dashboard</a>
                        <Link to="/admin/all-customers" className="block py-4 px-8 text-[#888888] hover:bg-gray-200">Customers</Link>
                        <Link to="/admin/all-invigilators" className="block py-4 px-8 text-[#888888] hover:bg-gray-200">Invigilators</Link>
                        <Link to="/admin/all-tickets" className="block py-4 px-8 text-[#888888] hover:bg-gray-200">Ticket Resolution</Link>
                    </nav>
                </aside>
                <main className="flex-1 p-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col justify-between p-4 bg-[#7ED1FF] text-white rounded-lg h-36">
                            <span className="text-4xl font-bold">{parkingStats.totalSpots}</span>
                            <span className="font-semibold">Total parking slots</span>
                        </div>
                        <div className="flex flex-col justify-between p-4 bg-[#7ED1FF] text-white rounded-lg h-36">
                            <span className="text-4xl font-bold">{parkingStats.bookedSpots}</span>
                            <span className="font-semibold">Booked parking slots</span>
                        </div>
                        <div className="flex flex-col justify-between p-4 bg-[#5BB55B] text-white rounded-lg h-36">
                            <span className="text-3xl font-bold">{parkingStats.availableSpots}</span>
                            <span className="font-semibold">Available parking slots</span>
                        </div>
                    </div>
                    <br />
                    <div className="font-inter text-sm">
                        <div className="text-headerText mb-4">
                            <h2 className="text-lg font-semibold">Invigilators</h2>
                        </div>
                        <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => setIsAddModalOpen(true)}>Add Invigilator</button>
                        <br />
                        <div className="overflow-hidden rounded-md shadow">
                            <div className="bg-tableHeaderBackground px-4 py-2">
                                <div className="flex justify-between">
                                    <span className="text-tableHeaderText w-1/4">Name</span>
                                    <span className="text-tableHeaderText w-1/4">Email ID</span>
                                    <span className="text-tableHeaderText w-1/4">Phone Number</span>
                                    <span className="text-tableHeaderText w-1/4">Actions</span> {/* Add Actions column */}
                                </div>
                            </div>
                            <div>
                                {invigilatorsData.slice(0, 5).map((invigilator, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center px-4 py-2 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                    >
                                        <span className="w-1/4">{invigilator.FullName}</span>
                                        <span className="w-1/4">{invigilator.Email}</span>
                                        <span className="w-1/4">{invigilator.ContactNumber}</span>
                                        <div className="flex items-center w-1/4">
                                            <button className="text-blue-500 mr-2"
                                                onClick={() => handleEdit(invigilator)}
                                            >Edit</button>
                                            <button className="text-red-500"
                                                onClick={() => handleDeleteInvigilator(invigilator.InvigilatorID)}
                                            >Delete</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>



                    </div>
                    <br />
                    <div className="flex flex-col bg-white text-gray-900 font-sans p-6">
                        <div className="flex justify-between items-center mb-4">
                            <h1 className="text-2xl font-semibold">Total Earnings</h1>
                            <span className="text-sm text-gray-600">Yearly</span>
                        </div>
                        <div className="flex h-80">

                            <canvas id="earningsChart"></canvas>

                        </div>
                    </div>
                    <br />
                    <div className="bg-white font-inter min-h-screen p-8">
                        <h2 className="text-3xl font-bold mb-4">Today's Booking Slots</h2>
                        <div className="overflow-x-auto">
                            <table className="min-w-full">
                                <thead className="bg-gray-200 border-b">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="text-sm font-bold text-gray-700 px-6 py-4 text-left"
                                        >
                                            Parking Slot
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-bold text-gray-700 px-6 py-4 text-left"
                                        >
                                            Check-in date and time
                                        </th>
                                        <th
                                            scope="col"
                                            className="text-sm font-bold text-gray-700 px-6 py-4 text-left"
                                        >
                                            User email ID
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {bookings.map((booking, index) => (
                                        <tr key={index} className="border-b">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {booking.parkingSpotNumber}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {booking.checkinTime}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline">
                                                {booking.Email}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
                {notification && <Notification message={notification.message} type={notification.type} />}

            </div>

            {isOpen && (
                <div className="modal">
                    <div className="modal-overlay"></div>
                    <div className="modal-content modal-centered">
                        <div className="modal-header">
                            <h3>Edit Profile</h3>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                placeholder="Name"
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={contactNumber}
                                onChange={(e) => setContactNumber(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleEmployeeUpdate}>
                                Save
                            </button>
                            <button className="btn btn-secondary" onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add modal */}
            {isAddModalOpen && (
                <div className="modal">
                    <div className="modal-overlay"></div>
                    <div className="modal-content modal-centered">
                        <div className="modal-header">
                            <h3>Add Invigilator</h3>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                placeholder="Name"
                                value={addFullName} // Add state for name
                                onChange={(e) => setAddFullName(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Email"
                                value={addEmail} // Add state for email
                                onChange={(e) => setAddEmail(e.target.value)}
                            />
                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={addContactNumber} // Add state for phone number
                                onChange={(e) => setAddContactNumber(e.target.value)}
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                value={addPassword} // Add state for password
                                onChange={(e) => setAddPassword(e.target.value)}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleAddEmployee}>Save</button>
                            <button className="btn btn-secondary" onClick={handleAddModalClose}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}



        </>
    );
}

