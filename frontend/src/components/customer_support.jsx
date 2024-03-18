import { useState, useEffect, useRef } from "react";

export default function Component() {
  return (
    <div className="overflow-hidden bg-white pb-5 w-full">
      
      <header className="bg-white px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                <img src="https://file.rendit.io/n/qvQVEGB0ci0WLtsXYWgL.png" alt="Parkease logo" className="h-8" />
                <nav className="space-x-4">
                    <a href="#" className="text-gray-700 hover:text-blue-800">Profile</a>
                </nav>
            </header>
      
      <div className="flex md:flex-row flex-col justify-between items-start px-4 py-6">
        <div className="flex md:flex-row flex-col md:items-start items-center md:gap-12 gap-6 w-full">
          {/* <img
            src="https://file.rendit.io/n/TFndtfAgj1BgwwQBoJNw.png"
            alt="logo"
            className="mb-4 md:mb-0"
          /> */}
          <div className="flex space-x-6">
            <button className="text-lg font-medium">All</button>
            <button className="text-lg font-medium text-[#7e7e7e]">Open</button>
            <button className="text-lg font-medium text-[#7e7e7e]">Closed</button>
          </div>
        </div>
        <div className="md:mt-0 mt-4 w-full md:w-auto">
          <button
            id="CreateTicketButton"
            className="text-base font-medium text-white bg-[#001a72] w-full md:w-auto px-6 py-3 rounded-lg shadow-md hover:bg-[#000561]"
          >
            Create Ticket
          </button>
        </div>
      </div>
      <hr className="my-4 border-t border-[#d9d9d9]" />
      <div className="px-4">
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <input
          type="text"
          id="search"
          className="border border-gray-300 rounded-lg py-2 px-4 w-full mb-6"
          placeholder="Search"
        />
      </div>
      <div className="w-full px-4">
        {/* Ticket List would be generated here, demonstrating only the first ticket's structure */}
        <div className="border border-black rounded-lg p-4 mb-4">
          <div className="flex justify-between items-start mb-2">
            <span className="text-lg font-semibold text-[#7e7e7e]">#JK2917</span>
            <span className="text-lg font-semibold text-[#7e7e7e]">November 7, 2023</span>
          </div>
          <div className="mb-2">
            <h3 className="text-xl font-semibold">Not able to book a parking spot</h3>
            <p className="text-base">
              I'm unable to book a parking spot. It shows me page not found error when I click confirm.
            </p>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex space-x-2">
              <span className="text-sm font-semibold text-[#1a5aff] bg-blue-100 py-1 px-2 rounded-lg">
                Low
              </span>
              <span className="text-sm font-semibold text-[#ec0000] bg-red-100 py-1 px-2 rounded-lg">
                Open
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <img
                src="https://file.rendit.io/n/klIckUln6RfOwNkQQU2b.svg"
                alt="comments"
                className="w-3 h-3"
              />
              <span className="text-sm font-semibold text-[#7e7e7e]">2</span>
            </div>
            <button className="text-lg text-[#7e7e7e]">Theresa Webb</button>
          </div>
        </div>
        {/* More tickets would follow */}
      </div>
    </div>
  );
}

