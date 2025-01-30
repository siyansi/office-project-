import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Doughnut } from 'react-chartjs-2';
import mad from "../../assests/55311.jpg";

const StudentProfile = () => {
  const { id } = useParams(); // Get student ID from URL
  const navigate = useNavigate(); // For navigation
  const [student, setStudent] = useState(null); // Student data
  const [isLoading, setIsLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await fetch(`http://localhost:5005/api/students/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch student data');
        }
        const data = await response.json();
        setStudent(data);
        setIsLoading(false); // Data fetched successfully
      } catch (error) {
        console.error('Error fetching student details:', error);
        setIsLoading(false); // Stop loading even if there’s an error
      }
    };

    fetchStudent();
  }, [id]);

  // Display a loading indicator while the data is being fetched
  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  // Handle case where `student` is null (e.g., fetch error or no data)
  if (!student) {
    return <div className="p-6 text-red-500">Error: Unable to fetch student details.</div>;
  }

  const attendanceData = {
    labels: ['Attended', 'Missed'],
    datasets: [
      {
        data: [
          student.attendance?.attended || 0,
          (student.attendance?.totalClasses || 0) - (student.attendance?.attended || 0),
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
          student.exams?.passed || 0,
          (student.exams?.total || 0) - (student.exams?.passed || 0),
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
          student.assignments?.completed || 0,
          (student.assignments?.total || 0) - (student.assignments?.completed || 0),
        ],
        backgroundColor: ['#A78BFA', '#FCD34D'],
      },
    ],
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen relative">
      {/* X Icon */}
      <button
        className="absolute top-0 right-3 text-gray-800 hover:text-red-500 text-4xl"
        onClick={() => navigate('/dashboard')}
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
            <h1 className="text-2xl font-bold">{student.fullName}</h1>
            <p>Student ID: {student.registerNumber}</p>
            <p>Gender: {student.gender}</p>
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-6">
          <div className="p-4 bg-blue-200 text-center rounded-lg">
            <h2 className="font-semibold">Admission Date</h2>
            <p>{student.admissionDate}</p>
          </div>
          <div className="p-4 bg-green-200 text-center rounded-lg">
            <h2 className="font-semibold">Registration No.</h2>
            <p>{student.registerNumber}</p>
          </div>
          <div className="p-4 bg-purple-200 text-center rounded-lg">
            <h2 className="font-semibold">Course</h2>
            <p>{student.course}</p>
          </div>
          <div className="p-4 bg-pink-200 text-center rounded-lg">
            <h2 className="font-semibold">Duration</h2>
            <p>{student.duration} Months</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Full Name</h2>
            <p>{student.fullName}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Email</h2>
            <p>{student.email}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Mobile No.</h2>
            <p>{student.mobileNumber}</p>
          </div>
          <div className="p-4 bg-gray-100 rounded-lg">
            <h2 className="text-lg font-semibold">Address</h2>
            <p>{student.address}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Academic Performance</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4 bg-pink-100 shadow-md rounded-lg text-center">
            <h3 className="text-lg font-semibold">Attendance</h3>
            <Doughnut data={attendanceData} />
            <button className="mt-4 bg-pink-500 text-white py-1 px-4 rounded-lg">View Details</button>
          </div>
          <div className="p-4 bg-blue-100 shadow-md rounded-lg text-center">
            <h3 className="text-lg font-semibold">Exams</h3>
            <Doughnut data={examsData} />
            <button className="mt-4 bg-blue-500 text-white py-1 px-4 rounded-lg">View Details</button>
          </div>
          <div className="p-4 bg-purple-100 shadow-md rounded-lg text-center">
            <h3 className="text-lg font-semibold">Assignments</h3>
            <Doughnut data={assignmentsData} />
            <button className="mt-4 bg-purple-500 text-white py-1 px-4 rounded-lg">View Details</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
