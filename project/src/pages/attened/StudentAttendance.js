import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const StudentAttendance = () => {
  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const navigate = useNavigate();

  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) {
      toast.error("User not logged in!");
      navigate("/login");
      return;
    }

    // Fetch attendance data for the logged-in student
    const fetchAttendance = async () => {
      try {
        const response = await fetch(
          `http://localhost:5005/api/students/attendance/${studentId}`
        );

        if (!response.ok) throw new Error("Failed to fetch attendance");

        const data = await response.json();
        setAttendanceRecords(data || []); // Ensure correct data handling
      } catch (error) {
        console.error("Error fetching attendance:", error);
        toast.error("Failed to load attendance.");
      }
    };

    fetchAttendance();
  }, [studentId, navigate]);

  const handleDownload = () => {
    const rowGap = 10; // Gap between rows in pixels
    const rowHeight = 50; // Increased row height for better spacing
    const headerHeight = 60; // Taller header for emphasis
    const tableWidth = 1000; // Wider table for better readability
    const svgHeight = headerHeight + attendanceRecords.length * rowHeight + 100; // Dynamic height with extra padding

    const svgContent = `
      <svg xmlns="http://www.w3.org/2000/svg" width="${tableWidth}" height="${svgHeight}">
        <style>
          /* Global Styles */
          text { font-family: 'Poppins', sans-serif; fill: #333; }
          .header { font-size: 20px; font-weight: 600; fill: white; }
          .row { font-size: 16px; fill: #444; }
          .cell { stroke: #e0e0e0; stroke-width: 1px; fill: #ffffff; }
          .header-bg { fill: #2c3e50; } /* Dark blue header */
          .status-present { fill: #28a745; font-weight: 600; } /* Green for Present */
          .status-absent { fill: #dc3545; font-weight: 600; } /* Red for Absent */
          .status-not-marked { fill: #6c757d; font-weight: 600; } /* Gray for Not Marked */
          .title { font-size: 24px; font-weight: 700; fill: #2c3e50; }
          .shadow { filter: drop-shadow(2px 2px 4px rgba(0, 0, 0, 0.1)); }
        </style>
  
        <!-- Background -->
        <rect width="100%" height="100%" fill="#f8f9fa" stroke="none"/>
  
        <!-- Title -->
        <text x="50%" y="40" text-anchor="middle" class="title shadow">Student Attendance Report</text>
  
        <!-- Table Headers -->
        <rect x="40" y="60" width="${
          tableWidth - 80
        }" height="${headerHeight}" class="header-bg shadow" rx="8" ry="8"/>
        <text x="60" y="100" class="header">Date</text>
        <text x="550" y="100" class="header">Status</text>
  
        <!-- Table Rows -->
        ${attendanceRecords
          .map((record, index) => {
            const yPosition = headerHeight + index * (rowHeight + rowGap) + 70;
            const statusClass =
              record.status === "Present"
                ? "status-present"
                : record.status === "Absent"
                ? "status-absent"
                : "status-not-marked";
            return `
            <rect x="40" y="${yPosition}" width="${
              tableWidth - 80
            }" height="${rowHeight}" class="cell shadow" rx="6" ry="6"/>
            <text x="60" y="${yPosition + 35}" class="row">${record.date}</text>
            <text x="550" y="${
              yPosition + 35
            }" class="${statusClass}">${record.status}</text>
          `;
          })
          .join("")}
      </svg>
    `;

    const blob = new Blob([svgContent], {
      type: "image/svg+xml;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance_report.svg";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 md:px-16 min-h-screen w-full font-sans">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        My Attendance
      </h1>
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all"
        >
          Download SVG
        </button>
      </div>
      {attendanceRecords.length === 0 ? (
        <p className="text-gray-600 text-lg">No attendance records found.</p>
      ) : (
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          <table className="min-w-full bg-white rounded-lg overflow-hidden">
            <thead className="bg-[#F5A623]">
              <tr>
                <th className="px-4 py-2 text-left border-b-8  pl-10 border-white text-sm md:text-base text-white">
                  Date
                </th>
                <th className="px-4 py-2 text-left border-b-8 pl-8 border-white text-sm md:text-base text-white">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {attendanceRecords.map((record, index) => (
                <tr
                  key={index}
                  className="bg-[#50E3C2] text-gray-800 transition-all duration-300 hover:bg-teal-400"
                >
                  <td className="px-4 py-3 border-b-8 border-white rounded-l-xl text-sm md:text-base">{record.date}</td>
                  <td className="px-4 py-3 border-b-8 border-white rounded-r-xl text-sm md:text-base">
                    <span
                      className={`px-3 py-1 rounded-md text-white font-semibold ${
                        record.status === "Present"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {record.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default StudentAttendance;