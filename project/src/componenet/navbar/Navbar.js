import React from "react";
import { RiVideoAddLine } from "react-icons/ri";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaBars } from "react-icons/fa"; // For the mobile menu toggle
import mad from "../../assests/si.jpg";

const Navbar = () => {
  return (
    <div
      style={{ fontFamily: "Poppins" }}
      className="bg-white flex   w-[85%] items-center px-4  md:px-10 py-3 fixed top-0 left-6  md:left-60 justify-between z-10 shadow-md"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Mobile Menu Icon */}
        <button className="md:hidden text-orange-400 text-2xl">
          <FaBars />
        </button>

        {/* Greeting */}
        <div>
          <h1 className="text-2xl md:text-3xl text-orange-400 font-bold">
            Hello Peter 👋
          </h1>
          <h2 className="text-black text-sm md:text-xl font-normal">
            Welcome to Trainee Dashboard
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex place-content-end  gap-4">
        {/* Action Icons */}
        {/* <div className="hidden md:flex gap-4">
          <RiVideoAddLine className="text-gray-500 text-2xl cursor-pointer hover:text-orange-400" />
          <IoMdNotificationsOutline className="text-gray-500 text-2xl cursor-pointer hover:text-orange-400" />
        </div> */}

        {/* Profile Picture */}
        <div>
          <img
            className="h-12 w-12 md:h-16 md:w-16 rounded-full bg-cover"
            src={mad}
            alt="Profile"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;



//     <div style={{fontFamily:'Poppins'}}>  <nav className="bg-white shadow-md p-4 fixed top-0 w-full z-10">
//     <div className="container mx-auto flex ">
// <div>
//  <p className='text-xl font-medium'>Sample Project</p> 
// {/* <img src={imge1} alt="YouTube Logo" className="w-10 h-10 mr-4" /> */}
// </div>
//       <h1 className="text-2xl font-bold"></h1>
//       <div className=' w-[80%] gap-4 pr-6 flex place-content-center'>
        
//         {/* Add search bar or other options */}
//         {/* <input 
//           type="text"   
//           placeholder="Search" 
//           className="border  p-2 w-[50%] rounded-2xl "

//         /> */}
//         <label className=" border p-2 w-[50%] rounded-2xl outline-none   flex items-center gap-2">
//   <input type="text" className="grow outline-none " placeholder="Search" />
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 16 16"
//     fill="currentColor"
//     className="h-6 w-6 opacity-70">
//     <path
//       fillRule="evenodd"
//       d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
//       clipRule="evenodd" />
//   </svg>
// </label>
// <div className='p-3 cursor-pointer rounded-full border border-gray-300'>
// <FaMicrophone />

// </div>
// {/* <div className='flex gap-4'>
// <RiVideoAddLine />
// <IoMdNotificationsOutline />
// <img src={imge2}  className="w-10 h-10 mr-4" />
// </div> */}
   
//       </div>
//       <div className='flex  gap-4 cursor-pointer'>
//         <div className='pt-2 '><RiVideoAddLine  className="w-7   h-7  " /> </div>
//        <div className='pt-2'><IoMdNotificationsOutline  className="w-7 h-7" />
//        </div>
// {/* <img src={imge2}  className="w-10 h-10  rounded-full bg-cover " /> */}
// </div>
//     </div>
    
//   </nav></div>