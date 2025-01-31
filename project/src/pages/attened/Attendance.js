import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  ); // Default to today’s date
  const rowsPerPage = 5;



  const notify = (name, status) => {
    toast(
      <span className="font-[poppins] font-semibold">
        Attendance updated: <span className="text-blue-500">{name}</span> is{" "}
        <span className={status === "Present" ? "text-green-500" : "text-red-500"}>
          {status}
        </span>{" "}
        for today.
      </span>,
      {
        icon: status === "Present" ? "✅" : "❌",
        duration: 4000,
        position: "top-right",
        style: {
          fontFamily: "Poppins, sans-serif",
          fontWeight: "bold",
          borderRadius: "8px",
          padding: "14px",
          background: "#fff",
          color: "#333",
        },
      }
    );
  };
  
  // Fetch all students or filter by date
  const fetchStudents = async (date = "") => {
    try {
      let url = "http://localhost:5005/api/students/all";
      if (date) {
        url = `http://localhost:5005/api/students/attendance?date=${date}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setStudents(
        data.map((student) => ({
          ...student,
          status:
            student.attendance?.find((att) => att.date === date)?.status ||
            null,
        }))
      );
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = students.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(students.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Mark attendance and update backend
  const handleStatusChange = async (id, status, name) => {
    // Get today's date in YYYY-MM-DD format
    const today = new Date().toISOString().split("T")[0];
  
    // Check if the selected date is not today
    if (selectedDate !== today) {
      toast("You can only update attendance for today's date.");
      return;
    }
  
    if (!selectedDate) {
      alert("Please select a date first.");
      return;
    }
  
    try {
      const response = await fetch(
        "http://localhost:5005/api/students/attendance/mark",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            registerNumber: id,
            date: selectedDate,
            status,
          }),
        }
      );
  
      if (response.ok) {
        notify(name, status);
        setStudents((prevStudents) =>
          prevStudents.map((student) => {
            if (student.registerNumber === id) {
              // Find the attendance record for the selected date
              const updatedAttendance = student.attendance.map((record) =>
                record.date === selectedDate ? { ...record, status } : record
              );
  
              // If no record exists for the date, add a new one
              if (
                !student.attendance.some((record) => record.date === selectedDate)
              ) {
                updatedAttendance.push({ date: selectedDate, status });
              }
  
              return { ...student, attendance: updatedAttendance };
            }
            return student;
          })
        );
      } else {
        console.error("Failed to update attendance.");
      }
    } catch (error) {
      console.error("Error marking attendance:", error);
    }
  };

  // Filter attendance by selected date
  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    fetchStudents(date);
  };

  const handleDownload = () => {
    const rowGap = 10; // Gap between rows in pixels

    const rowHeight = 50; // Increased row height for better spacing
    const headerHeight = 60; // Taller header for emphasis
    const tableWidth = 1000; // Wider table for better readability
    const svgHeight = headerHeight + students.length * rowHeight + 100; // Dynamic height with extra padding
  
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
        <rect x="40" y="60" width="${tableWidth - 80}" height="${headerHeight}" class="header-bg shadow" rx="8" ry="8"/>
        <text x="60" y="100" class="header">Student ID</text>
        <text x="250" y="100" class="header">Name</text>
        <text x="550" y="100" class="header">Course</text>
        <text x="800" y="100" class="header">Status</text>
  
        <!-- Table Rows -->
        ${students
          .map((student, index) => {
            const attendanceRecord = student.attendance.find(
              (record) => record.date === selectedDate
            );
            const status = attendanceRecord ? attendanceRecord.status : "Not Marked";
            const statusClass =
              status === "Present"
                ? "status-present"
                : status === "Absent"
                ? "status-absent"
                : "status-not-marked";
                const yPosition = headerHeight + index * (rowHeight + rowGap) + 70;
            return `
            <rect x="40" y="${yPosition}" width="${tableWidth - 80}" height="${rowHeight}" class="cell shadow" rx="6" ry="6"/>
            <text x="60" y="${yPosition + 35}" class="row">${student.registerNumber}</text>
            <text x="250" y="${yPosition + 35}" class="row">${student.fullName}</text>
            <text x="550" y="${yPosition + 35}" class="row">${student.course}</text>
            <text x="800" y="${yPosition + 35}" class="${statusClass}">${status}</text>
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
    <div className="p-6 min-h-screen w-full font-sans md:px-20">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">
        Attendance
      </h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <label
            htmlFor="date"
            className="text-gray-700 font-medium text-sm md:text-base"
          >
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="appearance-none px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <div className="flex gap-4">
          <button
            onClick={handleDownload}
            className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all"
          >
            Download CSV
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#F5A623]">

            <tr>
              <th className="px-4 py-2 text-left border-b-8 border-white text-sm md:text-base text-white">
                Student ID
              </th>
              <th className="px-4 py-2 text-left border-b-8 border-white text-sm md:text-base text-white">
                Student Name
              </th>
              <th className="px-4 py-2 text-left border-b-8 border-white text-sm md:text-base text-white">
                Course
              </th>
              <th className="px-4 py-2 text-center border-b-8 border-white text-sm md:text-base text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student) => (
              <tr
                key={student.registerNumber}
                className="bg-[#50E3C2] text-gray-800 transition-all duration-300 hover:bg-teal-400"
              >
                <td className="px-4 py-3 border-b-8 border-white rounded-l-xl text-sm md:text-base">
                  {student.registerNumber}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-sm md:text-base">
                  {student.fullName}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-sm md:text-base">
                  {student.course}
                </td>
                {/* <td className="px-4 py-2 border-b-8 border-white rounded-r-xl text-center">
                  {(() => {
                    const attendanceRecord = student.attendance.find(
                      (record) => record.date === selectedDate
                    );

                    // If attendance has been marked, show a dropdown to change it
                    if (attendanceRecord) {
                      return (
                        <select
                          value={attendanceRecord.status}
                          onChange={(e) =>
                            handleStatusChange(
                              student.registerNumber,
                              e.target.value
                            )
                          }
                          className={`px-3 py-1 text-xs md:text-sm rounded-md shadow-md cursor-pointer ${
                            attendanceRecord.status === "Present"
                              ? "bg-green-500 text-white"
                              : "bg-red-500 text-white"
                          }`}
                        >
                          <option
                            value="Present"
                            className="bg-white text-black"
                          >
                            Present
                          </option>
                          <option
                            value="Absent"
                            className="bg-white text-black"
                          >
                            Absent
                          </option>
                        </select>
                      );
                    }

                    // If attendance has not been marked, show both buttons
                    return (
                      <div>
                        <button
                          onClick={() =>
                            handleStatusChange(
                              student.registerNumber,
                              "Present"
                            )
                          }
                          className="bg-green-500 text-white px-3 py-1 text-xs md:text-sm rounded-md shadow-md hover:bg-green-600 mr-2"
                        >
                          Present
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(student.registerNumber, "Absent")
                          }
                          className="bg-red-500 text-white px-3 py-1 text-xs md:text-sm rounded-md shadow-md hover:bg-red-600"
                        >
                          Absent
                        </button>
                      </div>
                    );
                  })()}
                </td> */}
                <td className="px-4 py-2 border-b-8 border-white rounded-r-xl md:text-base">
                  {(() => {
                    const attendanceRecord = student.attendance.find(
                      (record) => record.date === selectedDate
                    );

                    return (
                      <div className="flex space-x-2 items-center justify-center">
                        <button
                          onClick={() =>
                            handleStatusChange(
                              student.registerNumber,
                              "Present",
                              student.fullName

                            )
                          }
                          className={`px-3 py-1 text-xs md:text-sm rounded-md font-[Poppins] shadow-md transition-all ${
                            attendanceRecord?.status === "Present"
                              ? "bg-green-500 text-white ring-2 ring-green-600"
                              : "bg-gray-200 text-gray-700 hover:bg-green-500 hover:text-white"
                          }`}
                        >
                          Present
                        </button>
                        <button
                          onClick={() =>
                            handleStatusChange(student.registerNumber, "Absent",student.fullName)
                          }
                          className={`px-3 py-1 text-xs md:text-sm rounded-md shadow-md font-[Poppins] transition-all ${
                            attendanceRecord?.status === "Absent"
                              ? "bg-red-500 text-white ring-2 ring-red-600"
                              : "bg-gray-200 text-gray-700 hover:bg-red-500 hover:text-white"
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    );
                  })()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-6">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`px-3 py-2 rounded-md shadow-md ${
              currentPage === page + 1
                ? "bg-orange-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            {page + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-md shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Attendance;