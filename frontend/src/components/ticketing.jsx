import { useState, useEffect, useRef } from "react";

export default function Component() {
    return (
        <div className="bg-white text-gray-700">
            <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <img src="https://file.rendit.io/n/qvQVEGB0ci0WLtsXYWgL.png" alt="Parkease logo" className="h-8" />
                <nav className="space-x-4">
                    <a href="#" className="text-gray-700 hover:text-blue-800">Home</a>
                    <a href="#" className="text-gray-700 hover:text-blue-800">Shift Log</a>
                    <a href="#" className="text-blue-700 font-bold">Support</a>
                </nav>
            </header>
            <div className="px-6 py-8">
                <div className="max-w-3xl mx-auto bg-blue-50 p-6 border border-gray-200 rounded-lg shadow-sm">
                    <h1 className="text-xl font-bold mb-4">Submit a Support Ticket</h1>
                    <form>
                        <div className="mb-4">
                            <label htmlFor="subject" className="block mb-2 text-sm font-medium">Subject:</label>
                            <input type="text" id="subject" className="block w-full p-2 border border-gray-300 rounded" required />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block mb-2 text-sm font-medium">Description:</label>
                            <textarea id="description" className="block w-full p-2 border border-gray-300 rounded" rows="4" required></textarea>
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium">Add attachments: (optional)</label>
                            <input type="file" className="block w-full text-sm text-blue-600 file:mr-4 file:py-2 file:px-4 file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100" />
                            <p className="text-sm text-gray-500 mt-1">or drop files here</p>
                        </div>
                        <div className="mb-4">
                            <label htmlFor="priority" className="block mb-2 text-sm font-medium">Priority:</label>
                            <select id="priority" className="block w-full p-2 border border-gray-300 rounded">
                                <option>Low</option>
                                <option>Medium</option>
                                <option>High</option>
                            </select>
                        </div>
                        <div className="flex space-x-4">
                            <button type="submit" className="px-6 py-2 bg-blue-700 text-white rounded hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50">Submit Ticket</button>
                            <button type="button" className="px-6 py-2 border border-gray-300 rounded hover:bg-gray-100">Cancel</button>
                        </div>
                    </form>
                </div>
                {/* <div className="mt-8">
                    <img src="https://file.rendit.io/n/juvaUtoGQpEaIpNReOBq.png" alt="Support background" className="max-w-full mx-auto" />
                </div> */}
            </div>
        </div>
    )
}

