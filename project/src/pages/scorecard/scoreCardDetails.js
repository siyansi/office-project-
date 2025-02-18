import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Navbar from "../../componenet/navbar/Navbar";
import AdminSidebar from "../../componenet/Sidebar/Sidebar";

const ScoreboardDetails = () => {
  const { id } = useParams(); // Extract the scorecard ID from the URL
  const [scoreDetails, setScoreDetails] = useState(null);

  // Fetch scorecard details by ID
  useEffect(() => {
    axios
      .get(`http://localhost:5005/api/scorecards/${id}`)
      
      .then((response) => {
        setScoreDetails(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scorecard details:", error);
      });
  }, [id]);

  if (!scoreDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-teal-200">
        <p className="text-lg font-bold text-teal-800">Loading details...</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    if (!dateString) return "Invalid Date"; // Handle empty or undefined date
  
    const date = new Date(dateString);
    if (isNaN(date)) {
      // Try parsing manually if the Date object fails
      const [year, month, day] = dateString.split("-");
      if (year && month && day) {
        return `${day.padStart(2, "0")}/${month.padStart(2, "0")}/${year}`;
      }
      return "Invalid Date";
    }
  
    // Format the date as dd/MM/yyyy
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
  
    return `${day}/${month}/${year}`;
  };
  
  

  return (
    <div className="">
<div className="w-[%] ml-0 md:ml-60  ">
      <Navbar  />
      </div>
    <div className="flex flex-col px-20 items-center justify-c min-h-screen mt-8 bg-teal-200 p-4">
      
     
      <AdminSidebar/>
      <div className="bg-white w-full max-w-4xl mt-6 rounded-lg shadow-xl p-6">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-teal-700 mb-4">
          Scoreboard Details
        </h1>

        {/* Top Section */}
        <div className="grid grid-cols-2  md:grid-cols-4 gap-4 mb-6">
          <DetailCard className="border-2 border-black" label="Trainee Name" value={scoreDetails.traineeName} />
          <DetailCard label="Trainer Name" value={scoreDetails.trainerName} />
          <DetailCard label="Course Name" value={scoreDetails.courseName} />
          <DetailCard
  label="Date"
  value={moment(scoreDetails.trainingDate).format("DD/MM/YYYY")}
/>
        </div>

        {/* Middle Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <DetailCard
            label="Training Timing"
            value={scoreDetails.trainingTime}
          />
          <DetailCard label="Work Assigned" value={scoreDetails.workAssigned} />
          <DetailCard
            label="Work Completed"
            value={scoreDetails.workCompleted}
          />
          <DetailCard label="Work Pending" value={scoreDetails.workPending} />
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <DetailCard label="Communication" value={scoreDetails.communication} />
          <DetailCard label="Attendance" value={scoreDetails.attendance} />
          <DetailCard label="Attitude" value={scoreDetails.attitude} />
        </div>

        {/* Total Score */}
        <div className="text-center border-2 border-orange-500 bg-orange-300 p-3 rounded-lg mb-6">
          <h2 className="text-lg font-bold">Total Score (out of 15)</h2>
          <p className="text-xl font-bold">{scoreDetails.total}</p>
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => window.print()}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600"
          >
            Print
          </button>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-500 text-white rounded-lg shadow hover:bg-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    </div>
  );
};

// Reusable component for each detail
const DetailCard = ({ label, value }) => (
  <div className="text-center border border-orange-300 bg-orange-200 p-3 rounded-lg">
    <h2 className="text-sm font-bold">{label}</h2>
    <p className="text-base">{value || "N/A"}</p>
  </div>
);

export default ScoreboardDetails;
