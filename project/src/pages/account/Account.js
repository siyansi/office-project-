// import React from 'react';
// import img from "../../assests/55311.jpg"
// const Account = () => {
//   const staffDetails = {
//     name: "Simon peter",
//     staffId: "Si246",
//     gender: "Male",
//     joinDate: "2020-01-01",
//     course: " BSC.Computer Science",
//     state: "Tamil Nadu",
//     district: "Tenkasi",
//     zipCode: "627854",
//     address: "6/63,PUTHUR COLONY ,kavalakurichi",
//     mobileNo: "6383285237",
//     email: "siyansimon246@gmail.com"
//   };

//   return (
//     <div className="p-6 md:px-20">
//       {/* Heading */}
//       <h1 className="text-3xl font-semibold mb-4">Staff Details</h1>

//       {/* Staff Profile Section */}
//       <div className="flex mb-6">
//         {/* Left Side: Profile Picture */}
//         <div className="w-32 h-32 border-4 border-gray-300 rounded-full overflow-hidden">
//           <img
//             src={img}
//             alt="Profile"
//             className="w-full h-full object-cover"
//           />
//         </div>

//         {/* Right Side: Staff Information */}
//         <div className="ml-6 flex flex-col justify-center">
//           <h2 className="text-xl font-semibold">{staffDetails.name}</h2>
//           <p className="text-sm text-gray-600">Staff ID: {staffDetails.staffId}</p>
//           <p className="text-sm text-gray-600">Gender: {staffDetails.gender}</p>
//         </div>
//       </div>

//       {/* Staff Details Table */}
//       <div className="bg-white shadow-md rounded-lg md:p-4 pr-2 pl-2 ">
//         <table className="w-full  ">
//           <thead>
//             <tr className="border-b border-r   ">
//               <th className="text-left border-r border-b-4 border-white  rounded-l-xl  bg-teal-300  p-2">Field</th>
//               <th className="text-left pl-12 border-r border-b-4 border-white  rounded-r-xl  bg-teal-300   p-2">Details</th>
//             </tr>
//           </thead>
//           <tbody className=''>
//             <tr className="border-b  ">
//               <td className="p-2 border-r border-b-4 border-white  rounded-l-xl  bg-gray-200  font-semibold">Name</td>
//               <td className="p-2  pl-10 border-r border-b-4 border-white  rounded-r-xl  bg-gray-200  ">{staffDetails.name}</td>
//             </tr>
//             <tr className="border-b ">
//               <td className="p-2 border-r border-b-4 border-white  rounded-l-xl  bg-teal-300 font-semibold">Staff ID</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-teal-300  pl-10 ">{staffDetails.staffId}</td>
//             </tr>
//             <tr className="border-b ">
//               <td className="p-2  border-b-4 border-white  rounded-l-xl  bg-gray-200 border-r font-semibold">Gender</td>
//               <td className="p-2  border-b-4 border-white  rounded-r-xl  bg-gray-200 pl-10 ">{staffDetails.gender}</td>
//             </tr>
//             <tr className="border-b ">
//               <td className="p-2 border-r border-b-4 border-white  rounded-l-xl  bg-teal-300 font-semibold">Join Date</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-teal-300 pl-10 ">{staffDetails.joinDate}</td>
//             </tr>
//             <tr className="border-b ">
//               <td className="p-2 border-b-4 border-white  rounded-l-xl  bg-gray-200 border-r font-semibold">Course</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-gray-200 pl-10 ">{staffDetails.course}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2  border-b-4 border-white  rounded-l-xl  bg-teal-300 border-r font-semibold">State</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-teal-300  pl-10 ">{staffDetails.state}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 border-b-4 border-white  rounded-l-xl  bg-gray-300 border-r font-semibold">District</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-gray-300 pl-10 ">{staffDetails.district}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 border-b-4 border-white  rounded-l-xl  bg-teal-300 border-r font-semibold">Zip Code</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-teal-300 pl-10 ">{staffDetails.zipCode}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 border-b-4 border-white  rounded-l-xl  bg-gray-200 border-r font-semibold">Address</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-gray-200 pl-10 ">{staffDetails.address}</td>
//             </tr>
//             <tr className="border-b">
//               <td className="p-2 border-b-4 border-white  rounded-l-xl  bg-teal-300 border-r font-semibold">Mobile No</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-teal-300 pl-10 ">{staffDetails.mobileNo}</td>
//             </tr>
//             <tr>
//               <td className="p-2 border-b-4 border-white  rounded-l-xl  bg-gray-200 border-r font-semibold">Email</td>
//               <td className="p-2 border-b-4 border-white  rounded-r-xl  bg-gray-200 pl-10 ">{staffDetails.email}</td>
//             </tr>
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Account;

import React, { useEffect, useState } from "react";
import axios from "axios";
import img from "../../assests/55311.jpg";

const Account = () => {
  const [userDetails, setUserDetails] = useState(null);
  const userId = localStorage.getItem("studentId"); // User ID from localStorage
  const userRole = localStorage.getItem("role"); // Role from localStorage

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (!userId || !userRole) return;

      try {
        // ✅ Check role and fetch from the correct API
        const endpoint =
          userRole === "Admin"
            ? `http://localhost:5005/api/admins/${userId}`
            : `http://localhost:5005/api/students/${userId}`;

        const response = await axios.get(endpoint);
        setUserDetails(response.data);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId, userRole]);

  if (!userDetails) {
    return <div className="p-6 md:px-20">Loading...</div>;
  }

  return (
    <div className="p-6 md:px-20">
      <h1 className="text-3xl font-semibold mb-4">Account Details</h1>
      <div className="flex mb-6">
        <div className="w-32 h-32 border-4 border-blue-400 rounded-full overflow-hidden">
          <img src={img} alt="Profile" className="w-full h-full object-cover" />
        </div>
        <div className="ml-6 flex flex-col justify-center">
          <h2 className="text-xl font-semibold">{userDetails.fullName}</h2>
          <p className="text-sm text-gray-600">ID: {userDetails.registerNumber || userDetails.adminId}</p>
          <p className="text-sm text-gray-600">Role: {userRole}</p>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg md:p-4 pr-2 pl-2">
        <table className="w-full">
          <tbody>
            {Object.entries({
              Name: userDetails.fullName,
              "Register ID": userDetails.registerNumber || userDetails.adminId,
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
              <tr key={key} className={index % 2 === 0 ? "bg-[#F0F0F0]" : "bg-[#50E3C2]"}>
                <td className="p-2 border-r border-b-8 rounded-l-xl border-white font-semibold">
                  {key}
                </td>
                <td className="p-2 border-b-8 rounded-r-xl border-white pl-10">{value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Account;
