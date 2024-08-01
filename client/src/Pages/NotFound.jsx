import React from "react";
import { useNavigate } from "react-router-dom";

function NotFound() {
    const navigate = useNavigate()
  return (
    <div className="w-full flex flex-col justify-center items-center h-screen bg-[#1A2238]">
      <h1 className="text-9xl text-white font-extrabold tracking-widest">404</h1>
      <div className="bg-black text-white px-2 text-xl rounded rotate-12 absolute">Page not found</div>
      <button className="mt-5">
        <a className="relative inline-block text-sm font-medium text-[#FFA63D] group active:text-yellow-500 focus: outline-none focus:ring">
            <span onClick={()=>navigate(-1)} className="relative px-8 py-3 block bg-[#1A2238] border border-current">
            Go Back
            </span>
        </a>
       
      </button>
    </div>
  );
}

export default NotFound;
