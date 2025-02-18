import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const Assignment = ({ assignmentId }) => {
  const [assignments, setAssignments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // Create modal state
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [actionRow, setActionRow] = useState(null);
  const [selectedStudent, setSelectedStudent] = useState("");
  const studentss = useSelector((state) => state.students.students);
  console.log("dddddddddddd", studentss);
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    deadline: "",
    topic: "",
    attachment: null,
  });

  useEffect(() => {
    fetchAssignments();
  }, []);

  const fetchAssignments = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5005/api/assignments/see"
      );
      setAssignments(response.data);
    } catch (error) {
      console.error("Error fetching assignments:", error);
      console.log("Attachment:", newAssignment.attachment);
    }
  };

  // Display assignment with attachment
  const renderAttachment = (attachment) => {
    if (!attachment) return null;
    if (!attachment.mimetype || !attachment.data)
      return <p>Invalid attachment</p>;

    const { data, mimetype, filename } = attachment;
    const base64Data = `data:${mimetype};base64,${data}`;

    if (mimetype.startsWith("image")) {
      return (
        <img src={base64Data} alt={filename} className="max-w-full h-auto" />
      );
    } else if (mimetype.startsWith("video")) {
      return <video controls src={base64Data} className="w-full" />;
    } else if (mimetype.startsWith("application/pdf")) {
      return (
        <embed
          src={base64Data}
          type="application/pdf"
          width="600"
          height="400"
        />
      );
    } else {
      return (
        <a href={base64Data} download={filename}>
          Download {filename}
        </a>
      );
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAssignment({ ...newAssignment, [name]: value });
  };

  const handleFileChange = (e) => {
    setNewAssignment({ ...newAssignment, attachment: e.target.files[0] });
  };

  const handleView = (id) => {
    const assignment = assignments.find((assignment) => assignment._id === id);
    setSelectedAssignment(assignment);
    setIsViewModalOpen(true); // Open the view modal
    setIsCreateModalOpen(false); // Close the create modal if it's open
  };


  const fetchAssignment = async (assignmentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/assignments/${assignmentId}`);
      const data = await response.json();
      setSelectedAssignment(data);
    } catch (error) {
      console.error("Error fetching assignment:", error);
    }
  };
// Call this function when opening the modal
useEffect(() => {
  if (isViewModalOpen && assignmentId) {
    fetchAssignment(assignmentId);
  }

}, [isViewModalOpen, assignmentId]);
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/assignments/${id}`);
      fetchAssignments(); // Re-fetch assignments after deletion
    } catch (error) {
      console.error("Error deleting assignment:", error);
    }
  };

  const handleCreateAssignment = async () => {
    if (newAssignment.name && newAssignment.deadline && newAssignment.topic) {
      const formData = new FormData();
      formData.append("name", newAssignment.name);
      formData.append("deadline", newAssignment.deadline); // Ensure deadline is in the right format
      formData.append("topic", newAssignment.topic);
      formData.append("assignee", selectedStudent);

      // If there's an attachment, append it to the form data
      if (newAssignment.attachment) {
        formData.append("attachment", newAssignment.attachment);
      }

      try {
        const res = await axios.post(
          "http://localhost:5005/api/assignments/add",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (res.status === 200 || res.status === 201) {
          setIsCreateModalOpen(false);
          fetchAssignments();
          setNewAssignment({
            name: "",
            deadline: "",
            topic: "",
            assignee: selectedStudent,
            attachment: "", // Reset the attachment after submitting
          });
        }
      } catch (error) {
        console.error("Error adding assignment:", error);
        console.log("Attachment:", newAssignment.attachment);
      }
    } else {
      alert("Please fill all fields before publishing.");
    }
  };

  console.log("assignments", assignments);

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = assignments.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(assignments.length / rowsPerPage);

  return (
    <div className="p-6 min-h-screen px-20">
      <h1 className="text-2xl font-semibold mb-4">Assignments</h1>

      <div className="flex justify-between items-center mb-4">
        <div></div>
        <button
          onClick={() => {
            setIsCreateModalOpen(true);
            setIsViewModalOpen(false); // Close view modal if it's open
          }}
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
                assigned
              </th>
              <th className="px-4 py-2 border-b-8 border-white text-white">
                Action
              </th>
            </tr>
          </thead>

          <tbody>
            {currentRows.map((assignment) => (
              <tr
                key={assignment._id}
                className="bg-[#50E3C2] text-gray-800 hover:bg-teal-400"
              >
                <td className="px-4 py-2 border-b-8 rounded-l-xl border-white text-center">
                  {assignment.name}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-center">
                  {assignment.deadline}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-center">
                  {assignment.topic}
                </td>
                <td className="px-4 py-2 border-b-8 border-white text-center">
                  {assignment.assignee}
                </td>
                <td className="px-4 py-2 border-b-8 pb-3 rounded-r-xl border-white text-center relative">
                  <button
                    onClick={() =>
                      setActionRow(
                        actionRow === assignment._id ? null : assignment._id
                      )
                    }
                    className="p-1 rounded-full hover:bg-gray-400 focus:outline-none"
                  >
                    <span className="text-lg">⋮</span>
                  </button>
                  {actionRow === assignment._id && (
                    <>
                      <div className="flex">
                        <div>
                          <button
                            onClick={() => handleDelete(assignment._id)}
                            className="absolute top-12 left-1/4 text-[65%] w-[40%] mt-1 transform -translate-x-1/2 px- py- bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                        </div>
                        <button
                          onClick={() => handleView(assignment._id)}
                          className="absolute top-8 left-1/4 text-[70%] w-[40%] transform -translate-x-1/2 px- py- bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                        >
                          View
                        </button>
                      </div>
                    </>
                  )}
                </td>{" "}
              </tr>
            ))}
          </tbody>
          <div className="grid gap-4"></div>
        </table>
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

      {isCreateModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 m-4 md:p-8 rounded-lg shadow-lg w-full md:w-[60%] overflow-y-auto">
            <h2 className="mb-5">Create Assignments</h2>
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
                <label className="block text-sm font-semibold m-3 w-[30%] ">
                  Description
                </label>
                <textarea
                  name="topic"
                  value={newAssignment.topic}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                  placeholder="Enter assignment description"
                />
              </div>
              <div className="flex items-center gap-4 bg-white rounded-xl border border-[#50E3C2] p-4 shadow-lg">
                <label className="text-sm font-medium text-gray-700 w-1/3">
                  Assign To:
                </label>
                <div className="relative w-2/3">
                  <select
                    className="w-full p-3 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-[#50E3C2] focus:outline-none appearance-none"
                    onChange={(e) => setSelectedStudent(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Select a student
                    </option>
                    {studentss.map((student) => (
                      <option
                        key={student.registerNumber}
                        value={student.registerNumber}
                      >
                        {student.fullName}
                      </option>
                    ))}
                  </select>
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none">
                    ▼
                  </span>
                </div>
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
                onClick={() => setIsCreateModalOpen(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 m-4 md:p-8 rounded-lg shadow-lg w-full md:w-[60%] overflow-y-auto">
            <h2 className="mb-5">Assignment Details</h2>
            <div className="grid gap-4 ">
              <div className="flex items-center gap-3 bg-[#50E3C2] rounded-[7px] border border-[#50E3C2]  ">
                <label className="block text-sm font-semibold m-3 w-[30%]">
                  Name:
                </label>
                <input
                  type="text"
                  value={selectedAssignment.name}
                  readOnly
                  className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                />
              </div>

              <div className="flex items-center gap-3  bg-[#F0F0F0]  rounded-[7px] border border-[#50E3C2]">
                <label className="block text-sm font-semibold m-3 w-[30%]">
                  Deadline:
                </label>
                <input
                  type="text"
                  value={selectedAssignment.deadline}
                  readOnly
                  className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                />
              </div>

              <div className="flex items-center gap-3 bg-[#50E3C2] rounded-[7px] border border-[#50E3C2]">
                <label className="block text-sm font-semibold m-3 w-[30%]">
                  Topic:
                </label>
                <input
                  type="text"
                  value={selectedAssignment.topic}
                  readOnly
                  className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black focus:outline-none text-black"
                />
              </div>

             <div className="flex items-center gap-3 bg-[#F0F0F0] rounded-[7px] border border-[#50E3C2]">
  <label className="block text-sm font-semibold m-3 w-[30%]">
    Attachments:
  </label>
  <div className="w-[70%] px-4 py-2">
    {selectedAssignment?.attachments?.length > 0 ? (
      selectedAssignment.attachments.map((file, index) => (
        <div key={index} className="mb-2">
          {file.data.startsWith("data:image") ? (
            // If the file is an image, display it
            <img
              src={file.data}
              alt={file.filename}
              className="w-32 h-32 object-cover rounded-md"
            />
          ) : (
            // Otherwise, provide a download link
            <a
              href={file.data}
              download={file.filename}
              className="text-blue-500 underline"
            >
              {file.filename}
            </a>
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-500">No attachments available</p>
    )}
  </div>
</div>

            </div>
            <div className="flex justify-end mt-6 space-x-4">
              <button
                onClick={() => setIsViewModalOpen(false)}
                className="px-6 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Assignment;
