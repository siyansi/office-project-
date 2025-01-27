import React, { useState } from "react";

const ScoreCard = () => {
  const data = [
    {
      traineeName: "Donald Jawahar E",
      trainerName: "John Smith",
      course: "UI/UX Designing",
      totalScore: "95",
    },
    {
      traineeName: "Jane Doe",
      trainerName: "Alice Brown",
      course: "Web Development",
      totalScore: "88",
    },
    {
      traineeName: "Mark Lee",
      trainerName: "David Wilson",
      course: "App Development",
      totalScore: "92",
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  const [isModalOpen, setModalOpen] = useState(false);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Score Card</h1>

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <button
          onClick={toggleModal}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md text-s hover:bg-blue-600"
        >
          Create Score Card
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#F5A623] ">
            <tr>
              <th className="px-4 py-2 border-b-8   border-white text-left text-white">Trainee Name</th>
              <th className="px-4 py-2 border-b-8  border-white text-left text-white">Trainer Name</th>
              <th className="px-4 py-2 border-b-8  border-white text-left text-white">Course</th>
              <th className="px-4 py-2 border-b-8  border-white text-center text-white">Total Score</th>
              <th className="px-4 py-2 border-b-8  border-white text-center text-white">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr
                key={index}
                className="bg-[#50E3C2] text-gray-800 transition-all duration-300 hover:bg-teal-400"
              >
                <td className="px-4 border-b-8 rounded-l-xl  border-white py-2">{row.traineeName}</td>
                <td className="px-4 border-b-8   border-white py-2">{row.trainerName}</td>
                <td className="px-4 border-b-8  border-white py-2">{row.course}</td>
                <td className="px-4 border-b-8  border-white py-2 text-center">{row.totalScore}</td>
                <td className="px-4 border-b-8 rounded-r-xl border-white py-2 text-center">
                  <button className="p-1 rounded-full hover:bg-gray-400 focus:outline-none">
                    <span className="text-lg">⋮</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white h-auto  max-h-[90vh] w-full md:w-[50%] rounded-lg m-4 md:p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Create Score Card
            </h2>

            <div className="overflow-x-auto rounded-xl p-2">
              <table className="min-w-full bg-white shadow-md rounded-lg">
                <thead className="bg-orange-500 text-white">
                  {/* <tr>
                    <th className="px-4 py-2 border-b-2 border-white text-left">
                      Field Name
                    </th>
                    <th className="px-4 py-2 border-b-2 border-white text-left">
                      Input
                    </th>
                  </tr> */}
                </thead>
                <tbody>
                  <tr className="bg-teal-300">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Trainer Name
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="text"
                        placeholder="Enter trainer name"
                        className="w-full px-3 py-2 bg-teal-300 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Trainee Name
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="text"
                        placeholder="Enter trainee name"
                        className="w-full px-3 py-2 bg-gray-200 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-teal-300">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Course
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="text"
                        placeholder="Enter course name"
                        className="w-full px-3 py-2 bg-teal-300 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-300">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Date
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="date"
                        className="w-full px-3 py-2 bg-gray-300 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-teal-300">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Training Time
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="time"
                        className="w-full px-3 py-2 bg-teal-300 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Work Assigned
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="text"
                        placeholder="Enter work assigned"
                        className="w-full px-3 py-2 bg-gray-200 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-teal-300">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Work Completed
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="text"
                        placeholder="Enter work completed"
                        className="w-full px-3 py-2 bg-teal-300 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Work Pending
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="text"
                        placeholder="Enter work pending"
                        className="w-full px-3 py-2 bg-gray-200 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-teal-300">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Communication (Out of 5)
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="number"
                        placeholder="Enter communication score"
                        max="5"
                        className="w-full px-3 py-2 bg-teal-300 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Attendance (Out of 5)
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="number"
                        placeholder="Enter attendance score"
                        max="5"
                        className="w-full px-3 py-2 bg-gray-200 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-teal-300">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Attitude (Out of 5)
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="number"
                        placeholder="Enter attitude score"
                        max="5"
                        className="w-full px-3 py-2 bg-teal-300 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                  <tr className="bg-gray-200">
                    <td className="px-4 py-2 border-b border-r rounded-l-lg border-white font-medium">
                      Total
                    </td>
                    <td className="px-4 py-2 border-b rounded-r-lg border-white">
                      <input
                        type="text"
                        placeholder="Enter total score"
                        className="w-full px-3 py-2 bg-gray-200 rounded focus:outline-none"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex justify-center space-x-4">
              <button
                type="button"
                onClick={toggleModal}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Publish
              </button>
              <button
                type="button"
                onClick={toggleModal}
                className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
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

export default ScoreCard;
