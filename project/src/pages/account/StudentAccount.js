import React, { useEffect, useState } from "react";
import axios from "axios";
import { Audio } from "react-loader-spinner";
import img from "../../assests/55311.jpg";

const StudentAccount = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true); // ⬅ Added loading state
  const userId = localStorage.getItem("studentId"); // Student ID from localStorage

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5005/api/students/${userId}`);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  // Show loading spinner while fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Audio height={50} width={100} color="#F5A623" ariaLabel="loading" />
      </div>
    );
  }

  // Show message if no student details found
  if (!userDetails) {
    return (
      <div className="p-6 md:px-20 text-center text-gray-500">
        <h2>No student details available.</h2>
      </div>
    );
  }

  return (
    <div className="p-6 md:px-20">
      <h1 className="text-3xl font-semibold mb-4">Student Account Details</h1>
      <div className="flex mb-6">
        <div className="w-32 h-32 border-4 border-blue-400 rounded-full overflow-hidden">
          <img src={img} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="ml-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold">{userDetails.fullName}</h2>
          <p className="text-sm text-gray-600">ID: {userDetails.registerNumber}</p>
          <p className="text-sm text-gray-600">Role: Student</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg md:p-4 pr-2 pl-2">
        <table className="w-full">
          <tbody>
            {Object.entries({
              Name: userDetails.fullName,
              "Register ID": userDetails.registerNumber,
              Gender: userDetails.gender || "N/A",
              "Join Date": userDetails.admissionDate
                ? new Date(userDetails.admissionDate).toLocaleDateString()
                : "N/A",
              Course: userDetails.course || "N/A",
              State: userDetails.state || "N/A",
              District: userDetails.district || "N/A",
              "Zip Code": userDetails.zipCode || "N/A",
              Address: userDetails.address || "N/A",
              "Mobile No": userDetails.mobileNumber || "N/A",
              Email: userDetails.email,
            }).map(([key, value], index) => (
              <tr
                key={key}
                className={index % 2 === 0 ? "bg-[#F0F0F0]" : "bg-[#50E3C2]"}
              >
                <td className="p-2 border-r border-b-8 rounded-l-xl border-white font-semibold">
                  {key}
                </td>
                <td className="p-2 border-b-8 rounded-r-xl border-white pl-10">
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default StudentAccount;
