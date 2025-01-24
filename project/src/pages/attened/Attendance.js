import React, { useState } from "react";

const Attendance = () => {
  const students = [
    { id: "000001", name: "Donald Jawahar E", course: "UI/UX Designing" },
    { id: "000002", name: "John Doe", course: "Web Development" },
    { id: "000003", name: "Jane Smith", course: "Graphic Designing" },
    { id: "000004", name: "Alice Johnson", course: "App Development" },
    { id: "000005", name: "Bob Martin", course: "Cybersecurity" },
    { id: "000006", name: "Carol Lee", course: "Data Science" },
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
    <div className="p-6 min-h-screen">
  
      <h1 className="text-2xl font-semibold mb-4">Attendance</h1>


      <div className="flex justify-between items-center mb-4">

      <div className="flex items-center">
  <label htmlFor="date" className="text-gray-700 font-medium">
    Select Date:
  </label>
  <div className="relative">
    <input
      type="date"
      id="date"
      className="appearance-none w-32 px-1 py-2 text-gray-700 bg-transparent focus:outline-none focus:border-orange-500"
    />
  </div>
</div>

   
        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600">
          Download
        </button>

       
       
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500">
            <tr>
              <th className="px-4 border-b-8   border-white py-2 text-left text-white">Student ID</th>
              <th className="px-4 border-b-8  border-white py-2 text-left text-white">Student Name</th>
              <th className="px-4 border-b-8  border-white py-2 text-left text-white">Course</th>
              <th className="px-4 border-b-8  border-white py-2 text-center text-white">Status</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student, index) => (
              <tr
                key={index}
                className="bg-teal-200 even:bg-teal-300 text-gray-800"
              >
                <td className="px-4 border-b-8 rounded-l-xl border-white py-4">{student.id}</td>
                <td className="px-4 border-b-8   border-white py-2">{student.name}</td>
                <td className="px-4 border-b-8  border-white py-2">{student.course}</td>
                <td className="px-4 border-b-8   rounded-r-2xl  border-white py-2 text-center">
                  <button className="bg-green-500  text-white px-3 py-1 text-sm  rounded-lg shadow-md hover:bg-green-600 mr-2">
                    Present
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 text-sm rounded-lg shadow-md hover:bg-red-600">
                    Absent
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

export default Attendance;





// <div className="relative">
// <div className="flex items-center">
//   <label htmlFor="date" className="text-gray-700 font-medium mr-2">
//     Select Date:
//   </label>
//   <div className="relative">
//     <input
//       type="date"
//       id="date"
//       className="appearance-none w-40 px-4 py-2 text-gray-700 bg-transparent border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-orange-500"
//     />
//     <FiCalendar
//       className="absolute right-2 top-2.5 text-gray-500 pointer-events-none"
//       size={18}
//     />
//   </div>
// </div>
// </div>