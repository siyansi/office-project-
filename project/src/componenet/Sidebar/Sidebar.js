import React from 'react';
import { FaBook, FaStream, FaListAlt, FaHistory, FaClock, FaThumbsUp, FaVideo } from 'react-icons/fa';
import { FaAngleRight } from "react-icons/fa6";

const Sidebar = ({ onMenuClick }) => {
  const menuItems = [
    { name: "Dashboard", icon: <FaListAlt /> }, 
    { name: "Student", icon: <FaBook /> },       
    { name: "Attendance", icon: <FaStream /> },
  ];

  // const userItems = [
  //   { name: "Your channel", icon: <FaVideo /> },
  //   { name: "History", icon: <FaHistory /> },
  //   { name: "Playlists", icon: <FaListAlt /> },
  //   { name: "Your videos", icon: <FaVideo /> },
  //   { name: "Watch Later", icon: <FaClock /> },
  //   { name: "Liked videos", icon: <FaThumbsUp /> },
  // ];

  return (
    <div style={{ fontFamily: 'Poppins' }}>
      <div className="shadow-md w-60 p-3 fixed top- left-0 h-full bg-white">
        {/* Main Menu */}
        <header className="">
          <h1 className="text-xl font-bold">VETRI TECHNOLOGY SOLUTIONS</h1>
        </header>

        <ul className="mb-6">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="mb-2 flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => onMenuClick(item.name)}
            >
              <span className="mr-4 text-xl">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>

        {/* Divider */}
        <div className="border-t border-gray-300 my-4"></div>

        {/* User Section */}
        {/* <h3 className="mb-3 flex bg-gray-200 h-10 p-2 rounded-xl cursor-pointer font-semibold">You <span className='pt-1'><FaAngleRight className='' /> </span></h3>
        <ul>
          {userItems.map((item) => (
            <li
              key={item.name}
              className="mb-3 flex items-center cursor-pointer hover:bg-gray-100 p-2 rounded"
              onClick={() => onMenuClick(item.name)}
            >
              <span className="mr-4 ">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul> */}
      </div>
    </div>
  );
};

export default Sidebar;
