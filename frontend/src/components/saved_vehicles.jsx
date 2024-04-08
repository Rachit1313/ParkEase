import { useState, useEffect, useRef } from "react";
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { FaTrash, FaEdit } from 'react-icons/fa';
import Cookies from 'js-cookie';
import Notification from "./notification";
import './css/modal.css'
import Swal from 'sweetalert2';


export default function Component() {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [notification, setNotification] = useState(null);
    const [vehicles, setVehicles] = useState([]);
    const [isOpen, setIsOpen] = useState(false); // State to control modal visibility
    const [numberPlate, setNumberPlate] = useState(''); // State for number plate input
    const [makeModel, setMakeModel] = useState(''); // State for make/model input

    const handleOpenModal = () => setIsOpen(true);
    const handleCloseModal = () => setIsOpen(false);

    // const handleSave = () => {
    //     console.log('Saving vehicle:', { numberPlate, makeModel });
    //     handleCloseModal();
    // };

    const handleSave = async () => {


        try {
            // Validate input
            if (!numberPlate || !makeModel) {
                console.error('All fields are required');
                return;
            }

            const customerId = localStorage.getItem('customerId');

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}add-vehicles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    plateNumber: numberPlate,
                    customerId: customerId,
                    makeModel: makeModel,
                }),
            });

            if (response.ok) {
                console.log('Vehicle added successfully.');
                showNotification("Vehicle added successfully", "success");
            } else {
                console.error('Error adding vehicle:', response.status, await response.json());
                showNotification("Error adding vehicle", "error");
            }

            // Close the modal after saving
            handleCloseModal();
        } catch (error) {
            console.error('Error adding vehicle:', error);
        }
    };


    const handleChangeNumberPlate = (event) => setNumberPlate(event.target.value);
    const handleChangeMakeModel = (event) => setMakeModel(event.target.value);


    const showNotification = (message, type) => {
        console.log(message)
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAccountClick = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    useEffect(() => {
        document.title = "Vehicles";
        const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
        favicon.type = 'image/png';
        favicon.rel = 'icon';
        favicon.href = "https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png";
        document.head.appendChild(favicon);
    }, []);

    useEffect(() => {
        // Fetch vehicles when the component mounts
        const fetchVehicles = async () => {
            try {
                const customerId = localStorage.getItem("customerId");
                const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}saved-vehicles/${customerId}`);

                if (response.ok) {
                    const data = await response.json();
                    setVehicles(data);
                } else {
                    showNotification("No Vehicles found", "error");
                }
            } catch (error) {
                console.error('Error fetching vehicles:', error);
                showNotification("An error occurred while fetching vehicles", "error");
            }
        };

        fetchVehicles();
    }, []);

    const handleLogout = async () => {
        try {
            Cookies.remove('token');

            localStorage.removeItem('userType');
            localStorage.removeItem('customerId');
            localStorage.removeItem('email');
            localStorage.removeItem('contactNumber');
            localStorage.removeItem('fullName');


            window.location.href = '/';

        } catch (error) {
            showNotification("Error during logout!", "failure");
        }
    };


    const handleManageVehicles = () => {
        window.location.href = '/vehicles';
    };

    const handleDeleteVehicle = (plateNumber) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "Do you want to delete this vehicle?",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
              // User confirmed the action
              proceedWithDeleting(plateNumber);
            }else{
              showNotification("Delete aborted.." , "failure");
            }
          });    
      };
      

    const proceedWithDeleting = (plateNumber) => {
        if (true) {
          fetch(`${process.env.REACT_APP_BACKEND_URL}saved-vehicles/${plateNumber}`, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              
            },
          })
          .then(response => {
            if (response.ok) {
              // Vehicle deleted successfully
              showNotification("Vehicle deleted successfully.", "success");
              setVehicles(vehicles.filter(vehicle => vehicle.PlateNumber !== plateNumber));
            } else {
              // Handle response errors
              showNotification("Failed to delete the vehicle..", "failure");
              
            }
          })
          .catch(error => {
            console.error('Error deleting vehicle:', error);
            showNotification("Error while deleting the vehicle..", "failure");
          });
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
                        <Link to="/about">About</Link>
                    </li>
                    <li className="mt-2">
                        <Link to="/history">History</Link>
                    </li>
                    <li className="mt-2">
                        <Link to="/ticket">Ticket</Link>
                    </li>

                    <li className="mt-2">
                        <button
                            className="rounded-lg bg-blue-800 text-white px-6 py-1.5 text-lg transition duration-300 ease-in-out hover:bg-blue-900"
                            onClick={handleAccountClick}
                        >
                            My Account
                        </button>
                        {isDropdownOpen && ( // Conditionally render dropdown items
                            <ul className="absolute right-0 mt-2 shadow-md rounded-md bg-white overflow-hidden">
                                <li className="hover:bg-gray-100 px-4 py-2">
                                    <button onClick={handleLogout}>Logout</button>
                                </li>
                                <li className="hover:bg-gray-100 px-4 py-2">
                                    <button onClick={handleManageVehicles}>Manage Vehicles</button>
                                </li>
                            </ul>
                        )}
                    </li>
                </ul>
            </div>

            <div
                id="RootRoot"
                className="flex flex-col gap-2 w-full font-['Poppins'] items-center"
            >
                <div id="Wallet" className="text-3xl text-[#1a5aff] my-4">
                    Manage Vehicles
                </div>
                <div className="w-full px-4 md:px-12 lg:w-5/6 xl:w-3/4">
                    <div className="flex flex-col gap-4 items-start">



                        <div className="text-2xl font-medium mt-8 text-[#0044b5]">
                            Your Vehicles:
                        </div>





                        <div className="w-full">
                            <div className="flex flex-row justify-between items-center my-2">
                                <div className="text-lg font-medium">License Plate</div>
                                <div className="text-lg font-medium">MakeModel</div>
                                <button
                                    id="AddVehicle"
                                    className="text-lg text-white bg-[#0044b5] py-1 px-4 rounded-lg"
                                    onClick={handleOpenModal}
                                >
                                    + Add Vehicles
                                </button>
                            </div>
                            {vehicles.length > 0 ? (
                                vehicles.map((vehicle) => (
                                    <div key={vehicle.PlateNumber} className="flex flex-col w-full items-start gap-4 bg-gray-50 p-4 rounded-md">
                                        <div className="flex items-center justify-between w-[50%]">
                                            <div className="text-lg font-medium">{vehicle.PlateNumber}</div>
                                            <div className="text-sm text-right flex-grow">{vehicle.MakeModel}</div>
                                        </div>
                                        <div className="flex-shrink-0 gap-2 hidden md:flex">
                                           
                                            <button className="w-8 h-8 bg-gray-300 hover:bg-gray-400 rounded-full flex items-center justify-center transition duration-300"
                                            onClick={() => handleDeleteVehicle(vehicle.PlateNumber)}
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No vehicles found.</p>
                            )}
                        </div>


                    </div>
                </div>
            </div>


            {notification && <Notification message={notification.message} type={notification.type} />}

            {isOpen && ( // Conditionally render modal when isOpen is true
                <div className="modal">
                    <div className="modal-overlay"></div> {/* Added for background overlay */}
                    <div className="modal-content modal-centered"> {/* Centered modal */}
                        <div className="modal-header">
                            <h3>Add Vehicle</h3>
                        </div>
                        <div className="modal-body">
                            <input
                                type="text"
                                placeholder="Number Plate"
                                value={numberPlate}
                                onChange={handleChangeNumberPlate}
                            />
                            <input
                                type="text"
                                placeholder="Make & Model"
                                value={makeModel}
                                onChange={handleChangeMakeModel}
                            />
                        </div>
                        <div className="modal-footer">
                            <button className="btn btn-primary" onClick={handleSave}>
                                Save
                            </button>
                            <button className="btn btn-secondary" onClick={handleCloseModal}>
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}
