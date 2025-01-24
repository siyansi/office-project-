import React, { useState } from "react";

const ClassRecordings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Array of class data with title, description, and video link
  const classes = [
    {
      id: 1,
      title: "Class 01 - Introduction to UX Design",
      thumbnail: "https://via.placeholder.com/300x200.png?text=UX+DESIGN+INTRO",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "Class 02 - Principles of UI Design",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=UI+DESIGN+PRINCIPLES",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 3,
      title: "Class 03 - Introduction to Typography",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=TYPOGRAPHY+INTRO",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 4,
      title: "Class 04 - Laws of UI/UX",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=LAWS+OF+UI%2FUX",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 5,
      title: "Class 05 - Introduction to Graphic Design",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=GRAPHIC+DESIGN+INTRO",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 6,
      title: "Class 06 - Advanced Photoshop Design",
      thumbnail:
        "https://via.placeholder.com/300x200.png?text=PHOTOSHOP+ADVANCED",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
  ];

  // Function to handle modal open
  const openModal = (video) => {
    setCurrentVideo(video);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setCurrentVideo(null);
  };

  return (
    <div className="p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-6">Class Recordings</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {classes.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg cursor-pointer"
            onClick={() => openModal(item.video)}
          >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="w-full rounded-t-lg"
            />
            <div className="p-4">
              <h2 className="text-lg font-semibold">{item.title}</h2>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-3/4 md:w-1/2 lg:w-1/3">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>
            {currentVideo && (
              <video controls className="w-full rounded-lg">
                <source src={currentVideo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassRecordings;
