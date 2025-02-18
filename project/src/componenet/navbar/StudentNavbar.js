import React, { useEffect, useState } from "react";
import mad from "../../assests/55311.jpg";

const StudentNavbar = () => {
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

export default StudentNavbar;

