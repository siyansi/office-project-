import React from "react";
import { Doughnut, Line } from "react-chartjs-2";
import "chart.js/auto";
import { GrGroup } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { IoIosPaper } from "react-icons/io";
import { FaListCheck } from "react-icons/fa6";
import { useSelector } from "react-redux";

const DashboardPage = () => {
  
  const students = useSelector((state) => state.students.students);


  // Doughnut Chart Data
  const doughnutData = {
    labels: ["Completed Assignments", "Not Completed Assignments", "In Progress"],
    datasets: [
      {
        data: [220, 30, 50],
        backgroundColor: ["#FBBF24", "#34D399", "#F87171"],
        hoverBackgroundColor: ["#F59E0B", "#10B981", "#EF4444"],
      },
    ],
  };

  // Line Chart Data
  const lineData = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    datasets: [
      {
        label: "Attendance",
        data: [50, 40, 60, 80, 90, 40],
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        borderColor: "#3B82F6",
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
    ],
  };

  return (
    <div className="p-2 bg-[#fff] min-h-screen md:px-20">
      {/* Overview Section */}
      <h1 className="text-2xl font-semibold mb-4">Overview</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6 ">
        {/* Overview Cards */}

        <div className="p-4 flex justify-between pt-6 bg-blue-300 rounded-xl shadow-lg cursor-pointer transition-transform duration-300 transform hover:scale-95 hover:shadow-2xl  ">
          <div>
          <h2 className="text-2xl font-bold text-blue-600">{students.length}</h2>
          <p className="text-blue-800">Enrolled Students</p>
          </div>
        
          <span className=" bg-blue-400 rounded-full h-16 w-16">
          <GrGroup className="w-10 h-10 text-gray-500 mt-3 ml-3 bg-blue-400  " />

          </span>
        </div>
        <div className="p-4 flex justify-between pt-6 bg-teal-300 rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-95 hover:shadow-2xl  cursor-pointer">
          <div>
          <h2 className="text-2xl font-bold text-teal-600">250</h2>
          <p className="text-blue-800">Present Today</p>
          </div>
        
          <span className="  bg-teal-400 rounded-full h-16 w-16">
          <CgProfile className="w-10 h-10 text-gray-500 mt-3 ml-3 bg-teal-400 " />

          </span>
        </div>



        <div className="p-4 flex justify-between bg-yellow-300 rounded-xl shadow-lg  cursor-pointer transition-transform duration-300 transform hover:scale-95 hover:shadow-2xl ">
          <div>
          <h2 className="text-2xl font-bold text-yellow-600">220</h2>
          <p className="text-yellowe-800">Completed Assignments</p>
          </div>
        
          <span className="  mt-3 bg-yellow-400 rounded-full h-16 w-16">
          <IoIosPaper className="  w-10 h-10 text-gray-500 mt-3 ml-3 bg-yellow-400 " />

          </span>
        </div>

        <div className="p-4 flex justify-between pt-6 bg-pink-300 rounded-2xl shadow-lg  cursor-pointer transition-transform duration-300 transform hover:scale-95 hover:shadow-2xl ">
          <div>
          <h2 className="text-2xl font-bold text-pink-600">230</h2>
          <p className="text-yellowe-800">Passed Exams</p>
          </div>
        
          <span className="  bg-pink-400 rounded-full h-16 w-16">
          <FaListCheck className="w-10 h-10 text-gray-500 mt-3 ml-3 bg-pink-400  " />

          </span>
        </div>

        
      </div>

      {/* Performance Progress Section */}
      <h1 className="text-2xl font-semibold mb-4">Performance Progress</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Assignments Doughnut Chart */}
        <div className="p-8 bg-orange-300 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-3">Assignments</h2>
          <Doughnut data={doughnutData} />
        </div>

        {/* Attendance Line Chart */}
        <div className="p-6 bg-pink-300 rounded-lg shadow-md ">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Attendance</h2>
            <select className="p-2 rounded bg-white shadow">
              <option>Weekly</option>
              <option>Monthly</option>
            </select>
          </div>
          <div className="flex mt-10">
          <Line data={lineData} />
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;