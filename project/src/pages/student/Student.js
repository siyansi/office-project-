import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // <-- Import navigate
import axios from "axios"; // <-- Import axios
import {
  addStudent,
  deleteStudent,
} from "../../features/Studentslice";

import "../../App.css";
import { setStudents } from "../../features/newStudentSlice";

const Student = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // <-- Define the navigate function
  const [studentsData, setStudentsData] = useState([]);
  // const students = useSelector((state) => state.students.studentList);
  const [currentPage, setCurrentPage] = useState(1);
  const [actionRow, setActionRow] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    registerNumber: "",
    gender: "",
    admissionDate: "",
    course: "",
    state: "",
    zipCode: "",
    district: "",
    address: "",
    email: "",
    mobileNumber: "",
    duration: "",
  });
  const studentss = useSelector((state) => state.students.students);
  console.log("studentssssss", studentss);

  const rowsPerPage = 5;

  // useEffect(() => {
  //   dispatch(fetchStudents());
  // }, [dispatch]);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("http://localhost:5005/api/students/all");
        if (res.status === 200) {
          setIsLoading(false);
          setStudentsData(res.data);
          dispatch(setStudents(res.data)); // dispatch is now inside the dependency array
        }
      } catch (error) {
        console.log("Fetch students error:", error);
      }
    };
    fetchStudents();
  }, [dispatch]); // Add dispatch as a dependency
  

  const handleDelete = (id) => {
    dispatch(deleteStudent(id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addStudent(formData));
    setIsModalOpen(false);
    setFormData({
      fullName: "",
      registerNumber: "",
      gender: "",
      admissionDate: "",
      course: "",
      state: "",
      zipCode: "",
      district: "",
      address: "",
      email: "",
      mobileNumber: "",
      duration: "",
    });
  };

  // Pagination Logic
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = studentsData?.slice(indexOfFirstRow, indexOfLastRow);
  const totalPages = Math.ceil(studentsData?.length / rowsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    setActionRow(null);
  };

  const handleView = (id) => {
    // Navigate to a new page with the student ID as a URL parameter
    navigate(`/student/${id}`);
  };

  return (
    <div style={{ fontFamily: "Poppins" }} className="p-6 md:px-20 min-h-screen w-full">
      {isLoading ? (
        <div className="h-[70vh] flex items-center justify-center">
          <svg className="loader" viewBox="25 25 50 50">
            <circle r="20" cy="50" cx="50"></circle>
          </svg>
        </div>
      ) : (
        <div>
          <h1 className="text-2xl font-semibold mb-4">Student Enrolled</h1>
          <div className="flex justify-between items-center mb-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="mb-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600"
            >
              Add Student
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full bg-white mb-8 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-[#F5A623]">
                <tr>
                  <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">
                    Student ID
                  </th>
                  <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">
                    Student Name
                  </th>
                  <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">
                    Course
                  </th>
                  <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
  {currentRows?.map((student) => (
    <tr
      key={student._id}
      className="bg-[#50E3C2] text-gray-800 hover:bg-teal-400"
    >
      <td className="px-4 py-2 border-b-8 rounded-l-xl border-white text-center">
        {student.registerNumber}
      </td>
      <td className="px-4 py-2  border-b-8 border-white text-center">
        {student.fullName}
      </td>
      <td className="px-4 py-2 border-b-8 border-white text-center">
        {student.course}
      </td>
      <td className="px-4 py-2 border-b-8 pb-3 rounded-r-xl border-white text-center relative">
        <button
          onClick={() =>
            setActionRow(actionRow === student._id ? null : student._id)
          }
          className="p-1 rounded-full hover:bg-gray-400 focus:outline-none"
        >
          <span className="text-lg">⋮</span>
        </button>
        {actionRow === student._id && (
          <>
            <div className="flex">
              <div>
                <button
                  onClick={() => handleDelete(student._id)}
                  className="absolute top-12 left-1/2 text-[65%] w-[40%] mt-1 transform -translate-x-1/2 px-3 py- bg-red-500 text-white rounded-md shadow-md hover:bg-red-600"
                >
                  Delete
                </button>
              </div>

              <button
                onClick={() => handleView(student._id)} // <-- View button click
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
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
              <div className="bg-white h-auto  max-h-[90vh] w-full md:w-[50%] rounded-lg m-4 md:p-4 overflow-y-auto">
                <h2 className="text-2xl font-bold mb-4 text-center">
                  Add Student
                </h2>
                <form onSubmit={handleSubmit}>
                  <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px] mb-2 ">
                    <label className="block text-sm font-semibold  m-3 w-[30%]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#F0F0F0]mb-2  rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Register Number
                    </label>
                    <input
                      type="text"
                      name="registerNumber"
                      value={formData.registerNumber}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#50E3C2] mb-2 border rounded-[7px] ">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2 rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Admission Date
                    </label>
                    <input
                      type="date"
                      name="admissionDate"
                      value={formData.admissionDate}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#50E3C2] mb-2 border rounded-[7px] ">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Course
                    </label>
                    <input
                      type="text"
                      name="course"
                      value={formData.course}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2 rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      State
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#50E3C2] mb-2 border rounded-[7px] ">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Zip Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2 rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      District
                    </label>
                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#50E3C2] mb-2 border rounded-[7px] ">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Address
                    </label>
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2  rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#50E3C2] mb-2 border rounded-[7px] ">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      name="mobileNumber"
                      value={formData.mobileNumber}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex items-center gap-3 bg-[#F0F0F0] mb-2 rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold m-3 w-[30%]">
                      Duration
                    </label>
                    <input
                      type="text"
                      name="duration"
                      value={formData.duration}
                      onChange={handleInputChange}
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      required
                    />
                  </div>
                  <div className="flex justify-center mt-8">
                    <button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="mr-2 px-4 py-1 bg-blue-500 text-white rounded"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-1 bg-blue-500 text-white rounded"
                    >
                      Save
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Student;