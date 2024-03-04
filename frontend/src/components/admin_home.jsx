import { useState, useEffect, useRef } from "react";

export default function Component() {
  return (
    <div className="flex flex-col h-screen bg-white">
    <div className="p-4 flex justify-between items-center bg-white border-b shadow-sm">
        <img
            src="https://file.rendit.io/n/Sdx696lWt20H3dmB4Qmz.png"
            alt="Logo"
            className="h-10"
        />
        <button className="p-2 rounded-full hover:bg-gray-100">
            <img
                src="https://file.rendit.io/n/furP2W9JLemf4YLkg3jt.svg"
                alt="Help"
                className="h-6 w-6"
            />
        </button>
    </div>
    
    <div className="flex-grow flex">
        
        <div className="w-full max-w-md bg-white p-8 shadow-lg rounded-lg">
          <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
          
          
        </div>
    </div>
</div>  
  );
}
