import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const ScoreCard = () => {
  const [data, setData] = useState([]);
  const [students, setStudents] = useState([]);
  const [actionRow, setActionRow] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [scoreCardForm, setScoreCardForm] = useState({
    trainerName: "",
    courseName: "",
    trainingDate: "",
    trainingTime: "",
    workAssigned: "",
    workCompleted: "",
    workPending: "",
    communication: 0,
    attendance: 0,
    attitude: 0,
    total: 0,
  });
  const [modalOpen, setModalOpen] = useState(false); // Modal state
  const navigate = useNavigate(); // <-- Define the navigate function
  const rowsPerPage = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch all score cards from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5005/api/scorecards/all")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the scorecards", error);
      });
  }, [refresh]);

  // Fetch all students from the backend
  useEffect(() => {
    axios
      .get("http://localhost:5005/api/students/all")
      .then((response) => {
        setStudents(response.data); // Assuming the API returns an array of student objects
      })
      .catch((error) => {
        console.error("There was an error fetching the students", error);
      });
  }, []);

  // Handle input changes in the form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setScoreCardForm({
      ...scoreCardForm,
      [name]: value,
    });
  };

  // Helper function to format date
  const formatDate = (date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Handle student selection
  const handleStudentSelect = (e) => {
    const selectedStudentId = e.target.value;
    const selectedStudent = students.find(
      (student) => student._id === selectedStudentId
    );

    if (selectedStudent) {
      setScoreCardForm({
        ...scoreCardForm,
        studentId: selectedStudent._id,
        traineeName: selectedStudent.fullName,
        courseName: selectedStudent.course,
        trainingDate: formatDate(selectedStudent.admissionDate),
      });
    } else {
      setScoreCardForm({
        ...scoreCardForm,
        studentId: "",
        traineeName: "",
        courseName: "",
        trainingDate: "",
      });
    }
  };

  const calculateTotal = () => {
    const { communication, attendance, attitude } = scoreCardForm;
    return (
      (Number(communication) || 0) +
      (Number(attendance) || 0) +
      (Number(attitude) || 0)
    );
  };

  // Handle form submission to create a new scorecard
  // Handle form submission to create a new scorecard
  const handleSubmit = (e) => {
    e.preventDefault();

    const total = calculateTotal();

    const scoreCardData = {
      traineeId: scoreCardForm.studentId,
      trainerName: scoreCardForm.trainerName,
      trainingTime: scoreCardForm.trainingTime,
      workAssigned: scoreCardForm.workAssigned,
      workCompleted: scoreCardForm.workCompleted,
      workPending: scoreCardForm.workPending,
      communication: Number(scoreCardForm.communication) || 0,
      attendance: Number(scoreCardForm.attendance) || 0,
      attitude: Number(scoreCardForm.attitude) || 0,
      total,
    };

    axios
      .post("http://localhost:5005/api/scorecards/add", scoreCardData)
      .then((response) => {
        setRefresh((prev) => !prev); // Trigger data refetch
        console.log("ScoreCard added successfully", response.data);
        setModalOpen(false); // Close the modal
        setScoreCardForm({
          trainerName: "",
          courseName: "",
          trainingDate: "",
          trainingTime: "",
          workAssigned: "",
          workCompleted: "",
          workPending: "",
          communication: 0,
          attendance: 0,
          attitude: 0,
          total: 0,
        }); // Reset the form
      })
      .catch((error) => {
        console.error("Error adding score card", error);
        alert("Failed to add score card");
      });
  };
  // Handle pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = data.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(data.length / rowsPerPage);

  // Handle delete
  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:5005/api/scorecards/${id}`)
      .then((response) => {
        setData(data.filter((scoreCard) => scoreCard._id !== id));
      })
      .catch((error) => {
        console.error("There was an error deleting the score card", error);
      });
  };

  const handleView = (id) => {
    // Navigate to a new page with the student ID as a URL parameter
    navigate(`/scoreboard/${id}`);
  };

  return (
    <div className="p-6 min-h-screen md:px-20">
      <h1 className="text-2xl font-semibold mb-4">Score Card</h1>

      {/* Button to open the modal */}
      <div className="flex justify-between items-center mb-4">
        <div></div>
        <button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md text-s hover:bg-blue-600"
        >
          Create Score Card
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-[#F5A623]">
            <tr>
              <th className="px-4 py-2 border-b-8 border-white text-left text-white">
                Trainee Name
              </th>
              <th className="px-4 py-2 border-b-8 border-white text-left text-white">
                Trainer Name
              </th>
              <th className="px-4 py-2 border-b-8 border-white text-left text-white">
                Course
              </th>
              <th className="px-4 py-2 border-b-8 border-white text-center text-white">
                Total Score
              </th>
              <th className="px-4 py-2 border-b-8 border-white text-center text-white">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {currentRows.map((row, index) => (
              <tr
                key={index}
                className="bg-[#50E3C2] text-gray-800 transition-all duration-300 hover:bg-teal-400"
              >
                <td className="px-4 border-b-8 rounded-l-xl border-white py-2">
                  {row.traineeName}
                </td>
                <td className="px-4 border-b-8 border-white py-2">
                  {row.trainerName}
                </td>
                <td className="px-4 border-b-8 border-white py-2">
                  {row.courseName}
                </td>
                <td className="px-4 border-b-8 border-white py-2 text-center">
                  {row.total}
                </td>
                <td className="px-4 py-2 border-b-8 pb-3 rounded-r-xl border-white text-center relative">
                  <button
                    onClick={() =>
                      setActionRow(actionRow === row._id ? null : row._id)
                    }
                    className="p-1 rounded-full hover:bg-gray-400 focus:outline-none"
                  >
                    <span className="text-lg">⋮</span>
                  </button>
                  {actionRow === row._id && (
                    <>
                      <div className="flex">
                        <div>
                          <button
                            onClick={() => handleDelete(row._id)} // <-- Delete button click
                            className="absolute top-12 left-1/2 text-[65%] w-[40%] mt-1 transform -translate-x-1/2 px-3 py- bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>

                        <button
                          onClick={() => handleView(row._id)} // <-- View button click
                          className="absolute top-8 left-1/2 text-[70%] w-[40%] transform -translate-x-1/2 px-3 py- bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                        >
                          View
                        </button>
                      </div>
                    </>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center space-x-2 mt-4">
        <button
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &lt;
        </button>
        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => setCurrentPage(page + 1)}
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
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
        >
          &gt;
        </button>
      </div>

      {/* Modal for Score Card Creation */}
      {modalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white h-auto  max-h-[90vh] w-full md:w-[50%] rounded-lg m-4 md:p-4 overflow-y-auto">
            <h2 className="text-xl font-semibold mb-4 text-center">
              Create Score Card
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="overflow-x-auto rounded-xl p-2">
                {/* Student ID Selection */}
                <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px] mb-2">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Student ID
                  </label>

                  <select
                    name="studentId"
                    value={scoreCardForm.studentId}
                    onChange={handleStudentSelect}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  >
                    <option value="">Select Student ID</option>
                    {students.map((student) => (
                      <option
                        className="text-black"
                        key={student._id}
                        value={student._id}
                      >
                        <span className="text-blue-600 font-semibold">
                          {student.fullName}
                        </span>{" "}
                        -<span className="text-red-500">{student._id}</span>
                      </option>
                    ))}
                  </select>
                </div>
                <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2 rounded-[7px] border border-[#50E3C2]">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Trainee Name
                  </label>

                  <input
                    type="text"
                    name="traineeName"
                    value={scoreCardForm.traineeName || ""} // Ensure the input is empty if no student is selected
                    onChange={handleChange}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                    disabled // Input field is disabled, but can still display the trainee's name
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px] mb-2">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Course
                  </label>

                  <input
                    type="text"
                    name="courseName"
                    value={scoreCardForm.courseName}
                    onChange={handleChange}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                    disabled
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2  rounded-[7px] border border-[#50E3C2]">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Trainer Name
                  </label>

                  <input
                    type="text"
                    name="trainerName"
                    value={scoreCardForm.trainerName} // Use scoreCardForm.trainerName here
                    onChange={handleChange}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>
                {/* Date (auto-filled) */}
                <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px] mb-2">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Date
                  </label>

                  <input
                    type="text"
                    name="trainingDate"
                    value={scoreCardForm.trainingDate}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                    disabled
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2  rounded-[7px] border border-[#50E3C2]">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Training Time
                  </label>

                  <input
                    type="time"
                    name="trainingTime"
                    value={scoreCardForm.trainingTime}
                    onChange={handleChange}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px] mb-2">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Work Assigned
                  </label>

                  <input
                    type="text"
                    name="workAssigned"
                    value={scoreCardForm.workAssigned}
                    onChange={handleChange}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2  rounded-[7px] border border-[#50E3C2]">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Work Completed
                  </label>

                  <input
                    type="text"
                    name="workCompleted"
                    value={scoreCardForm.workCompleted}
                    onChange={handleChange}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px] mb-2">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Work pending
                  </label>

                  <input
                    type="text"
                    name="workPending" // 🔹 Ensure this matches the state key exactly
                    value={scoreCardForm.workPending}
                    onChange={handleChange}
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2  rounded-[7px] border border-[#50E3C2]">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    communication(out of 5)
                  </label>

                  <input
                    type="number"
                    name="communication"
                    value={scoreCardForm.communication}
                    onChange={handleChange}
                    placeholder="Enter communication score"
                    max="5"
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px] mb-2">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Attendance(out of 5)
                  </label>

                  <input
                    type="number"
                    name="attendance"
                    value={scoreCardForm.attendance}
                    onChange={handleChange}
                    placeholder="Enter attendance score"
                    max="5"
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2  rounded-[7px] border border-[#50E3C2]">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    Attitude(out of 5)
                  </label>

                  <input
                    type="number"
                    name="attitude"
                    value={scoreCardForm.attitude}
                    onChange={handleChange}
                    placeholder="Enter attitude score"
                    max="5"
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>
                <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px] mb-2">
                  <label className="block text-sm font-semibold m-3 w-[30%]">
                    total
                  </label>

                  <input
                    type="text"
                    name="total"
                    value={scoreCardForm.total}
                    onChange={handleChange}
                    placeholder="Enter total score"
                    className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  />
                </div>{" "}
              </div>

              {/* Submit Button */}
              <div className="mt-6 flex justify-center space-x-4">
                <button
                  type="submit"
                  //  onSubmit={handleSubmit}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  Publish
                </button>
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ScoreCard;
