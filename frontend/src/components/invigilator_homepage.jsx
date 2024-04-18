import { useState, useEffect, useRef } from "react";
import { useNavigate, Link } from 'react-router-dom';
import Notification from "./notification";
import Cookies from 'js-cookie';
export default function Component() {
  const [selectedFile, setSelectedFile] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [customerFullName, setCustomerFullName] = useState('');
  const navigate = useNavigate()
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notification, setNotification] = useState(null);

  const showNotification = (message, type) => {
    console.log(message)
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };
  const handleAccountClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
  };


  const handleLogout = () => {
        
    // Remove specific items from localStorage
    localStorage.removeItem("InvigilatorID");
    localStorage.removeItem("Email");
    localStorage.removeItem("ContactNumber");
    localStorage.removeItem("FullName");

    Cookies.remove('token');
    
    // Navigate to /signin
    navigate('/');

    
};

useEffect(() => {
  document.title = "Invigilator Home"; // Set the page title
}, []);

  const startCamera = () => {
    setShowModal(true);
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ video: true })
        .then((stream) => {
          setStream(stream);
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          showNotification("Error starting video stream:", "failure");
        });
    }
  };

  const captureImage = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext("2d");
      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);
      canvasRef.current.toBlob((blob) => {
        const file = new File([blob], "captured-image.jpg", { type: "image/jpeg" });
        console.log("Image captured and file created:", file);
        handleScanNow(file);
        setShowModal(false);
      }, 'image/jpeg');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    setShowModal(false); // Hide the modal
  };


  // Cleanup function to stop the video stream when the component unmounts
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);


  const handleManualEntry = () => {
    const plateNumber = window.prompt("Please enter the plate number:");
    if (plateNumber) {
      validateBookingByPlateNumber(plateNumber);
    }
  };



  const validateBookingByPlateNumber = (plateNumber) => {
    fetch(`${process.env.REACT_APP_BACKEND_V2_URL}validate-booking/${plateNumber}`)
      .then(response => {
        if (!response.ok) {
          showNotification(`Validation has failed: ${response.status}`, "failure");
        }
        return response.json();
      })
      .then(data => {
        console.log(data);
        if (data.valid) {
          showNotification(`Booking validated successfully`, "success");

          fetchBookingDetails(data.bookingId);

        } else {
          alert(`Validation failed: ${data.message}`);
        }
      })
      .catch((error) => {
        console.error('Error during booking validation:', error);
      });
  };

  const handleScanNow = (selectedFile) => {


    if (!selectedFile) {
      alert('Please select an image file first.');
      return;
    }

    const body = new FormData();
    body.append('upload', selectedFile);
    // Update "us-ca" to your target region
    body.append('regions', 'us-ca');

    fetch('https://api.platerecognizer.com/v1/plate-reader/', {
      method: 'POST',
      headers: {
        Authorization: "Token 66ad95e1fe31e3cfd7414dcefea5b078b7980713",
      },
      body: body,
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.results.length > 0) {
          const plateNumber = data.results[0].plate;
          validateBookingByPlateNumber(plateNumber);
        } else {
          alert('No plate detected.');
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Failed to scan the plate.');
      });
  };

  const fetchCustomerDetails = (customerId) => {
    fetch(`${process.env.REACT_APP_BACKEND_V1_URL}customer/${customerId}`)
      .then(response => response.json())
      .then(data => {
        setCustomerFullName(data.FullName);
      })
      .catch(error => console.error('Error fetching customer details:', error));
  };


  const fetchBookingDetails = (bookingId) => {
    fetch(`${process.env.REACT_APP_BACKEND_V1_URL}bookings/${bookingId}`)
      .then(response => response.json())
      .then(data => {
        setBookingDetails(data);
        fetchCustomerDetails(data.CustomerID);
      })
      .catch(error => console.error('Error fetching booking details:', error));
  };



  return (
    <div className="bg-white font-inter">

      <div className="p-4 flex justify-between items-center bg-white border-b shadow-sm">
        <img
          src="https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png"
          alt="Logo"
          className="h-10"
        />
        <ul className="flex justify-end gap-16">
          <li className="mt-2 relative">
            <span className="font-bold text-blue-800">Home</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800"></span>
          </li>
          <li className="mt-2">
            <Link to="/invigilator/all-tickets">Tickets</Link>
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

              </ul>
            )}
          </li>
        </ul>

      </div>

      <div className="relative bg-white px-4 sm:px-8 lg:px-12 xl:px-20 2xl:px-40">
        
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-stretch gap-8 mt-4 lg:mt-12">
          <div className="flex-1 bg-no-repeat bg-cover rounded-lg shadow-md h-80 lg:h-96" style={{ backgroundImage: 'url(https://file.rendit.io/n/G9DuYVnoaPtULl8zNlfH.png)' }}>
            <div className="flex flex-col justify-center items-start p-8 h-full">

            </div>
          </div>
          {/* Customer details area */}
          <div className="flex-1 bg-white rounded-lg shadow-md h-80 lg:h-96">
            <h1 className="text-3xl font-bold text-gray-800">
              Scan the number plate
            </h1>
            <button type="submit" className="mt-4 bg-blue-700 mr-4 text-white text-xl font-bold py-3 px-6 rounded-lg"
              onClick={startCamera}
            >
              Scan now

            </button>

            <br />

            <button onClick={handleManualEntry} className="mt-2 text-sm text-gray-500 hover:underline">
              or Enter number manually
            </button>
            <br /><br /><br />

            <div className="flex justify-between items-center mb-6">
              <h2 className="text-1xl font-semibold">Customer Details:</h2>
              {/* Assuming PaymentAmount is part of bookingDetails and may need formatting or a default value */}
              <span className="bg-green-500 text-white font-semibold text-lg px-4 py-1 rounded-lg">
                ${bookingDetails?.PaymentAmount || '0'} {/* Defaulting to $50 if PaymentAmount is not available */}
              </span>
            </div>
            <div className="text-sm text-blue-700">
              <div className="font-bold">
                Name: <span className="font-normal">{customerFullName || ''}</span>
              </div>
              <div className="font-bold">
                Booking start: <span className="font-normal">{bookingDetails ? bookingDetails.checkInTime: ''}</span>
              </div>
              <div className="font-bold">
                Booking end: <span className="font-normal">{bookingDetails ? bookingDetails.CheckOutTime : ''}</span>
              </div>
              {/* Assuming SpotID is available in bookingDetails for the parking slot */}
              <div className="font-bold mt-6">
                Parking slot: <span className="font-normal">{bookingDetails?.SpotID || ''}</span>
              </div>
            </div>


          </div>
        </div>
      </div>


      <div className="flex justify-center items-center h-screen bg-white">
        <div className="flex container max-w-6xl mx-auto p-8">
          {/* Left side image */}
          <div className="flex-1">
            <img
              src="https://file.rendit.io/n/HbaX1vKM2ftosyJtNvdp.png"
              alt="Support Representative"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Help and contact information */}
          <div className="flex-1 ml-12">
            <h1 className="text-4xl font-semibold mb-2">Need Help?</h1>
            <h2 className="text-2xl text-gray-700 mb-6">Contact Admin</h2>

            {/* Email input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">
                Enter your email address
              </label>
              <div className="flex items-center px-3 py-2 border border-gray-300 rounded-md bg-gray-200">
                {/* Email icon */}
                <img
                  src="https://file.rendit.io/n/8Zz3dbISqMpprOxqOV3t.svg"
                  alt="Email"
                  className="mr-3 h-5 w-5"
                />
                <input
                  type="email"
                  id="email"
                  placeholder="Enter your email address"
                  className="bg-gray-200 outline-none"
                />
              </div>
            </div>

            {/* Message input */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-700 mb-2">
                Enter your message....
              </label>
              <textarea
                id="message"
                rows="4"
                placeholder="Enter your message...."
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              ></textarea>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white uppercase tracking-wider font-inter rounded-md"

            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="bg-[#0044b5] w-full font-[Inter] text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <img
              src="https://file.rendit.io/n/xFYDvsbQwehzsDDu9ucu.png"
              alt="Logo"
              className="mb-4"
            />
            <p className="text-[#d3d6d8] text-xs">Parking system with premium service</p>
            <div className="flex mt-4">

              <div className="bg-[url(https://file.rendit.io/n/9Wuuw8xRBVu0aGE328kW.svg)] bg-no-repeat mr-2 w-6 h-6"></div>
              <div className="bg-[url(https://file.rendit.io/n/A7phh0LDC7JhOOp20Gt1.svg)] bg-no-repeat mr-2 w-6 h-6"></div>
              <div className="bg-[url(https://file.rendit.io/n/A7phh0LDC7JhOOp20Gt1.svg)] bg-no-repeat mr-2 w-6 h-6"></div>
              <div className="bg-[url(https://file.rendit.io/n/WN3zlc7EFmXxOsQbsLKQ.svg)] bg-no-repeat w-6 h-6"></div>


            </div>
          </div>
          <div>
            <h3 className="font-bold">My Account</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-[#d3d6d8] text-xs">View Profile</li>
              <li className="text-[#d3d6d8] text-xs">Saved Payment Methods</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-[#d3d6d8] text-xs">About</li>
              <li className="text-[#d3d6d8] text-xs">Support and Ticketing</li>
              <li className="text-[#d3d6d8] text-xs">Contact Us</li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Information</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-[#d3d6d8] text-xs">Booking</li>
              <li className="text-[#d3d6d8] text-xs">History</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="border-t border-white border-opacity-25 mt-8 pt-4 text-xs text-[#d3d6d8] flex flex-col sm:flex-row justify-between items-center">
            <div>
              <span className="inline-block align-middle mr-2">
                <img src="https://file.rendit.io/n/Lg4lUAh5EQOZNQZYjLY4.svg" alt="Location" className="w-4" />
              </span>
              1 Young st, Toronto, ON, M5E 1E5
            </div>
            <div className="mt-4 sm:mt-0">
              <span className="inline-block align-middle mr-2">
                <img src="https://file.rendit.io/n/ev2ST39VZhzWk6Wra3rI.svg" alt="Phone" className="w-4" />
              </span>
              123-456-7890
            </div>
            <div className="mt-4 sm:mt-0 mb-4 sm:mb-0">
              <span className="inline-block align-middle mr-2">
                <img src="https://file.rendit.io/n/88IORc8ykEumvEGdhRHX.svg" alt="Email" className="w-4" />
              </span>
              info@parkease.com
            </div>
          </div>
          <div className="text-center py-4 text-[#d3d6d8] text-xs font-light">
            Privacy Policy | Terms & Conditions | Do Not Share My Info
          </div>
        </div>
      </div>
      {/* Modal for Video and Canvas */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <h1 className="text-3xl font-bold text-gray-800">
              Scan the number plate
            </h1>
            <video ref={videoRef} width="440" height="280" autoPlay className="mt-2"></video>
            <canvas ref={canvasRef} width="440" height="280" style={{ display: "none" }}></canvas>
            <div className="flex justify-between items-center mt-4">
              <button onClick={captureImage} className="bg-green-500 text-white p-2 rounded">Capture Image</button>
              <button onClick={stopCamera} className="bg-red-500 text-white p-2 rounded">Close</button>
            </div>
          </div>
        </div>
      )}
      {notification && <Notification message={notification.message} type={notification.type} />}

    </div>
  );
}

