// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useSelector } from "react-redux";

// const StudentAssignment = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const rowsPerPage = 8;
//   const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [actionRow, setActionRow] = useState(null);
//   const [selectedStudent, setSelectedStudent] = useState("");
//   const students = useSelector((state) => state.students.students);

//   const [newAssignment, setNewAssignment] = useState({
//     name: "",
//     deadline: "",
//     topic: "",
//     attachment: null,
//   });

//   useEffect(() => {
//     fetchAssignments();
//   }, []);

//   const fetchAssignments = async () => {
//     try {
//       const response = await axios.get("http://localhost:5005/api/assignments/see");
//       setAssignments(response.data);
//     } catch (error) {
//       console.error("Error fetching assignments:", error);
//     }
//   };

//   const handlePageChange = (page) => setCurrentPage(page);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setNewAssignment({ ...newAssignment, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setNewAssignment({ ...newAssignment, attachment: e.target.files[0] });
//   };

//   const handleView = (id) => {
//     const assignment = assignments.find((assignment) => assignment._id === id);
//     setSelectedAssignment(assignment);
//     setIsViewModalOpen(true);
//     setIsCreateModalOpen(false);
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5005/api/assignments/${id}`);
//       fetchAssignments();
//     } catch (error) {
//       console.error("Error deleting assignment:", error);
//     }
//   };

//   const handleCreateAssignment = async () => {
//     if (newAssignment.name && newAssignment.deadline && newAssignment.topic) {
//       const formData = new FormData();
//       formData.append("name", newAssignment.name);
//       formData.append("deadline", newAssignment.deadline);
//       formData.append("topic", newAssignment.topic);
//       formData.append("assignee", selectedStudent);
//       if (newAssignment.attachment) {
//         formData.append("attachment", newAssignment.attachment);
//       }

//       try {
//         const res = await axios.post("http://localhost:5005/api/assignments/add", formData, {
//           headers: { "Content-Type": "multipart/form-data" },
//         });
//         if (res.status === 200 || res.status === 201) {
//           setIsCreateModalOpen(false);
//           fetchAssignments();
//           setNewAssignment({ name: "", deadline: "", topic: "", attachment: null });
//         }
//       } catch (error) {
//         console.error("Error adding assignment:", error);
//       }
//     } else {
//       alert("Please fill all fields before publishing.");
//     }
//   };

//   const indexOfLastRow = currentPage * rowsPerPage;
//   const indexOfFirstRow = indexOfLastRow - rowsPerPage;
//   const currentRows = assignments.slice(indexOfFirstRow, indexOfLastRow);
//   const totalPages = Math.ceil(assignments.length / rowsPerPage);

//   return (
//     <div className="p-6 min-h-screen px-20">
//       <h1 className="text-2xl font-semibold mb-4">Assignments</h1>
//       <button
//         onClick={() => setIsCreateModalOpen(true)}
//         className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600"
//       >
//         Create Assignment
//       </button>
//       <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden mt-4">
//         <thead className="bg-[#F5A623]">
//           <tr>
//             <th className="px-4 py-2 border-b text-white">Name</th>
//             <th className="px-4 py-2 border-b text-white">Deadline</th>
//             <th className="px-4 py-2 border-b text-white">Topic</th>
//             <th className="px-4 py-2 border-b text-white">Assigned</th>
//             <th className="px-4 py-2 border-b text-white">Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {currentRows.map((assignment) => (
//             <tr key={assignment._id} className="hover:bg-gray-100">
//               <td className="px-4 py-2 border-b text-center">{assignment.name}</td>
//               <td className="px-4 py-2 border-b text-center">{assignment.deadline}</td>
//               <td className="px-4 py-2 border-b text-center">{assignment.topic}</td>
//               <td className="px-4 py-2 border-b text-center">{assignment.assignee}</td>
//               <td className="px-4 py-2 border-b text-center">
//                 <button
//                   onClick={() => handleView(assignment._id)}
//                   className="text-blue-500 hover:text-blue-700 mr-2"
//                 >
//                   View
//                 </button>
//                 <button
//                   onClick={() => handleDelete(assignment._id)}
//                   className="text-red-500 hover:text-red-700"
//                 >
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//       <div className="flex justify-center mt-4">
//         {[...Array(totalPages).keys()].map((page) => (
//           <button
//             key={page + 1}
//             onClick={() => handlePageChange(page + 1)}
//             className={`px-3 py-2 mx-1 ${currentPage === page + 1 ? "bg-blue-500 text-white" : "bg-gray-200"}`}
//           >
//             {page + 1}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default StudentAssignment;

import { useEffect, useState } from "react";
import axios from "axios";

const StudentAssignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [actionRow, setActionRow] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [isViewModalOpen, setIsViewModalOpen] = useState(false);
    const [newAssignment, setNewAssignment] = useState({ name: "", deadline: "", topic: "", attachment: null });
    const [file, setFile] = useState(null);
  const rowsPerPage = 5;

  useEffect(() => {
    const assignee = localStorage.getItem("assignee");
    if (!assignee) {
      console.error("❌ No assignee found in localStorage.");
      return;
    }

    axios
      .get(`http://localhost:5005/api/assignments/studentassignments/${assignee}`)
      .then((res) => {
        setAssignments(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("❌ Error fetching assignments:", err);
        setError("Failed to load assignments.");
        setLoading(false);
      });
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePublish = async (assignmentId) => {
    if (!file) {
      alert("Please select a file before publishing.");
      return;
    }
  
    const formData = new FormData();
    formData.append("attachments", file);  // Change "file" to "attachments" to match backend
  
    try {
      const response = await axios.post(
        `http://localhost:5005/api/assignments/upload/${assignmentId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("File uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload file.");
    }
  };
  
  
  
  // Calculate pagination
  const totalPages = Math.ceil(assignments.length / rowsPerPage);
  const currentRows = assignments.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleView = (id) => {
    const assignment = assignments.find((assignment) => assignment._id === id);
    setSelectedAssignment(assignment);
    setIsViewModalOpen(true); // Open the view modal
    // Close the create modal if it's open
  };

  return (
    <div className="p-4 px-20">
      <h2 className="text-xl font-bold ">Your Assignments</h2>

      {loading ? (
        <p>Loading assignments...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto w-[100%]">
          <table className="min-w-full bg-white shadow-md rounded-lg mt-8 overflow-hidden">
            <thead className="bg-[#F5A623]">
              <tr>
                <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Name</th>
                <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Deadline</th>
                <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Topic</th>
                <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Assigned</th>
                <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentRows.map((assignment) => (
                <tr key={assignment._id} className="bg-[#50E3C2] text-gray-800 hover:bg-teal-400">
                  <td className="px-4 py-2 border-b-8 rounded-l-xl border-white text-center">{assignment.name}</td>
                  <td className="px-4 py-2 border-b-8  border-white text-center">{assignment.deadline}</td>
                  <td className="px-4 py-2 border-b-8 border-white text-center">{assignment.topic}</td>
                  <td className="px-4 py-2 border-b-8  border-white text-center">{assignment.assignee}</td>
                  <td className="px-4 py-2 border-b-8 pb-3   rounded-r-xl border-white text-center relative">
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
                            
                            </div>

                            <button
                              onClick={() => handleView(assignment._id)} // <-- View button click
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

          {/* Pagination Controls */}
          <div className="flex justify-center items-center space-x-2 mt-4">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md disabled:opacity-50">
              &lt;
            </button>
            {[...Array(totalPages).keys()].map((page) => (
              <button
                key={page + 1}
                onClick={() => handlePageChange(page + 1)}
                className={`px-4 py-2 rounded-lg shadow-md ${currentPage === page + 1 ? "bg-orange-500 text-white" : "bg-gray-200 hover:bg-gray-300"}`}
              >
                {page + 1}
              </button>
            ))}
            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg shadow-md disabled:opacity-50">
              &gt;
            </button>
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
                  Attachment:
                </label>
                <input type="file" onChange={handleFileChange}  

                  className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black focus:outline-none text-black"
                />
              </div>
              <button
              onClick={() => handlePublish(selectedAssignment._id)} 
              className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
              disabled={loading}
            >
              {loading ? "Uploading..." : "Publish"}
             
            </button>
              {/* <div className="mt-4">
                {newAssignment.attachment && (
                  <div className="border p-3 rounded-md">
                    <h3 className="text-sm font-semibold">
                      Attachment Preview:
                    </h3>
                    {(newAssignment.attachment)}
                  </div>
                )}
              </div> */}
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

export default StudentAssignments;




// import { useEffect, useState } from "react";
// import axios from "axios";

// const StudentAssignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [actionRow, setActionRow] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedAssignment, setSelectedAssignment] = useState(null);
//   const [isViewModalOpen, setIsViewModalOpen] = useState(false);
//   const [newAssignment, setNewAssignment] = useState({ name: "", deadline: "", topic: "", attachment: null });
//   const [file, setFile] = useState(null);

//   const rowsPerPage = 5;

//   useEffect(() => {
//     const assignee = localStorage.getItem("assignee");
//     if (!assignee) {
//       console.error("❌ No assignee found in localStorage.");
//       return;
//     }

//     axios
//       .get(`http://localhost:5005/api/assignments/studentassignments/${assignee}`)
//       .then((res) => {
//         setAssignments(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Error fetching assignments:", err);
//         setError("Failed to load assignments.");
//         setLoading(false);
//       });
//   }, []);

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handlePublish = async (assignmentId) => {
//     if (!file) {
//       alert("Please select a file before publishing.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       await axios.post(`http://localhost:5005/api/assignments/upload/${assignmentId}`, formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       alert("File uploaded successfully!");
//     } catch (error) {
//       console.error("Error uploading file:", error);
//       alert("Failed to upload file.");
//     }
//   };

//   const totalPages = Math.ceil(assignments.length / rowsPerPage);
//   const currentRows = assignments.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

//   const handlePageChange = (page) => {
//     if (page >= 1 && page <= totalPages) {
//       setCurrentPage(page);
//     }
//   };

//   const handleView = (id) => {
//     const assignment = assignments.find((assignment) => assignment._id === id);
//     setSelectedAssignment(assignment);
//     setIsViewModalOpen(true);
//   };

//   return (
//     <div className="p-4 px-20">
//       <h2 className="text-xl font-bold ">Your Assignments</h2>

//       {loading ? (
//         <p>Loading assignments...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : (
//         <div className="overflow-x-auto w-[100%]">
//           <table className="min-w-full bg-white shadow-md rounded-lg mt-8 overflow-hidden">
//             <thead className="bg-[#F5A623]">
//               <tr>
//                 <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Name</th>
//                 <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Deadline</th>
//                 <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Topic</th>
//                 <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Assigned</th>
//                 <th className="px-4 py-2 border-b-8 border-white text-white text-sm md:text-base">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentRows.map((assignment) => (
//                 <tr key={assignment._id} className="bg-[#50E3C2] text-gray-800 hover:bg-teal-400">
//                   <td className="px-4 py-2 border-b-8 rounded-l-xl border-white text-center">{assignment.name}</td>
//                   <td className="px-4 py-2 border-b-8  border-white text-center">{assignment.deadline}</td>
//                   <td className="px-4 py-2 border-b-8 border-white text-center">{assignment.topic}</td>
//                   <td className="px-4 py-2 border-b-8  border-white text-center">{assignment.assignee}</td>
//                   <td className="px-4 py-2 border-b-8 pb-3 rounded-r-xl border-white text-center relative">
//                     <button
//                       onClick={() => setActionRow(actionRow === assignment._id ? null : assignment._id)}
//                       className="p-1 rounded-full hover:bg-gray-400 focus:outline-none"
//                     >
//                       <span className="text-lg">⋮</span>
//                     </button>
//                     {actionRow === assignment._id && (
//                       <div className="flex flex-col space-y-2 absolute top-8 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg">
//                         <button onClick={() => handleView(assignment._id)} className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600">View</button>
//                         <input type="file" onChange={handleFileChange} className="border p-1" />
//                         {/* <button 
//                         onClick={() => handlePublish(assignment._id)} 
//                         className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600">
//                           Publish
//                         </button> */}

//                         <button
//               onClick={() => handlePublish(assignment._id)} 
//               className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
//               disabled={loading}
//             >
//               {loading ? "Uploading..." : "Publish"}
//             </button>



//                       </div>
//                     )}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// };

// export default StudentAssignments;




// import { useEffect, useState } from "react";
// import axios from "axios";

// const StudentAssignments = () => {
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     const assignee = localStorage.getItem("assignee"); // ✅ Get `assignee` from localStorage
  
//     if (!assignee) {
//       console.error("❌ No assignee found in localStorage.");
//       return;
//     }
  
//     axios
//       .get(`http://localhost:5005/api/assignments/studentassignments/${assignee}`)
//       .then((res) => {
//         setAssignments(res.data);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("❌ Error fetching assignments:", err);
//         setError("Failed to load assignments.");
//         setLoading(false);
//       });
//   }, []);
  

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold">Your Assignments</h2>

//       {loading ? (
//         <p>Loading assignments...</p>
//       ) : error ? (
//         <p className="text-red-500">{error}</p>
//       ) : assignments.length > 0 ? (
//         <table className="w-full bg-white shadow-md rounded-lg">
//           <thead className="bg-gray-800 text-white">
//             <tr>
//               <th className="p-3">Name</th>
//               <th className="p-3">Deadline</th>
//               <th className="p-3">Topic</th>
//             </tr>
//           </thead>
//           <tbody>
//             {assignments.map((assignment) => (
//               <tr key={assignment._id} className="border-b">
//                 <td className="p-3">{assignment.name}</td>
//                 <td className="p-3">
//                   {new Date(assignment.deadline).toLocaleDateString()}
//                 </td>
//                 <td className="p-3">{assignment.topic}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       ) : (
//         <p>No assignments assigned.</p>
//       )}
//     </div>
//   );
// };

// export default StudentAssignments;
