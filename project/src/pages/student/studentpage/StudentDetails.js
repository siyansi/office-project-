import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import mad from "../../../assests/55311.jpg";
import axios from "axios";

const StudentDetails = () => {
  const navigate = useNavigate();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Get student ID from localStorage
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) {
      console.error("Student ID is missing from localStorage!");
      navigate("/login"); // ✅ Redirect to login if missing
      return;
    }

    const fetchStudentDetails = async () => {
      try {
        console.log("Fetching student details for ID:", studentId);
        const res = await axios.get(`http://localhost:5005/api/students/${studentId}`);
        setStudentData(res.data);
      } catch (err) {
        console.error("Error fetching student:", err);
        setError("Failed to load student data.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, [studentId, navigate]);

  if (loading) return <div className="p-6 text-gray-500">Loading student details...</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!studentData) return <div className="p-6 text-red-500">No student found.</div>;

  // Destructure student data
  const {
    fullName = "N/A",
    registerNumber = "N/A",
    gender = "N/A",
    admissionDate = "N/A",
    course = "N/A",
    duration = "N/A",
    email = "N/A",
    mobileNumber = "N/A",
    address = "N/A",
    attendance = { attended: 0, totalClasses: 0 },
    exams = { passed: 0, total: 0 },
    assignments = { completed: 0, total: 0 },
  } = studentData;

  const attendanceData = {
    labels: ['Attended', 'Missed'],
    datasets: [
      {
        data: [
          attendance?.attended || 0,
          (attendance?.totalClasses || 0) - (attendance?.attended || 0),
        ],
        backgroundColor: ['#34D399', '#F87171'],
      },
    ],
  };

  const examsData = {
    labels: ['Passed', 'Failed'],
    datasets: [
      {
        data: [
          exams?.passed || 0,
          (exams?.total || 0) - (exams?.passed || 0),
        ],
        backgroundColor: ['#60A5FA', '#F87171'],
      },
    ],
  };

  const assignmentsData = {
    labels: ['Completed', 'Pending'],
    datasets: [
      {
        data: [
          assignments?.completed || 0,
          (assignments?.total || 0) - (assignments?.completed || 0),
        ],
        backgroundColor: ['#A78BFA', '#FCD34D'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative md:px-20">
      {/* X Icon */}
      <button
        className="absolute top-0 right-3 text-gray-800 hover:text-red-500 text-4xl"
        onClick={() => navigate('/students')}
        title="Close"
      >
        &times;
      </button>

      <div className="bg-white shadow-md rounded-lg p-6">
        <div className="flex items-center space-x-4">
          <img
            src={mad}
            alt="Student"
            className="w-24 h-24 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold">{fullName}</h1>
            <p>Student ID: {registerNumber}</p>
            <p>Gender: {gender}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-blue-200 text-center rounded-lg">
            <h2 className="font-semibold">Admission Date</h2>
            <p>{admissionDate}</p>
          </div>
          <div className="p-4 bg-green-200 text-center rounded-lg">
            <h2 className="font-semibold">Registration No.</h2>
            <p>{registerNumber}</p>
          </div>
          <div className="p-4 bg-purple-200 text-center rounded-lg">
            <h2 className="font-semibold">Course</h2>
            <p>{course}</p>
          </div>
          <div className="p-4 bg-pink-200 text-center rounded-lg">
            <h2 className="font-semibold">Duration</h2>
            <p>{duration} Months</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Full Name</h2>
            <p>{fullName}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Email</h2>
            <p>{email}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Mobile No.</h2>
            <p>{mobileNumber}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Address</h2>
            <p>{address}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Academic Performance</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-pink-100 shadow-md rounded-lg text-center">
            <h3 className="text-lg font-semibold">Attendance</h3>
            <Doughnut data={attendanceData} />
            <Link to={"/attendance"} >
              <button className="mt-4 bg-pink-500 text-white py-1 px-4 rounded-lg">View Details</button>
            </Link>
          </div>
          <div className="p-4 bg-blue-100 shadow-md rounded-lg text-center">
            <h3 className="text-lg font-semibold">Exams</h3>
            <Doughnut data={examsData} />
            <button className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-lg">View Details</button>
          </div>
          <div className="p-4 bg-purple-100 shadow-md rounded-lg text-center">
            <h3 className="text-lg font-semibold">Assignments</h3>
            <Doughnut data={assignmentsData} />
            <Link to={"/assignments"} >
              <button className="mt-4 bg-purple-500 text-white py-1 px-4 rounded-lg">View Details</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;



// import React, { useEffect } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchStudentById, fetchTotalStudents } from "../../../features/StudentStudentSlice";
// import { Doughnut } from "react-chartjs-2";
// import mad from "../../../assests/55311.jpg";

// const StudentDetails = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
  
//   // ✅ Get student ID from localStorage
//   const studentId = localStorage.getItem("studentId");

//   useEffect(() => {
//     if (studentId) {
//       console.log("Fetching student details for ID:", studentId);
//       dispatch(fetchStudentById(studentId));
//     } else {
//       console.error("Student ID is missing from localStorage!");
//     }
//   }, [dispatch, studentId]);

//   // ✅ Get student data from Redux
//   const { loggedInStudent, status, error } = useSelector((state) => state.students);

//   console.log("Logged-in student from Redux:", loggedInStudent);

//   // ✅ Handle different states
//   if (status === "loading") return <div className="p-6 text-gray-500">Loading student details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!loggedInStudent) return <div className="p-6 text-red-500">No student found.</div>;


//   // Ensure student properties exist
//   const {
//     fullName = "N/A",
//     registerNumber = "N/A",
//     gender = "N/A",
//     admissionDate = "N/A",
//     course = "N/A",
//     duration = "N/A",
//     email = "N/A",
//     mobileNumber = "N/A",
//     address = "N/A",
//     attendance = { attended: 0, totalClasses: 0 },
//     exams = { passed: 0, total: 0 },
//     assignments = { completed: 0, total: 0 },
//   } = loggedInStudent || {};

//   // Attendance Chart Data
//   const attendanceData = {
//     labels: ["Attended", "Missed"],
//     datasets: [
//       {
//         data: [attendance.attended, attendance.totalClasses - attendance.attended],
//         backgroundColor: ["#34D399", "#F87171"],
//       },
//     ],
//   };

//   // Exams Chart Data
//   const examsData = {
//     labels: ["Passed", "Failed"],
//     datasets: [
//       {
//         data: [exams.passed, exams.total - exams.passed],
//         backgroundColor: ["#60A5FA", "#F87171"],
//       },
//     ],
//   };

//   // Assignments Chart Data
//   const assignmentsData = {
//     labels: ["Completed", "Pending"],
//     datasets: [
//       {
//         data: [assignments.completed, assignments.total - assignments.completed],
//         backgroundColor: ["#A78BFA", "#FCD34D"],
//       },
//     ],
//   };

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen relative md:px-20">
//       {/* Close Button */}
//       <button
//         className="absolute top-0 right-3 text-gray-800 hover:text-red-500 text-4xl"
//         onClick={() => navigate("/students")}
//         title="Close"
//       >
//         &times;
//       </button>

//       {/* Total Student Count */}
//       <div className="bg-blue-200 text-center p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold">Total Students</h2>
//         {/* <p className="text-2xl font-bold">{totalStudents}</p> */}
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 mt-6">
//         <div className="flex items-center space-x-4">
//           <img src={mad} alt="Student" className="w-24 h-24 rounded-full object-cover" />
//           <div>
//             <h1 className="text-2xl font-bold">{fullName}</h1>
//             <p>Student ID: {registerNumber}</p>
//             <p>Gender: {gender}</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-4 gap-4 mt-6">
//           <DetailCard title="Admission Date" value={admissionDate} />
//           <DetailCard title="Registration No." value={registerNumber} />
//           <DetailCard title="Course" value={course} />
//           <DetailCard title="Duration" value={`${duration} Months`} />
//         </div>

//         <div className="grid grid-cols-2 gap-4 mt-6">
//           <DetailCard title="Full Name" value={fullName} />
//           <DetailCard title="Email" value={email} />
//           <DetailCard title="Mobile No." value={mobileNumber} />
//           <DetailCard title="Address" value={address} />
//         </div>
//       </div>

//       {/* Academic Performance */}
//       <div className="mt-8">
//         <h2 className="text-xl font-bold mb-4">Academic Performance</h2>
//         <div className="grid grid-cols-3 gap-4">
//           <PerformanceCard title="Attendance" data={attendanceData} color="pink" link="/attendance" />
//           <PerformanceCard title="Exams" data={examsData} color="blue" />
//           <PerformanceCard title="Assignments" data={assignmentsData} color="purple" link="/assignments" />
//         </div>
//       </div>
//     </div>
//   );
// };

// // Detail Card Component
// const DetailCard = ({ title, value }) => (
//   <div className="p-4 bg-gray-100 rounded-lg">
//     <h2 className="text-lg font-semibold">{title}</h2>
//     <p>{value}</p>
//   </div>
// );

// // Performance Card Component
// const PerformanceCard = ({ title, data, color, link }) => (
//   <div className={`p-4 bg-${color}-100 shadow-md rounded-lg text-center`}>
//     <h3 className="text-lg font-semibold">{title}</h3>
//     <Doughnut data={data} />
//     {link && (
//       <Link to={link}>
//         <button className={`mt-4 bg-${color}-500 text-white py-1 px-4 rounded-lg`}>View Details</button>
//       </Link>
//     )}
//   </div>
// );

// export default StudentDetails;




// import React, { useEffect, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import axios from "axios";
// import { Doughnut } from "react-chartjs-2";
// import mad from "../../../assests/55311.jpg";

// const StudentDetails = () => {
//   const navigate = useNavigate();
//   const [studentData, setStudentData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   // ✅ Get student ID from localStorage
//   const studentId = localStorage.getItem("studentId");

//   useEffect(() => {
//     if (!studentId) {
//       console.error("Student ID is missing from localStorage!");
//       navigate("/login"); // ✅ Redirect to login if missing
//       return;
//     }

//     const fetchStudentDetails = async () => {
//       try {
//         console.log("Fetching student details for ID:", studentId);
//         const res = await axios.get(`http://localhost:5005/api/students/${studentId}`);
//         setStudentData(res.data);
//       } catch (err) {
//         console.error("Error fetching student:", err);
//         setError("Failed to load student data.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchStudentDetails();
//   }, [studentId, navigate]);

//   if (loading) return <div className="p-6 text-gray-500">Loading student details...</div>;
//   if (error) return <div className="p-6 text-red-500">{error}</div>;
//   if (!studentData) return <div className="p-6 text-red-500">No student found.</div>;

//   // Destructure student data
//   const {
//     fullName = "N/A",
//     registerNumber = "N/A",
//     gender = "N/A",
//     admissionDate = "N/A",
//     course = "N/A",
//     duration = "N/A",
//     email = "N/A",
//     mobileNumber = "N/A",
//     address = "N/A",
//     attendance = { attended: 0, totalClasses: 0 },
//     exams = { passed: 0, total: 0 },
//     assignments = { completed: 0, total: 0 },
//   } = studentData;

//   return (
//     <div className="p-6 bg-gray-50 min-h-screen relative md:px-20">
//       <button className="absolute top-0 right-3 text-gray-800 hover:text-red-500 text-4xl"
//         onClick={() => navigate("/students")} title="Close">
//         &times;
//       </button>

//       <div className="bg-blue-200 text-center p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold">Total Students</h2>
//       </div>

//       <div className="bg-white shadow-md rounded-lg p-6 mt-6">
//         <div className="flex items-center space-x-4">
//           <img src={mad} alt="Student" className="w-24 h-24 rounded-full object-cover" />
//           <div>
//             <h1 className="text-2xl font-bold">{fullName}</h1>
//             <p>Student ID: {registerNumber}</p>
//             <p>Gender: {gender}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StudentDetails;
