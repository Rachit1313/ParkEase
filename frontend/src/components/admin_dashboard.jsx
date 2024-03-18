import { useState, useEffect, useRef } from "react";

export default function Component() {

    const invigilatorsData = [
        {
            name: "John Cena",
            email: "John@gmail.com",
            phone: "+1-123-456-7890",
            joinedDate: "22 Sep 23",
            moreIconLink: "https://file.rendit.io/n/ATwjqzRaR1PZeLxejpe8.svg"
        },
        {
            name: "Silvia Rowe",
            email: "Silvia@gmail.com",
            phone: "+1-123-456-7890",
            joinedDate: "14 Aug 23",
            moreIconLink: "https://file.rendit.io/n/NaXDA8qx5xGlKMDGgcdB.svg"
        }
    ];

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
                    <div className="flex items-center space-x-3">
                        <img
                            src="https://file.rendit.io/n/ul79kRkju1tnPuMHMVEa.svg"
                            alt="Notification Bell Icon"
                            className="h-6 w-6"
                        />
                        <img
                            src="https://file.rendit.io/n/R3xTczwIDy8xj13Znh49.svg"
                            alt="Settings Cog Icon"
                            className="h-6 w-6"
                        />

                        <img
                            src="https://file.rendit.io/n/cezRbURLsp1Dgk7DiXTi.svg"
                            alt="Logout Icon"
                            className="h-6 w-6"
                        />
                    </div>
                </div>

                {/* Social Media Links */}
                <div className="flex justify-end space-x-3 p-4">
                    <img
                        src="https://file.rendit.io/n/a3RqSyuTxOmKFfCkQR6X.svg"
                        alt="Facebook Icon"
                        className="h-4 w-4"
                    />
                    <img
                        src="https://file.rendit.io/n/OKd9e7Xg8qUVRwoP8PiF.svg"
                        alt="Blog Icon"
                        className="h-4 w-4"
                    />
                    <img
                        src="https://file.rendit.io/n/jyT1mJlCaX3c0lxn3Unr.svg"
                        alt="Twitter Icon"
                        className="h-4 w-4"
                    />
                    <img
                        src="https://file.rendit.io/n/wQCmpw7o42V86PiorxYp.svg"
                        alt="YouTube Icon"
                        className="h-4 w-4"
                    />
                </div>
            </div>


            <div className="flex h-auto bg-[#f1f1f1]">
                <aside className="flex flex-col w-1/4 p-8 bg-white">
                    <div className="flex items-center mb-16">
                        <img
                            src="https://file.rendit.io/n/l0Mp9QqX9mIz0oSMwX6V.png"
                            alt="User"
                            className="w-20 h-20 rounded-full mr-4"
                        />
                        <div>
                            <h2 className="text-base text-[#888888]">Welcome,</h2>
                            <h1 className="text-xl font-bold">Louis Pierce</h1>
                        </div>
                    </div>
                    <nav>
                        <a href="#" className="block py-4 px-8 text-white font-bold bg-[#0044b5]">Dashboard</a>
                        <a href="#" className="block py-4 px-8 text-[#888888] hover:bg-gray-200">Customers</a>
                        <a href="#" className="block py-4 px-8 text-[#888888] hover:bg-gray-200">Invigilators</a>
                        <a href="#" className="block py-4 px-8 text-[#888888] hover:bg-gray-200">Parking Spots</a>
                        <a href="#" className="block py-4 px-8 text-[#888888] hover:bg-gray-200">Ticket Resolution</a>
                        <a href="#" className="block py-4 px-8 text-[#888888] hover:bg-gray-200">Transactions</a>
                    </nav>
                </aside>
                <main className="flex-1 p-8">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col justify-between p-4 bg-[#7ED1FF] text-white rounded-lg h-36">
                            <span className="text-4xl font-bold">20</span>
                            <span className="font-semibold">Total parking slots</span>
                        </div>
                        <div className="flex flex-col justify-between p-4 bg-[#5BB55B] text-white rounded-lg h-36 col-span-2">
                            <span className="text-3xl font-bold">18K</span>
                            <span className="font-semibold">Available parking slots</span>
                        </div>
                    </div>
                    <br />
                    <div className="font-inter text-sm">
                        <div className="text-headerText mb-4">
                            <h2 className="text-lg font-semibold">Invigilators</h2>
                        </div>
                        <div className="bg-recentSectionBackground p-2 mb-4">
                            <span className="text-headerText">Recent one</span>
                            {' '}
                            <span className="font-semibold">John Cena</span>
                        </div>
                        <div className="overflow-hidden rounded-md shadow">
                            <div className="bg-tableHeaderBackground px-4 py-2">
                                <div className="flex justify-between">
                                    <span className="text-tableHeaderText">Name</span>
                                    <span className="text-tableHeaderText">Email ID</span>
                                    <span className="text-tableHeaderText">Phone Number</span>
                                    <span className="text-tableHeaderText">Joined date</span>
                                </div>
                            </div>
                            <div>
                                {invigilatorsData.map((invigilator, index) => (
                                    <div
                                        key={index}
                                        className={`flex justify-between items-center px-4 py-2 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
                                    >
                                        <span className="font-semibold">{invigilator.name}</span>
                                        <span>{invigilator.email}</span>
                                        <span>{invigilator.phone}</span>
                                        <div className="flex items-center">
                                            <span className="text-listDateColor mr-2">{invigilator.joinedDate}</span>
                                            <img src={invigilator.moreIconLink} alt="More actions" className="h-4 w-4" />
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
                            <div className="flex flex-col justify-between mr-4 text-sm">
                                <span>$1000</span>
                                <span>$750</span>
                                <span>$500</span>
                                <span>$250</span>
                                <span>$0</span>
                            </div>
                            <div className="relative w-full">
                                <img className="w-full" src="https://file.rendit.io/n/HQVwtryp8STAPLa7xslf.svg" alt="Chart" />
                                <div className="absolute inset-0 flex items-end justify-between px-2 pb-2">
                                    <span className="text-xxs">Jan</span>
                                    <span className="text-xxs">Feb</span>
                                    <span className="text-xxs">Mar</span>
                                    <span className="text-xxs">Apr</span>
                                    <span className="text-xxs">May</span>
                                    <span className="text-xxs">Jun</span>
                                    <span className="text-xxs">Jul</span>
                                    <span className="text-xxs">Aug</span>
                                    <span className="text-xxs">Sep</span>
                                    <span className="text-xxs">Oct</span>
                                    <span className="text-xxs">Nov</span>
                                    <span className="text-xxs">Dec</span>
                                </div>
                                <div className="absolute inset-0 flex">
                                    {
                                        // This is just a placeholder for vertical grid lines, actual implementation will vary
                                        Array.from({ length: 12 }).map((_, idx) => (
                                            <span key={idx} className="flex-1 border-r border-dashed border-gray-200"></span>
                                        ))
                                    }
                                </div>
                            </div>
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
                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            A12
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            10th Oct, 4:50PM
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline">
                                            John@gmail.com
                                        </td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                            A12
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                            10th Oct, 4:50PM
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-blue-600 underline">
                                            John@gmail.com
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}

