import React, { useEffect, useState } from "react";
import mad from "../../assests/55311.jpg";

const Navbar = () => {
  const [userName, setUserName] = useState("");
  const [userRole, setUserRole] = useState("");

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!studentId) return;

      try {
        const response = await fetch(
          `http://localhost:5005/api/students/${studentId}`
        );
        if (!response.ok) throw new Error("Failed to fetch user details");

        const data = await response.json();
        setUserName(data.fullName || "User");
        setUserRole(data.role || "Guest"); // Default role if not found
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [studentId]);

  return (
    <div
      style={{ fontFamily: "Poppins" }}
      className="bg-white flex w-full items-center px-10 pl-20 md:px-20 py-3 justify-between z-10"
    >
      {/* Left Section */}
      <div className="flex items-center gap-4">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl md:text-3xl text-orange-400 font-bold">
            Hello {userName} 👋
          </h1>
          <h2 className="text-black text-sm md:text-xl font-normal">
            Welcome to {userRole} Dashboard
          </h2>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex place-content-end gap-4">
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