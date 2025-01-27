import React, { useState } from "react";

const Assignment = () => {
  const [students, setStudents] = useState([
    { id: "Loginpage ui", name: "07/03/2025", course: "UI/UX Designing" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Web Development" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Graphic Designing" },
    // { id: "Loginpage ui", name: "07/03/2025", course: "App Development" },
    // { id: "Loginpage ui", name: "07/03/2025", course: "Cybersecurity" },
    // { id: "Loginpage ui", name: "07/03/2025", course: "Data Science" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Data Science" },
    { id: "Loginpage ui", name: "07/03/2025", course: "Data Science" },
  ]);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
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
    if (
      newAssignment.name &&
      newAssignment.deadline &&
      newAssignment.topic
    ) {
      const newStudent = {
        id: newAssignment.name,
        name: newAssignment.deadline,
        course: newAssignment.topic,
      };

      // Update state
      setStudents([...students, newStudent]);
      setNewAssignment({ name: "", deadline: "", topic: "" }); // Clear the form
      setIsModalOpen(false); // Close the modal
    } else {
      alert("Please fill all fields before publishing.");
    }
  };

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Assignments</h1>

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600"
        >
          Create Assignment
        </button>
      </div>

      <div className="overflow-x-auto w-[100%]">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#F5A623]">
            <tr className="text-sm md:text-base">
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
                className=" transform rounded-lg bg-[#50E3C2] text-gray-800 transition-all duration-300 hover:bg-teal-400"
              >
                <td className="px-4 py-2 border-b-8 rounded-l-xl border-white text-center">
                  {student.id}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-center">
                  {student.name}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-center">
                  {student.course}
                </td>
                <td className="px-4 py-2 border-b-8 rounded-r-xl border-white text-center">
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
    <div className="bg-white p-4 m-4 md:p-8 rounded-lg shadow-lg w-full md:w-[60%] overflow-y-auto">
      <h2 className="mb-5">
        Create Assignments
      </h2>
      <div className="grid gap-4">
        <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px]">
          <label className="block text-sm font-semibold  m-3 w-[30%]">
            Name of the Assignment
          </label>
          <input
            type="text"
            name="name"
            value={newAssignment.name}
            onChange={handleInputChange}
            className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
            placeholder="Enter assignment name"
          />
        </div>
        <div className="flex items-center gap-3 bg-[#F0F0F0]  rounded-[7px] border border-[#50E3C2]">
          <label className="block text-sm font-semibold m-3 w-[30%]">
            Date of Submission
          </label>
          <input
            type="date"
            name="deadline"
            value={newAssignment.deadline}
            onChange={handleInputChange}
            className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
          />
        </div>
        <div className="flex items-center gap-3 bg-[#50E3C2]  rounded-[7px] border border-[#50E3C2]">
          <label className="block text-sm font-semibold m-3 w-[30%] ">Description</label>
          <textarea
            name="topic"
            value={newAssignment.topic}
            onChange={handleInputChange}
            rows={3}
            className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
            placeholder="Enter assignment description"
          />
        </div>
        <div className="flex items-center gap-3 bg-[#F0F0F0]  rounded-[7px] border border-[#50E3C2]">
          <label className="block text-sm font-semibold m-3 w-[30%]">
            Attach Files
          </label>
          <input
            type="file"
            className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
          />
        </div>
      </div>
      <div className="flex justify-end mt-6 space-x-4">
        <button
          onClick={handleCreateAssignment}
          className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
        >
          Publish
        </button>
        <button
          onClick={() => setIsModalOpen(false)}
          className="px-6 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
        >
          Cancel
        </button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Assignment;