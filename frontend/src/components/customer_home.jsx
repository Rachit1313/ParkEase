import { useState, useEffect, useRef } from "react";
import { faFacebookF, faTwitter, faInstagram, faGoogle } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Notification from "./notification";
import moment from 'moment-timezone';
import Swal from 'sweetalert2';

function FeatureSection({ title, description, imgSrc }) {
  return (
    <div className="flex flex-col items-center text-center p-4">
      <img src={imgSrc} alt={title} className="mb-4 h-20" />
      <h2 className="text-xl font-semibold mb-2">{title}</h2>
      <p>{description}</p>
    </div>
  );
}


export default function Component() {

  const [garages, setGarages] = useState([]);
  const [checkInDate, setCheckInDate] = useState('');
  const [checkInTime, setCheckInTime] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [checkOutTime, setCheckOutTime] = useState('');
  const [availableSpots, setAvailableSpots] = useState([]);
  const [selectedGarageId, setSelectedGarageId] = useState(null);
  const [selectedSpot, setSelectedSpot] = useState(null);
  const navigate = useNavigate();
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
      console.error('Error during logout:', error);

    }
  };

  useEffect(() => {
    document.title = "Home";
    const favicon = document.querySelector("link[rel*='icon']") || document.createElement('link');
    favicon.type = 'image/png';
    favicon.rel = 'icon';
    favicon.href = "https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png";
    document.head.appendChild(favicon);
  }, []);

  const handleManageVehicles = () => {
    window.location.href = '/vehicles';
  };


  // Update the selected spot when the user selects a spot from the dropdown
  const handleSpotChange = (event) => {
    const spotId = event.target.value;
    const selectedSpotInfo = availableSpots.find((spot) => spot.SpotID == spotId);
    setSelectedSpot(selectedSpotInfo);
  };

  
  const formatDateTime = (date, time) => {
    // Combine date and time
    const dateTimeString = `${date} ${time}`;

    const etMoment = moment(dateTimeString, 'YYYY-MM-DD HH:mm');

    return etMoment.format('YYYY-MM-DDTHH:mm:ss.SSS');
};




  useEffect(() => {
    if (selectedGarageId && checkInDate && checkInTime && checkOutDate && checkOutTime) {
      // If not null, proceed to display spots
      displaySpots();
    }
  }, [selectedGarageId, checkInDate, checkInTime, checkOutDate, checkOutTime]);

  const handleGarageSelection = (event) => {
    const garageId = event.target.value;
    setSelectedGarageId(garageId);
  };

  useEffect(() => {
    // Fetch garage list from the backend
    const fetchGarages = async () => {
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "garageList");
        if (response.ok) {
          const data = await response.json();
          setGarages(data);
          if (garages.length > 0) {
            setSelectedGarageId(garages[0].GarageID);
            console.log('selected garage id: ' + selectedGarageId)
          }


        } else {
          showNotification("Failed to fetch garages", "failure");
        }
      } catch (error) {
        showNotification("Error during garage fetch", "failure");
      }
    };

    fetchGarages();
  }, []);

  const displaySpots = async () => {


    // Format check-in and check-out times
    const formattedCheckInTime = formatDateTime(checkInDate, checkInTime);
    const formattedCheckOutTime = formatDateTime(checkOutDate, checkOutTime);

    console.log("Check in: " + formattedCheckInTime)
    console.log("Check out: " + formattedCheckOutTime)

    if (!formattedCheckInTime || !formattedCheckOutTime) {
      return;
    }

    try {
      // Make API request to get available spots
      const response = await fetch(process.env.REACT_APP_BACKEND_URL + "available-spots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          garageId: selectedGarageId,  // Set your selected garage ID here
          checkInTime: formattedCheckInTime,
          checkOutTime: formattedCheckOutTime,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setAvailableSpots(data.availableSpots);
        console.log(data)
      } else {
        showNotification("Failed to fetch available spots", "failure");

      }
    } catch (error) {
      showNotification("Error during available spots fetch", "failure");

    }
  }

 
  const handleBookNow = async () => {
    // Use Swal for a stylish confirmation dialog
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, proceed to payment!'
    }).then((result) => {
      if (result.isConfirmed) {
        // User confirmed the action
        proceedWithBooking();
      }else{
        showNotification("Booking aborted.." , "failure");
      }
    });
  };

  const proceedWithBooking = async () => {
    
    if (true) {
      const storedCustomerId = localStorage.getItem("customerId");
      const formattedCheckInTime = formatDateTime(checkInDate, checkInTime);
      const formattedCheckOutTime = formatDateTime(checkOutDate, checkOutTime);

      try {
        // Make API request to create a new booking
        const createBookingResponse = await fetch(process.env.REACT_APP_BACKEND_URL + "create-booking", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            customerId: storedCustomerId,
            garageId: selectedGarageId,
            spotId: selectedSpot.SpotID,
            checkInTime: formattedCheckInTime,
            checkOutTime: formattedCheckOutTime,
          }),
        });

        if (createBookingResponse.ok) {
          const bookingData = await createBookingResponse.json();


          var taxDeduct = bookingData.totalFare * 0.2;
          var finalFare = (bookingData.totalFare + taxDeduct).toFixed(2); 


          localStorage.setItem('bookingId', bookingData.bookingId);
          localStorage.setItem('totalFare', finalFare);


          // Redirect user to /payment and pass bookingId and totalFare as props
          navigate("/payment", {
            state: {
              bookingId: bookingData.bookingId,
              totalFare: finalFare,
            },
          });
        } else {
          showNotification("Failed to create a new booking", "failure");

        }
      } catch (error) {
        showNotification("Error during booking creation\n" + error, "failure");

      }
    } else {

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
          <li className="mt-2 relative">
            <span className="font-bold text-blue-800">Home</span>
            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800"></span>
          </li>
          <li className="mt-2">
            <Link to="/history">History</Link>
          </li>
          <li className="mt-2">
            <Link to="/about">About Us</Link>
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

      {/* <div className="flex-grow flex">
        
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Customer Panel</h1>
          
          
        </div>
    </div> */}

      {/* <div className="bg-[#001840] font-poppins"> */}
      <div
        className="font-poppins min-h-screen flex items-center justify-center"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1604275291560-55f54cec0e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-white">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Welcome to</h1>
            <h2 className="text-8xl font-bold">PARKEASE</h2>
            <p className="text-lg mt-6 text-blue">
              "Your hassle-free parking companion. Find, reserve, and enjoy secure
              parking with just a few clicks - it's parking made easy for you!"
            </p>
          </div>

          <div className="mt-12 w-full max-w-4xl p-6 bg-white rounded-lg shadow-md">
            <div className="flex flex-wrap -mx-3">
              <div className="w-full md:w-1/2 px-3 mb-6">
                <label className="block text-xs font-bold mb-1">CHECK IN</label>
                <div className="flex">
                  <input
                    type="date"
                    className="bg-gray-800 text-xs font-medium text-white rounded-sm w-full p-2"
                    onChange={(e) => setCheckInDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]} // Set min attribute to today's date
                  />
                  <input
                    type="time"
                    className="bg-gray-800 text-xs font-medium text-white rounded-sm w-full p-2 ml-3"
                    onChange={(e) => setCheckInTime(e.target.value)}
                  />
                </div>
              </div>
              <div className="w-full md:w-1/2 px-3 mb-6">
                <div className="mb-6">
                  <label className="block text-xs font-bold mb-1">CHECK OUT</label>
                  <div className="flex">
                    <input
                      type="date"
                      className="bg-gray-800 text-xs font-medium text-white rounded-sm w-full p-2"
                      onChange={(e) => setCheckOutDate(e.target.value)}
                      min={checkInDate} // Use checkInDate for the min attribute
                    />
                    <input
                      type="time"
                      className="bg-gray-800 text-xs font-medium text-white rounded-sm w-full p-2 ml-3"
                      onChange={(e) => setCheckOutTime(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex mb-6">
              <div className="w-full md:w-1/2 pr-2">
                <label className="block text-xs font-bold mb-1">SELECT GARAGE</label>
                <select
                  className="bg-gray-800 text-xs font-medium text-white rounded-sm w-full p-2"
                  onChange={handleGarageSelection}
                >
                  {/* Dynamically populate garage options from the backend response */}
                  {garages.map((garage) => (
                    <option key={garage.GarageID} value={garage.GarageID}>
                      {garage.GarageName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="w-full md:w-1/2 pl-2">
                <label className="block text-xs font-bold mb-1">SELECT SPOTS</label>
                <select
                  className="bg-gray-800 text-xs font-medium text-white rounded-sm w-full p-2"
                  onChange={handleSpotChange}
                >
                  {availableSpots.map((spot) => (
                    <option key={spot.SpotID} value={spot.SpotID}>
                      {spot.SpotNumber}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="w-full mt-10">

              {selectedSpot ? (
                <button className="bg-gray-300 text-black font-bold text-lg rounded-lg p-3 ml-3 cursor-not-allowed" style={{ pointerEvents: 'none' }}>
                  <span>Rate: ${selectedSpot.HourlyRate}/hour</span>
                </button>
              ) : (
                <div className="text-gray-500">Please select a parking spot</div>
              )}




              <button className="bg-[#0044b5] text-white font-bold float-right text-lg rounded-lg p-3 hover:bg-blue-700 focus:outline-none focus:ring focus:border-blue-300"
                onClick={handleBookNow}
              >
                Book Now
              </button>



            </div>
          </div>
        </div>
      </div>


      <div className="bg-white text-gray-700">
        <br /><br />
        <div className="max-w-6xl mx-auto text-center mb-8">
          <h1 className="text-4xl font-semibold mb-2">Why Choose Us?</h1>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-12">
            <FeatureSection
              imgSrc="https://file.rendit.io/n/VX5LeTdqsNuL57qIFv7k.png"
              title="Contactless Convenience"
              description="In today's world, safety is paramount. With ParkEase, you can search, book, and pay for parking spaces without ever touching a ticket machine or interacting with attendants. It's a touchless parking experience."
            />
            <FeatureSection
              imgSrc="https://file.rendit.io/n/ertcYAlkwukLCn43r0kB.png"
              title="Secure and Legit"
              description="Our advanced license plate scanning technology ensures that only legitimate vehicles gain access to parking garages. Your car's safety is our priority."
            />
            <FeatureSection
              imgSrc="https://file.rendit.io/n/JGdZnNUFYr2W1fldFdRK.png"
              title="Effortless Parking"
              description="Say goodbye to circling for hours in search of a parking spot. ParkEase makes finding and reserving parking spaces a breeze, saving you time and frustration."
            />
          </div>
        </div>


      </div>
      <div className="relative w-full h-[400px]">
        <img
          src="https://file.rendit.io/n/yKlzZvC3agcvx3Yl4WDc.png"
          alt="Parking Feature Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40" />
        <div className="absolute top-0 left-0 w-full h-full flex flex-col justify-center items-center px-4 text-center">
          <p className="text-sm font-light tracking-[3px] uppercase text-white mb-2">
            Enjoy Your Stay
          </p>
          <h1 className="text-4xl uppercase text-white font-normal mb-1">
            Park with ease
          </h1>
          <p className="text-xl uppercase text-white font-light">
            peace of mind
          </p>
          <button
            type="button"
            className="mt-6 bg-orange-500 text-white text-sm font-medium tracking-[3px] uppercase py-3 px-8 rounded transition-all duration-200 hover:bg-orange-600 focus:outline-none focus:ring"
            onClick={() => { console.log('navigate to parking options page'); }}
          >
            browse PARKING
          </button>
          <p className="text-white font-light tracking-[0.3px] leading-[20px] mt-4">
            Let’s go hunting with tough gear from top garage
          </p>
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
              <li className="text-[#d3d6d8] text-xs">
              <Link to="/vehicles">Saved Vehicles</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Company</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-[#d3d6d8] text-xs"><Link to="/about">About</Link></li>
              <li className="text-[#d3d6d8] text-xs"><Link to="/ticket">Support and Ticketing</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold">Information</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-[#d3d6d8] text-xs"><Link to="/home">Booking</Link></li>
              <li className="text-[#d3d6d8] text-xs"><Link to="/history">History</Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
          <div className="border-t border-white border-opacity-25 mt-8 pt-4 text-xs text-[#d3d6d8] flex flex-col sm:flex-row justify-between items-center">
            <div>
              <span className="inline-block align-middle mr-2">
                <img src="https://file.rendit.io/n/Lg4lUAh5EQOZNQZYjLY4.svg" alt="Location" className="w-4" />
              </span>
              1 Yonge st, Toronto, ON, M5E 1E5
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
              noreplyparkease@gmail.com
            </div>
          </div>
          <div className="text-center py-4 text-[#d3d6d8] text-xs font-light">
            Privacy Policy | Terms & Conditions
          </div>
        </div>
      </div>
      {notification && <Notification message={notification.message} type={notification.type} />}

    </div>
  );
}
