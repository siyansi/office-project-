import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdOutlineLaptopChromebook,
  MdAccountCircle,
} from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GiNotebook } from "react-icons/gi";
import { MdAssignmentAdd } from "react-icons/md";
import { GrScorecard } from "react-icons/gr";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import appLogo from "../../assests/Ellipse 1.svg";
const Sidebar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility on mobile screens
  const [selectedPage, setSelectedPage] = useState("Dashboard"); // State to track the selected page

  const menuItems = [
    { name: "Dashboard", icon: <MdSpaceDashboard /> },
    { name: "Students", icon: <PiStudentFill /> },
    { name: "Attendance", icon: <GiNotebook /> },
    { name: "Assignments", icon: <MdAssignmentAdd /> },
    { name: "Store Card", icon: <GrScorecard /> },
    { name: "Class Recordings", icon: <MdOutlineLaptopChromebook /> },
    { name: "Account", icon: <MdAccountCircle /> },
    // { name: "Logout", icon: <HiOutlineLogout /> },
  ];

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  // Handle menu item click
  const handleMenuClick = (page) => {
    setSelectedPage(page);
    onMenuClick(page); // Call the parent callback if provided
  };

  return (
    <div style={{ fontFamily: "Poppins" }} className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#F5A623] shadow-md p-4  z-50  `}
      >
        {/* Header */}
        <div className="flex flex-col items-center gap-3 mb-3">
          <img src={appLogo} alt="app-logo" className="w-[80px] h-[80px]" />

          <header className="text-center">
            <h1 className="text-xl font-bold">VETRI TECHNOLOGY SOLUTIONS</h1>
          </header>
        </div>
        <hr />
        {/* Menu Items */}
        <ul className="mt-4">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={`mb-2 flex items-center cursor-pointer p-2 font-semibold rounded-[3px] transition-all ${
                selectedPage === item.name
                  ? "bg-[#50E3C2] text-[#000] border-l-8 border-l-[#4A90E2]"
                  : "hover:bg-[#dddddd8f]"
              }`}
              onClick={() => handleMenuClick(item.name)}
            >
              <span className="mr-3 text-2xl">{item.icon}</span>
              {item.name}
            </li>

          ))}
        </ul>
        <button className="mb-2 ml-1 flex items-center cursor-pointer w-full hover:bg-[#dddddd8f]  text-[#000]  p-2 font-semibold rounded-[3px] transition-all"> <HiOutlineLogout className="mr-3 text-2xl" />Logout</button>
      </div>

      {/* Main Content */}
      <div className="ml- w-full overflow-y-auto md:ml-60">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-3 rounded-lg shadow-lg"
          onClick={toggleSidebar}
        >
          <FaBars className="text-2xl" />
        </button>

        {/* Content */}
      </div>

      {/* Overlay for mobile view */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}
    </div>
  );
};

export default Sidebar;