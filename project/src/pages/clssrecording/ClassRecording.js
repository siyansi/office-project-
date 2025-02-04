 import React, { useState, useEffect } from "react";
// import ClassTabs from "../clssrecording/ClassTabs";
// import { Button, Flex } from 'antd';
// import { Input, DatePicker, Upload, Button } from "antd";
 import axios from "axios";


const ClassRecordings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);
  const [classRecords, setClassRecords] = useState([]);

  const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };




  const [videoOption, setVideoOption] = useState("file"); // "file" or "url"
  const [formData, setFormData] = useState({
    title: "",
    subTitle: "",
    date: "",
    videoFile: null,
    videoUrl: "",
    description: "",
  });

 

  const handleFileChange = (e) => {
    setFormData({ ...formData, videoFile: e.target.files[0] });
  };


  useEffect(() => {
    fetchClassRecords();
  }, []);

  const fetchClassRecords = async () => {
    try {
      const response = await axios.get("http://localhost:5005/api/classrecords/see");
      setClassRecords(response.data);
    } catch (error) {
      console.error("Error fetching class records:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5005/api/classrecords/add", formData);
      setClassRecords([...classRecords, response.data]);
    
      setFormData({ title: "", subTitle: "", date: "", video: "", description: "" });
    } catch (error) {
      console.error("Error adding class record:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5005/api/classrecords/delete${id}`);
      setClassRecords(classRecords.filter((record) => record._id !== id));
    } catch (error) {
      console.error("Error deleting class record:", error);
    }
  };


  // Function to handle modal open
  const openModal = (video) => {
    setCurrentVideo(video);
    setModalOpen(true);
  }

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className="p-6  min-h-screen md:px-20">
      <h1 className="text-3xl font-bold mb-6">Class Recordings</h1>
      <div className="flex justify-between items-center mb-4">
        <div>

        </div>
       
        {/* <ClassTabs/> */}
       {/* Open the modal using document.getElementById('ID').showModal() method */}
<button className="" onClick={()=>document.getElementById('my_modal_1').showModal()}> <div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-xl shadow-md hover:bg-blue-600" type="primary">Add class Record</button>
        </div></button>
<dialog id="my_modal_1" className="modal">
  <div className="bg-white p-4 m-4 md:p- rounded-lg shadow-lg w-full  md:w-[40%] md:h-[79%] overflow-y-auto">
    <div>
    <div className="max-w-2xl mx-auto bg-white p-2 ">
      <h2 className="text-3xl text-center font-semibold mb-4">Add Class Record</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title */}
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

        {/* Sub Title */}
        <div className="flex items-center gap-3 bg-[#F0F0F0]  rounded-[7px] border border-[#50E3C2]"> 
          <label className="block text-sm font-semibold  m-3 w-[30%]">
            Sub Title
          </label>
          <input
            type="text"
            name="subTitle"
            value={formData.subTitle}
            onChange={handleChange}
            required
            className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
          />
        </div>

        {/* Date */}
        <div className="flex items-center gap-3 bg-[#50E3C2] border rounded-[7px]"> 
          <label className="block text-sm font-semibold  m-3 w-[30%]">
            Date</label>
          <input
            type="date" 
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-[70%] px-4 py-2 outline-none bg-transparent border-l-2 border-l-black p-2 focus:outline-none text-black"
          />
        </div>

        {/* Video Option */}
        <div className="flex items-center gap-3 bg-[#F0F0F0]  rounded-[7px] border border-[#50E3C2]"> 
          <label className="block text-sm font-semibold  m-3 w-[30%]">
            Video Option
          </label>
          <div className="flex space-x-4 mt-">
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
          </div>
        </div>

        {/* Video Upload or URL */}
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
            <label className="block text-sm font-semibold  m-3 w-[30%]">
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

        {/* Description */}
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

        {/* Submit Button */}
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
        {/* if there is a button in form, it will close the modal */}
        <button className="px-6 py-2 bg-gray-300 rounded-lg shadow-md hover:bg-gray-400">Close</button>
      </form>
    </div>
  </div>
</dialog>

      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
      {classRecords.map((record) => (
          <div
             key={record._id}
            className="bg-white shadow-md rounded-lg cursor-pointer card transition-transform duration-300 transform hover:scale-95 hover:shadow-2xl"
            onClick={() => openModal(record.videoUrl)}
          >
            <img
              src={record.thumbnail}
              alt={record.title}
              className="w-full rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{record.title}</h2>
              <h3>
                {record.subTitle}
              </h3>
             <p>
                {record.date}
             </p>
             <p>
                {record.description}
             </p>
            </div>
            <button
              onClick={() => handleDelete(record._id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg- rounded-3 p-6 w-3/4 md:w-1/2 lg:w-[80%]">
            <button
              onClick={closeModal}
              className="absolute  top-4 right-4 text-white hover:text-gray-800"
            >
              ✖
            </button>
            {currentVideo && (
              currentVideo.includes("youtube.com") || currentVideo.includes("youtu.be") ? (
                <div className="w-full relative rounded-xl  " style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    title="YouTube Video"
                    className="absolute inset-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYouTubeVideoId(currentVideo)}`}
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
              )
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ClassRecordings;




// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const ClassRecordings = () => {
//   const [showModal, setShowModal] = useState(false);
//   const [classRecords, setClassRecords] = useState([]);
//   const [formData, setFormData] = useState({
//     title: "",
//     subTitle: "",
//     date: "",
//     video: "",
//     description: "",
//   });

//   useEffect(() => {
//     fetchClassRecords();
//   }, []);

//   const fetchClassRecords = async () => {
//     try {
//       const response = await axios.get("http://localhost:5005/api/classrecords/see");
//       setClassRecords(response.data);
//     } catch (error) {
//       console.error("Error fetching class records:", error);
//     }
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("/api/classes", formData);
//       setClassRecords([...classRecords, response.data]);
//       setShowModal(false);
//       setFormData({ title: "", subTitle: "", date: "", video: "", description: "" });
//     } catch (error) {
//       console.error("Error adding class record:", error);
//     }
//   };

//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`/api/classes/${id}`);
//       setClassRecords(classRecords.filter((record) => record._id !== id));
//     } catch (error) {
//       console.error("Error deleting class record:", error);
//     }
//   };

//   return (
//     <div className="p-4">
//       <button
//         onClick={() => setShowModal(true)}
//         className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
//       >
//         + Add Class Record
//       </button>
//       {showModal && (
//         <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//           <div className="bg-white p-6 rounded w-1/3">
//             <h2 className="text-xl font-bold mb-4">Add Class Record</h2>
//             <form onSubmit={handleSubmit}>
//               <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="w-full p-2 border rounded mb-2" required />
//               <input type="text" name="subTitle" value={formData.subTitle} onChange={handleChange} placeholder="Sub Title" className="w-full p-2 border rounded mb-2" required />
//               <input type="date" name="date" value={formData.date} onChange={handleChange} className="w-full p-2 border rounded mb-2" required />
//               <input type="text" name="video" value={formData.video} onChange={handleChange} placeholder="Video URL" className="w-full p-2 border rounded mb-2" required />
//               <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded mb-2" required></textarea>
//               <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">Save</button>
//               <button onClick={() => setShowModal(false)} className="ml-2 bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
//             </form>
//           </div>
//         </div>
//       )}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {classRecords.map((record) => (
//           <div key={record._id} className="p-4 border rounded shadow-md">
//             <h3 className="text-lg font-bold">{record.title}</h3>
//             <p className="text-sm text-gray-600">{record.subTitle}</p>
//             <p className="text-sm text-gray-600">{record.date}</p>

//             <p className="text-sm text-gray-700">{record.description}</p>
//             <button
//               onClick={() => handleDelete(record._id)}
//               className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
//             >
//               Delete
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ClassRecordings;
