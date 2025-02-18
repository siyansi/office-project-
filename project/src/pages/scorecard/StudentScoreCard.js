import React, { useEffect, useState } from "react";
import axios from "axios";
import moment from "moment";

const ScoreDetails = () => {
  const [scoreDetails, setScoreDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // ✅ Always fetch student ID from localStorage
  const studentId = localStorage.getItem("studentId");

  useEffect(() => {
    if (!studentId) return;

    axios
      .get(`http://localhost:5005/api/scorecards/student/${studentId}`)
      .then((response) => {
        setScoreDetails(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching scorecard details:", error);
        setLoading(false);
      });
  }, [studentId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-teal-200">
        <p className="text-lg font-bold text-teal-800">Loading details...</p>
      </div>
    );
  }

  if (!scoreDetails) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-teal-200">
        <p className="text-lg font-bold text-red-800">No data available</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-teal-200 p-4">
      <div className="bg-white w-full max-w-4xl mt-6 rounded-lg shadow-xl p-6">
        <h1 className="text-2xl font-bold text-center text-teal-700 mb-4">
          Scoreboard Details
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <DetailCard label="Trainee Name" value={scoreDetails.traineeName} />
          <DetailCard label="Trainer Name" value={scoreDetails.trainerName} />
          <DetailCard label="Course Name" value={scoreDetails.courseName} />
          <DetailCard
            label="Date"
            value={moment(scoreDetails.trainingDate).format("DD/MM/YYYY")}
          />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <DetailCard label="Training Timing" value={scoreDetails.trainingTime} />
          <DetailCard label="Work Assigned" value={scoreDetails.workAssigned} />
          <DetailCard label="Work Completed" value={scoreDetails.workCompleted} />
          <DetailCard label="Work Pending" value={scoreDetails.workPending} />
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <DetailCard label="Communication" value={scoreDetails.communication} />
          <DetailCard label="Attendance" value={scoreDetails.attendance} />
          <DetailCard label="Attitude" value={scoreDetails.attitude} />
        </div>

        <div className="text-center border-2 border-orange-500 bg-orange-300 p-3 rounded-lg mb-6">
          <h2 className="text-lg font-bold">Total Score (out of 15)</h2>
          <p className="text-xl font-bold">{scoreDetails.total}</p>
        </div>

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
  );
};

// Reusable component for each detail
const DetailCard = ({ label, value }) => (
  <div className="text-center border border-orange-300 bg-orange-200 p-3 rounded-lg">
    <h2 className="text-sm font-bold">{label}</h2>
    <p className="text-base">{value || "N/A"}</p>
  </div>
);

export default ScoreDetails;
