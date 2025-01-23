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

const Sidebar = ({ onMenuClick }) => {
  const [isOpen, setIsOpen] = useState(false); // State to control sidebar visibility on mobile screens

  const menuItems = [
    { name: "Dashboard", icon: <MdSpaceDashboard /> },
    { name: "Students", icon: <PiStudentFill /> },
    { name: "Attendance", icon: <GiNotebook /> },
    { name: "Assignments", icon: <MdAssignmentAdd /> },
    { name: "Store Card", icon: <GrScorecard /> },
    { name: "Class Recordings", icon: <MdOutlineLaptopChromebook /> },
    { name: "Account", icon: <MdAccountCircle /> },
    { name: "Logout", icon: <HiOutlineLogout /> },
  ];

  // Toggle the sidebar visibility
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ fontFamily: "Poppins" }} className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-orange-400 shadow-md p-4 transition-transform transform z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        {/* Header */}
        <header className="text-center">
          <h1 className="text-xl font-bold">VETRI TECHNOLOGY SOLUTIONS</h1>
        </header>

        {/* Menu Items */}
        <ul className="mt-12">
          {menuItems.map((item) => (
            <li
              key={item.name}
              className="mb-2 flex items-center cursor-pointer hover:bg-cyan-300 p-2 font-semibold rounded-lg"
              onClick={() => onMenuClick(item.name)}
            >
              <span className="mr-3 text-2xl">{item.icon}</span>
              {item.name}
            </li>
          ))}
        </ul>
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
        {/* <div className="p-8">
    
          <h1 className="text-3xl font-bold">Main Content</h1>
          <p className="mt-4">
            Scrollable content goes here. Add your main page content to this
            section. This content will scroll independently while the sidebar
            remains fixed on the left.
          </p>
          <div className="mt-10">
            {[...Array(50)].map((_, index) => (
              <p key={index}>This is a sample scrollable paragraph {index + 1}.</p>
            ))}
          </div>
        </div> */}
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
