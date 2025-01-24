import React, { useState } from "react";

const Student = () => {
  const students = [
    { id: "000001", name: "Donald Jawahar E", course: "UI/UX Designing" },
    { id: "000002", name: "John Doe", course: "Web Development" },
    { id: "000003", name: "Jane Smith", course: "Graphic Designing" },
    // Duplicate entries for demonstration
    { id: "000004", name: "Alice Johnson", course: "App Development" },
    { id: "000005", name: "Bob Martin", course: "Cybersecurity" },
    { id: "000006", name: "Carol Lee", course: "Data Science" },
    { id: "000007", name: "Donald Jawahar E", course: "UI/UX Designing" },
    { id: "000008", name: "Donald Jawahar E", course: "UI/UX Designing" },
    { id: "000009", name: "Donald Jawahar E", course: "UI/UX Designing" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = students.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(students.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div  style={{ fontFamily: "Poppins" }} className="p-6 min-h-screen w-full">
      <h1 className="text-2xl font-semibold mb-4">Student Enrolled</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500">
            <tr>
              <th className="px-4 py-2 border-b-8  border-white text-white">Student ID</th>
              <th className="px-4 py-2 border-b-8  border-white text-white">Student Name</th>
              <th className="px-4 py-2 border-b-8  border-white text-white">Course</th>
              <th className="px-4 py-2 border-b-8  border-white text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student, index) => (
              <tr
                key={index}
                className="bg-teal-200  even:bg-teal-300 text-gray-800"
              >
                <td className="px-4 border-b-8  rounded-l-xl  border-white text-center py-2">{student.id}</td>
                <td className="px-4 border-b-8  border-white text-center py-2">{student.name}</td>
                <td className="px-4 border-b-8  border-white text-center py-2">{student.course}</td>
                <td className="px-4 border-b-8  rounded-r-xl border-white text-center py-2 ">
                  <button className="p-1   rounded-full  hover:bg-gray-400 focus:outline-none">
                    <span className="text-lg">⋮</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => handlePageChange(page + 1)}
            className={`px-4 py-2 rounded-lg shadow-md ${
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
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Student;