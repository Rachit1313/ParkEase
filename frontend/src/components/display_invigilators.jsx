import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Notification from "./notification";
import { useNavigate } from 'react-router-dom';

const DisplayInvigilators = () => {

    const [invigilatorsData, setInvigilatorsData] = useState([]);
    const [notification, setNotification] = useState(null);
    const [fullName, setFullName] = useState('');
    const [contactNumber, setContactNumber] = useState('');
    const [employeeId, setEmployeeId] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [addFullName, setAddFullName] = useState('');
    const [addEmail, setAddEmail] = useState('');
    const [addContactNumber, setAddContactNumber] = useState('');
    const navigate = useNavigate()

    const showNotification = (message, type) => {
        console.log(message)
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };


    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);
    const handleAddModalOpen = () => setIsAddModalOpen(true);
    const handleAddModalClose = () => setIsAddModalOpen(false);

    const goBack = () => {
        navigate('/admin/dashboard')
    }

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

    useEffect(() => {
        fetchInvigilators();
    }, []);

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

    const handleEdit = (invigilator) => {
        // Set the employeeId state
        setEmployeeId(invigilator.InvigilatorID);
        // Set the default values for fullName and contactNumber
        setFullName(invigilator.FullName);
        setContactNumber(invigilator.ContactNumber);
        // Open the modal
        setIsOpen(true);
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

            <br />
            <div className="pl-10 font-inter text-sm">
                <div className="text-headerText mb-4">
                    <h2 className="text-lg font-semibold">Invigilators</h2>
                </div>
                <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4 mr-4" onClick={() => goBack()}>Go Back</button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={() => setIsAddModalOpen(true)}>Add Invigilator</button>
                <br /><br /><br />
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
                        {invigilatorsData.map((invigilator, index) => (
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

            {notification && <Notification message={notification.message} type={notification.type} />}




        </>
    );
};


export default DisplayInvigilators;
