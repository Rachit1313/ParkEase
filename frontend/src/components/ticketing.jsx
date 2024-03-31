import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import Notification from "./notification";

export default function Component() {
    const [subject, setSubject] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('Medium');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [tickets, setTickets] = useState([]);


    const [notification, setNotification] = useState(null);

    const showNotification = (message, type) => {
        console.log(message)
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    useEffect(() => {
        fetchTickets();
    }, []);

   
    const fetchTickets = () => {
        // Retrieve the customerID from localStorage
        const customerID = localStorage.getItem('customerId');

        // Construct the query string with the customerID
        const queryString = new URLSearchParams({ customerID }).toString();
        const url = `${process.env.REACT_APP_BACKEND_Ticket_URL}?${queryString}`;

        fetch(url)
            .then(response => response.json())
            .then(async (tickets) => {
                // Fetch responses for each ticket and add to the ticket data
                const ticketsWithResponses = await Promise.all(tickets.map(async (ticket) => {
                    const response = await fetch(`${process.env.REACT_APP_BACKEND_Ticket_URL}${ticket.TicketID}`);
                    const responseData = await response.json();
                    return { ...ticket, responses: responseData };
                }));
                setTickets(ticketsWithResponses);
            })
            .catch(error => console.error('Error fetching tickets:', error));
    };


    useEffect(() => {
        document.title = "Tickets"; // Set the page title
    }, []);

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

    const customerId = localStorage.getItem("customerId");

    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent default form submission

        // Prepare the data
        const ticketData = {
            customerID: customerId,
            subject,
            description,
            priority,
        };

        // POST request to backend
        fetch(process.env.REACT_APP_BACKEND_Ticket_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(ticketData),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                showNotification("Ticket created successfully", "failure");


            })
            .catch((error) => {
                console.error('Error:', error);
                showNotification("Failed to create ticket", "failure");

            });
    };

    return (
        <div className="bg-white text-gray-700">

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
                    <li className="mt-2">
                        <Link to="/history">History</Link>
                    </li>
                    <li className="mt-2">
                        <Link to="/about">About Us</Link>
                    </li>
                    <li className="mt-2 relative">
                        <span className="font-bold text-blue-800">Ticket</span>
                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-800"></span>
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

            <div className="px-6 py-8">
                <div className="max-w-3xl mx-auto bg-blue-50 p-6 border border-gray-200 rounded-lg shadow-sm">
                    <h1 className="text-xl font-bold mb-4">Submit a Support Ticket</h1>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject:</label>
                            <input type="text" id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="block w-full p-2 border border-gray-300 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium">Description:</label>
                            <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} className="block w-full p-2 border border-gray-300 rounded" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Priority:</label>
                            <select id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} className="block w-full p-2 border border-gray-300 rounded">
                                <option>Low</option>
                                <option selected>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Submit Ticket</button>
                            <button type="button" className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
            <div className="max-w-3xl mx-auto bg-blue-50 p-6 border border-gray-200 rounded-lg shadow-sm">
                <h1 className="text-xl font-bold mb-4">Your Tickets</h1>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {tickets.map((ticket) => (
                            <li key={ticket.TicketID}>
                                <div className="px-4 py-4 sm:px-6 flex justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-blue-700">Subject: {ticket.Subject}</p>
                                        <p className="mt-2 text-sm text-gray-500">Description: {ticket.Description}</p>
                                        <p className="mt-2 text-sm text-gray-500">Priority: {ticket.Priority}</p>
                                        <p className="mt-2 text-sm text-gray-500">Status: {ticket.Status}</p>
                                    </div>


                                </div>
                                <div>
                                    <h3 className="text-sm font-medium ml-5">Responses:</h3>
                                    {ticket.responses && ticket.responses.map((response, index) => (
                                        <p key={index} className="text-sm text-gray-500 ml-5">
                                            {response.ResponseText} - <span className="font-normal">{response.ResponseTime}</span>
                                        </p>
                                    ))}
                                </div>
                                <br/>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {notification && <Notification message={notification.message} type={notification.type} />}

        </div>
    );
}
