import React, { useState, useEffect } from "react";

const Attendance = () => {
  const [students, setStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Fetch students data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5005/api/students/all"); // Replace with your backend API endpoint
        const data = await response.json();
        // Set initial status for each student as null (not marked yet)
        const studentsWithStatus = data.map(student => ({
          ...student,
          status: null, // null means no status selected
        }));
        setStudents(studentsWithStatus);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };

    fetchData();
  }, []);

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = students.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(students.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Handle Present/Absent button click
  const handleStatusChange = (id, status) => {
    setStudents((prevStudents) =>
      prevStudents.map((student) =>
        student.registerNumber === id
          ? { ...student, status }
          : student
      )
    );
  };

  // Download CSV File
  const handleDownload = () => {
    const csvContent = [
      ["Student ID", "Student Name", "Course", "Status"].join(","), // Header row
      ...students.map((student) => [
        student.registerNumber,
        student.fullName,
        student.course,
        student.status || "Not Marked", // Show status or default to "Not Marked"
      ].join(",")), // Data rows
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Create a temporary <a> element
    const link = document.createElement("a");
    link.href = url;
    link.download = "attendance.csv";
    link.click();

    // Clean up
    URL.revokeObjectURL(url);
  };

  return (
    <div className="p-6 min-h-screen w-full font-sans">
      <h1 className="text-2xl md:text-3xl font-semibold mb-6 text-gray-800">Attendance</h1>

      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <div className="flex items-center gap-4">
          <label htmlFor="date" className="text-gray-700 font-medium text-sm md:text-base">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            className="appearance-none px-3 py-2 border rounded-md focus:ring-2 focus:ring-orange-500 focus:outline-none"
          />
        </div>

        <button
          onClick={handleDownload}
          className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-600 transition-all"
        >
          Download CSV
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#F5A623]">
            <tr>
              <th className="px-4 py-2 text-left border-b-8 border-white text-sm md:text-base text-white">Student ID</th>
              <th className="px-4 py-2 text-left border-b-8 border-white text-sm md:text-base text-white">Student Name</th>
              <th className="px-4 py-2 text-left border-b-8 border-white text-sm md:text-base text-white">Course</th>
              <th className="px-4 py-2 text-center border-b-8 border-white text-sm md:text-base text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student) => (
              <tr
                key={student.registerNumber}
                className="bg-[#50E3C2] text-gray-800 transition-all duration-300 hover:bg-teal-400"
              >
                <td className="px-4 py-3 border-b-8 border-white rounded-l-xl text-sm md:text-base">{student.registerNumber}</td>
                <td className="px-4 py-2 border-b-8 border-white text-sm md:text-base">{student.fullName}</td>
                <td className="px-4 py-2 border-b-8 border-white text-sm md:text-base">{student.course}</td>
                <td className="px-4 py-2 border-b-8 border-white rounded-r-xl text-center">
                  {student.status !== "Present" && (
                    <button
                      onClick={() => handleStatusChange(student.registerNumber, "Present")}
                      className="bg-green-500 text-white px-3 mb-1 py-1 text-xs md:text-sm rounded-md shadow-md hover:bg-green-600"
                    >
                      Present
                    </button>
                  )}
                  {student.status !== "Absent" && (
                    <button
                      onClick={() => handleStatusChange(student.registerNumber, "Absent")}
                      className="bg-red-500 text-white px-3 py-1 text-xs md:text-sm rounded-md shadow-md hover:bg-red-600 md:ml-2"
                    >
                      Absent
                    </button>
                  )}
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
    </div>
  );
};

export default Attendance;
