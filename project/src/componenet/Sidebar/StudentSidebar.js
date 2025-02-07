import React, { useState } from "react";
import {
  MdSpaceDashboard,
  MdAssignment,
  MdOutlineLaptopChromebook,
  MdAccountCircle,
} from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import { GiNotebook } from "react-icons/gi";
import { HiOutlineLogout } from "react-icons/hi";
import { FaBars } from "react-icons/fa";
import appLogo from "../../assests/Ellipse 1.svg";
import { useLocation, useNavigate } from "react-router-dom"; // Import hooks

const StudentSidebar = ({ onMenuClick }) => {
  const location = useLocation(); // Get current route
  const navigate = useNavigate(); // Initialize navigation
  const [isOpen, setIsOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Define route mappings for the student
  const pageRoutes = {
    dashboard: "/student/dashboard",
    students: "/student/students",
    attendance: "/student/attendance",
    assignments: "/student/assignments",
    "score card": "/student/score-card",
    "class recordings": "/student/class-recordings",
    account: "/student/account",
  };

  const menuItems = [
    { name: "Dashboard", icon: <MdSpaceDashboard /> },
    { name: "Students", icon: <PiStudentFill /> },
    { name: "Attendance", icon: <GiNotebook /> },
    { name: "Assignments", icon: <MdAssignment /> },
    { name: "Score Card", icon: <MdOutlineLaptopChromebook /> },
    { name: "Class Recordings", icon: <MdOutlineLaptopChromebook /> },
    { name: "Account", icon: <MdAccountCircle /> },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    document.body.style.overflow = isOpen ? "auto" : "hidden";
  };

  const handleMenuClick = (page) => {
    onMenuClick(page);

    const route = pageRoutes[page.toLowerCase()]; // Normalize keys to lowercase
    if (route) navigate(route);

    if (window.innerWidth <= 768) toggleSidebar();
  };

  const handleLogoutClick = () => {
    setShowLogoutModal(true);
  };

  const handleLogoutYes = () => {
    setShowLogoutModal(false);
    navigate("/"); // Redirect to login page
  };

  const handleLogoutNo = () => {
    setShowLogoutModal(false);
  };

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-60 bg-[#F5A623] shadow-md p-4 z-50 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
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
        <ul className="mt-4 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === pageRoutes[item.name.toLowerCase()];
            return (
              <li
                key={item.name}
                className={`mb-2 flex items-center cursor-pointer p-2 font-semibold rounded-[3px] transition-all ${
                  isActive
                    ? "bg-[#50E3C2] text-[#000] border-l-8 border-l-[#4A90E2]"
                    : "hover:bg-[#dddddd8f]"
                }`}
                onClick={() => handleMenuClick(item.name)}
              >
                <span className="mr-3 text-2xl">{item.icon}</span>
                {item.name}
              </li>
            );
          })}
        </ul>

        {/* Logout Button */}
        <button
          className="mb-2 ml-1 flex items-center cursor-pointer w-full hover:bg-[#dddddd8f] text-[#000] p-2 font-semibold rounded-[3px] transition-all"
          onClick={handleLogoutClick}
        >
          <HiOutlineLogout className="mr-3 text-2xl" />
          Logout
        </button>
      </div>

      {/* Main Content */}
      <div className="w-full ml-0 md:ml-60">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden fixed top-4 left-4 z-50 bg-orange-500 text-white p-3 rounded-lg shadow-lg"
          onClick={toggleSidebar}
        >
          <FaBars className="text-2xl" />
        </button>
      </div>

      {/* Overlay for Mobile View */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold text-center mb-4">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-around">
              <button
                onClick={handleLogoutYes}
                className="bg-blue-500 text-white px-4 py-1 rounded-md hover:bg-blue-600"
              >
                Yes
              </button>
              <button
                onClick={handleLogoutNo}
                className="bg-red-500 text-white px-4 py-1 rounded-md hover:bg-red-600"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentSidebar;
