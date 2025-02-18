import React, { useState, useEffect } from "react";
 import ClassTabs from "../clssrecording/ClassTabs";
// import { Button, Flex } from 'antd';
// import { Input, DatePicker, Upload, Button } from "antd";
import axios from "axios";
import { IoMdMore } from "react-icons/io";
import ReactPlayer from "react-player";
import { Audio } from "react-loader-spinner";

const StudentClassRecordings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [classRecords, setClassRecords] = useState([]);
  const [deleting, setDeleting] = useState(false);
  const [selectedTab, setSelectedTab] = useState("current");
  const [loading, setLoading] = useState(true);
  const getYouTubeVideoId = (url) => {
    const regex =
      /(?:youtube\.com(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

//   const [videoOption, setVideoOption] = useState("file"); // "file" or "url"
//   const [formData, setFormData] = useState({
//     title: "",
//     subtitle: "",
//     date: "",
//     videoFile: null,
//     videoUrl: "",
//     description: "",
//   });

//   const handleFileChange = (e) => {
//     setFormData({ ...formData, videoFile: e.target.files[0] });
//   };

  useEffect(() => {
    const fetchClassRecords = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://localhost:5005/api/classrecords/see"
        );
        setClassRecords(response.data);
      } catch (error) {
        console.error("Error fetching class records:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchClassRecords();
  }, []);
  
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };


//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const form = new FormData();
//     form.append("title", formData.title);
//     form.append("subtitle", formData.subtitle);
//     form.append("date", formData.date);
//     form.append("videoUrl", formData.videoUrl);
//     if (formData.videoFile) {
//       form.append("videoFile", formData.videoFile);
//     }
//     form.append("description", formData.description);
  
//     try {
//       const response = await axios.post(
//         "http://localhost:5005/api/classrecords/add",
//         form,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );
//       setClassRecords([...classRecords, response.data]);
//     } catch (error) {
//       console.error("Error adding class record:", error);
//     }
//   };


  const today = new Date().toISOString().split("T")[0];
  
  const filteredRecords = classRecords.filter((record) => {
    if (selectedTab === "previous") return record.date < today;
    if (selectedTab === "current") return record.date === today;
    if (selectedTab === "upcoming") return record.date > today;
    return true;
  });


  
  const handleDelete = async (id) => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5005/api/classrecords/delete/${id}`); // ✅ Fixed URL
      setClassRecords(classRecords.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting class record:", error);
    } finally {
      setDeleting(false);
    }
  };
  

  // Function to handle modal open
//   const openModal = (video) => {
//     setCurrentVideo(video);
//     setModalOpen(true);
//   };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className="p-6  min-h-screen md:px-20">
      <h1 className="text-3xl font-bold mb-6">Class Recordings</h1>
      {/* <div className="flex justify-between items-center mb-4">
        <div></div>

        <button
          className=""
          onClick={() => document.getElementById("my_modal_1").showModal()}
        >
          {" "}
          <div>
            <button
              className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600"
              type="primary"
            >
              Add class Record
            </button>
          </div>
        </button>
        <dialog id="my_modal_1" className="modal">
          <div className="bg-white p-4 m-4 md:p- rounded-lg shadow-lg w-full  md:w-[40%] md:h-[79%] overflow-y-auto">
            <div>
              <div className="max-w-2xl mx-auto bg-white p-2 ">
                <h2 className="text-3xl text-center font-semibold mb-4">
                  Add Class Record
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  
                  <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px]">
                    <label className="block text-sm font-semibold  m-3 w-[30%]">
                      Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      required
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                    />
                  </div>

                 
                  <div className="flex items-center gap-3 bg-[#F0F0F0]  rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold  m-3 w-[30%]">
                      Sub Title
                    </label>
                    <input
                      type="text"
                      name="subtitle"
                      value={formData.subtitle}
                      onChange={handleChange}
                      required
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                    />
                  </div>

                   <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px]">
                    <label className="block text-sm font-semibold  m-3 w-[30%]">
                      Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={formData.date}
                      onChange={handleChange}
                      required
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                    />
                  </div>

                 
                  <div className="flex items-center gap-3 bg-[#F0F0F0]  rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold  m-3 w-[30%]">
                      Video Option
                    </label>
                    <div className="flex space-x-4 mt-">
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md ${
                          videoOption === "url"
                            ? "bg-blue-200 text-black"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setVideoOption("url")}
                      >
                        Video URL
                      </button>
                      <button
                        type="button"
                        className={`px-4 py-2 rounded-md ${
                          videoOption === "file"
                            ? "bg-blue-200 text-black"
                            : "bg-gray-200"
                        }`}
                        onClick={() => setVideoOption("file")}
                      >
                        Upload File
                      </button>
                    </div>
                  </div>

                 
                  {videoOption === "file" ? (
                    <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px]">
                      <label className="block text-sm font-semibold  m-3 w-[30%]">
                        Upload Video
                      </label>
                      <input
                        type="file"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      />
                    </div>
                  ) : (
                    <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px]">
                      <label className="block text-sm font-semibold   m-3 w-[30%]">
                        Video URL
                      </label>
                      <input
                        type="url"
                        name="videoUrl"
                        value={formData.videoUrl}
                        onChange={handleChange}
                        className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                      />
                    </div>
                  )}

                 
                  <div className="flex items-center gap-3 bg-[#F0F0F0]  rounded-[7px] border border-[#50E3C2]">
                    <label className="block text-sm font-semibold  m-3 w-[30%]">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      rows="3"
                      className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
                    ></textarea>
                  </div>

                 
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="w-[35%]  bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                    >
                      Add Record
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className=" flex justify-end mt-6 space-x-4">
              <form method="dialog">
               
                <button className="px-6 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400">
                  Close
                </button>
              </form>
            </div>
          </div>
        </dialog>
      </div> */}

      
      <ClassTabs selectedTab={selectedTab} onTabChange={setSelectedTab} />


      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 mt-6 gap-6 p-">
      {loading ? (
  <div className="flex justify-center items-start h-screen w-[300%] ">
    <Audio height={40} width={80}  color="#F5A623" ariaLabel="loading" visible={true} />
  </div>
) : filteredRecords.length > 0 ? (
  filteredRecords.map((record) => (
    <div
      key={record._id}
      className="transition-transform duration-300 transform hover:scale-95 hover:shadow-2xl bg-white rounded-lg border border-gray-300 shadow-md w-full max-w-sm mx-auto"
      style={{ fontFamily: "Poppins" }}
    >
      {/* Video Section */}
      <figure className="relative">
        <div className="w-full h-48 md:h-56 rounded-t-lg overflow-hidden">
          <ReactPlayer
            url={`http://localhost:5005/uploads/${record.videoUrl}`}
            controls
            width="100%"
            height="100%"
          />
        </div>
        <div className="absolute top-2 right-2">
          <div className="dropdown dropdown-hover dropdown-left">
            <div tabIndex={0} role="button">
              <IoMdMore tabIndex={0} className="text-white text-2xl cursor-pointer" />
            </div>
            <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-white rounded-md w-24">
              <li>
                <button
                  className="hover:bg-red-600 hover:text-white text-black w-full text-left px-2 py-1 rounded-md"
                  onClick={() => handleDelete(record._id)}
                >
                  {deleting ? "Deleting..." : "Delete"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </figure>

      {/* Card Content */}
      <div className="p-2">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold text-gray-800 truncate">{record.title}</h2>
          <span className="text-sm font-medium text-gray-500">
            {new Date(record.date).toLocaleDateString()}
          </span>
        </div>
        <h3 className="text-md mt- font-medium text-red-700 truncate">{record.subtitle}</h3>
        <p className="text-sm text-gray-900 line-clamp-2">{record.description}</p>
      </div>
    </div>
  ))
) : (
  <div className="flex justify-center items-center h-f w-[300%]">
    <h2 className="md:text-2xl text-lg font-bold text-gray-600">No Video to Show</h2>
  </div>
)}

      </div>
      
      
      {/* <div className="mt-6">
      {filteredRecords.length > 0 ? (
        filteredRecords.map((record) => (
          <div key={record._id} className="border p-4 mb-4 rounded shadow-md">
            <h2 className="text-xl font-semibold">{record.title}</h2>
            <p>{record.subtitle}</p>
            <p className="text-gray-500">Date: {record.date}</p>
            {record.videoUrl && (
              <ReactPlayer url={record.videoUrl} controls width="100%" height="300px" />
            )}
          </div>
        ))
      ) : (
        <p className="text-center text-gray-500">No records found.</p>
      )}
    </div> */}




      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg- rounded-3 p-6 w-3/4 md:w-1/2 lg:w-[80%]">
            <button
              onClick={closeModal}
              className="absolute  top-4 right-4 text-white hover:text-gray-800"
            >
              ✖
            </button>
            {currentVideo &&
              (currentVideo.includes("youtube.com") ||
              currentVideo.includes("youtu.be") ? (
                <div
                  className="w-full relative rounded-xl  "
                  style={{ paddingBottom: "56.25%" }}
                >
                  <iframe
                    title="YouTube Video"
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(
                      currentVideo
                    )}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                </div>
              ) : (
                <video controls className="w-full rounded-xl">
                  <source src={currentVideo} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentClassRecordings;