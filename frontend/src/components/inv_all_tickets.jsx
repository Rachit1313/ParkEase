import React, { useEffect, useState } from 'react';
import Notification from "./notification";
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
const AdminTicketsPanel = () => {
    
    const [tickets, setTickets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [activeTicketId, setActiveTicketId] = useState(null);
    const [responseText, setResponseText] = useState('');
    const [responderID, setResponderID] = useState('');
    const navigate = useNavigate()
    const [notification, setNotification] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    
    useEffect(() => {
        const userType = localStorage.getItem('userType');
        if (userType === 'Invigilator') {
            const invigilatorId = localStorage.getItem('InvigilatorID');
            setResponderID(invigilatorId || ''); 
        }
    }, []);

    useEffect(() => {
        document.title = "Tickets Panel"; // Set the page title
    }, []);


    const showNotification = (message, type) => {
        console.log(message)
        setNotification({ message, type });
        setTimeout(() => setNotification(null), 3000);
    };

    const handleAccountClick = () => {
        setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    };

    useEffect(() => {
        fetchTickets();
    }, []);

    

    const fetchTickets = () => {
        fetch(process.env.REACT_APP_BACKEND_Ticket_URL)
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



    const handleResolveClick = (ticketId) => {
        setActiveTicketId(ticketId);
        setIsModalOpen(true);
    };

    const handleCloseTicket = (ticketId) => {
        // Replace with your actual endpoint and adjust method/headers as needed
        fetch(process.env.REACT_APP_BACKEND_Ticket_URL + 'status', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticketID: ticketId,
                status: 'Closed',
            }),
        })
            .then(response => {
                if (!response.ok) {
                    showNotification('Network response was not ok.', 'failure');


                }
                return response.json();
            })
            .then(() => {
                showNotification('Ticket closed successfully', 'success');
                fetchTickets();
            })
            .catch((error) => {
                console.error('Error:', error);
                showNotification('Failed to close the ticket', 'failure');
            });
    };

    const handleTicketResponse = (e) => {
        e.preventDefault();
        // Replace with your actual endpoint and adjust method/headers as needed
        fetch(process.env.REACT_APP_BACKEND_Ticket_URL + 'respond', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                ticketID: activeTicketId,
                responderID,
                responseText,
            }),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                alert('Response added successfully');
                setIsModalOpen(false); // Close modal upon success
                fetchTickets();
            })
            .catch((error) => {
                console.error('Error:', error);
                alert('Failed to respond to ticket');
            });
    };


    return (
        <div className="px-1 py-1">

            <div className="p-4 flex justify-between items-center bg-white border-b shadow-sm">
                <img
                    src="https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png"
                    alt="Logo"
                    className="h-10"
                />
                <ul className="flex justify-end gap-16">
                    <li className="mt-2">
                        <Link to="/invigilator/home">Home</Link>
                    </li>
                    <li className="mt-2 relative">
                        <span className="font-bold text-blue-800">Tickets</span>
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

            <div className="max-w-4xl mx-auto">
                <br /> <br />
                <h1 className="text-xl font-bold mb-4">Tickets</h1>
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
                                    <div className="ml-4 flex-shrink-0">
                                        <button
                                            onClick={() => handleResolveClick(ticket.TicketID)}
                                            className={`bg-blue-700 text-white px-4 py-2 rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50 mr-5 ${ticket.Status === 'Closed' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={ticket.Status === 'Closed'} // Disable button if ticket is closed
                                        >
                                            Resolve
                                        </button>
                                        <button
                                            onClick={() => handleCloseTicket(ticket.TicketID)}
                                            className={`bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 mt-2 ${ticket.Status === 'Closed' ? 'opacity-50 cursor-not-allowed' : ''}`}
                                            disabled={ticket.Status === 'Closed'} // Disable button if ticket is closed
                                        >
                                            Close
                                        </button>
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
            {isModalOpen && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full" id="my-modal">
                    <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
                        <div className="mt-3 text-center">

                            <h3 className="text-lg leading-6 font-medium text-gray-900">Resolve Ticket</h3>
                            <form onSubmit={handleTicketResponse} className="mt-2">
                                <input type="text" placeholder="Responder ID" value={responderID} onChange={(e) => setResponderID(e.target.value)} className="px-4 py-2 border rounded-lg text-gray-700 mt-2 w-full" required />
                                <textarea placeholder="Response" value={responseText} onChange={(e) => setResponseText(e.target.value)} className="px-4 py-2 border rounded-lg text-gray-700 mt-2 w-full" required></textarea>
                                <div className="items-center px-4 py-3">
                                    <button id="ok-btn" className="px-4 py-2 bg-green-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300">
                                        Submit Response
                                    </button>
                                </div>
                            </form>
                            <div className="items-center px-4 py-3">
                                <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 bg-gray-500 text-white text-base font-medium rounded-md w-full shadow-sm hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300">
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {notification && <Notification message={notification.message} type={notification.type} />}


        </div>
    );
};

export default AdminTicketsPanel;
