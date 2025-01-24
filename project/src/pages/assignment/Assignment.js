import React, { useState } from "react";

const Assignment = () => {
  const students = [
    { id: "Loginpage ui", name: "07/03/2025", course: "UI/UX Designing" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Web Development" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Graphic Designing" },
    { id: "Loginpage ui", name: "07/03/2025", course: "App Development" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Cybersecurity" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Data Science" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Data Science" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Data Science" },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    deadline: "",
    topic: "",
  });

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = students.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(students.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleCreateAssignment = () => {
    console.log("New Assignment:", newAssignment);
    // Add logic to save the new assignment here
    setIsModalOpen(false); // Close the modal after creating
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Assignments</h1>

      <div className="flex justify-between items-center mb-4">
        <div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600"
        >
          Create Assignment
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-orange-500">
            <tr>
              <th className="px-4 py-2 border-b-8 border-white text-white">
                Name of Assignment
              </th>
              <th className="px-4 py-2 border-b-8 border-white text-white">
                Deadline
              </th>
              <th className="px-4 py-2 border-b-8 border-white text-white">
                Topic
              </th>
              <th className="px-4 py-2 border-b-8 border-white text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((student, index) => (
              <tr
                key={index}
                className="bg-teal-200 even:bg-teal-300 text-gray-800"
              >
                <td className="px-4 py-2 border-b-8  rounded-l-xl border-white text-center">
                  {student.id}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-center">
                  {student.name}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-center">
                  {student.course}
                </td>
                <td className="px-4 py-2 border-b-8  rounded-r-xl border-white text-center">
                  <button className="p-1 rounded-full hover:bg-gray-400 focus:outline-none">
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

      {/* Create Assignment Modal */}
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div className="bg-white p-8 rounded-lg shadow-lg w-[60%] h-[70%] overflow-y-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Create Assignment</h2>
      <table className="table-auto w-full">
        <tbody>
          <tr className="mb-4 ">
            <td className="text-right pr-4 bg-teal-200 border-2 border-white bg-  text-gray-700 font-medium w-1/3">
              Assignment Name:
            </td>
            <td className="w-2/3">
              <input
                type="text"
                name="name"
                value={newAssignment.name}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border bg-teal-200 even:bg-teal-300 rounded- focus:outline-none focus:border-orange-500"
                placeholder="Enter assignment name"
              />
            </td>
          </tr>
          <tr className="mb-">
            <td className="text-right pr-4  bg-teal-300  border-2 border-white text-gray-700 font-medium">
              Deadline:
            </td>
            <td>
              <input
                type="date"
                name="deadline"
                value={newAssignment.deadline}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border  bg-teal-300  rounded- focus:outline-none focus:border-orange-500"
              />
            </td>
          </tr>
          <tr className="mb-4">
            <td className="text-right pr-4 bg-teal-200 border-2 border-white text-gray-700 font-medium">
              Topic:
            </td>
            <td>
              <input
                type="text"
                name="topic"
                value={newAssignment.topic}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border bg-teal-200 focus:outline-none focus:border-orange-500"
                placeholder="Enter assignment topic"
              />
            </td>
          </tr>
          <tr className="mb-">
            <td className="text-right bg-teal-300 border-2 h-2 border-white pr-4 text-gray-700 font-medium">
              Description:
            </td>
            <td>
              <textarea
                name="description"
                rows="4"
                value={newAssignment.description || ""}
                onChange={handleInputChange}
                className="w-full px-3 py-2 mb- border bg-teal-300  focus:outline-none focus:border-orange-500"
                placeholder="Enter assignment description"
              ></textarea>
            </td>
          </tr>
          <tr className="mb-4">
            <td className="text-right pr-4 bg-teal-200 border-2 border-white text-gray-700 font-medium">
              Attach File:
            </td>
            <td>
              <input
                type="file"
                name="file"
                onChange={(e) => console.log(e.target.files[0])}
                className="w-full px-3 py-2 bg-teal-200 border rounded-  focus:outline-none focus:border-orange-500"
              />
            </td>
          </tr>
        </tbody>
      </table>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-6 py-2 bg-blue-300 hover:bg-blue-400 rounded-lg"
        >
          Publish
        </button>
        <button
          onClick={handleCreateAssignment}
          className="px-6 py-2 bg-green-500 text-white hover:bg-green-600 rounded-lg"
        >
          Cancle
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Assignment;
