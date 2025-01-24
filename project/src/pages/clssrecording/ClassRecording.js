import React, { useState } from "react";

const ClassRecordings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  // Array of class data with title, description, and video link
  const classes = [
    {
      id: 1,
      title: "Class 01 - Introduction to UX Design",
      thumbnail: "https://img.freepik.com/free-psd/influencer-work-youtube-cover_23-2149708659.jpg?t=st=1737720365~exp=1737723965~hmac=fc1e04f313f410c631320675ca7bc9feb62be6e10ee3384fc7ea23be1c481156&w=1380",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 2,
      title: "Class 02 - Principles of UI Design",
      thumbnail:
        "https://img.freepik.com/free-psd/flat-design-graphic-template_23-2150056242.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 3,
      title: "Class 03 - Introduction to Typography",
      thumbnail:
        "https://img.freepik.com/free-psd/career-occupation-cv-landing-page-template_23-2149370967.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 4,
      title: "Class 04 - Laws of UI/UX",
      thumbnail:
        "https://img.freepik.com/premium-vector/renders-format-mp4-h-264-motion-design-software_681307-61.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 5,
      title: "Class 05 - Introduction to Graphic Design",
      thumbnail:
        "https://img.freepik.com/free-psd/arts-crafts-youtube-cover-template-kids-with-gradient-colors_23-2149477540.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.w3schools.com/html/mov_bbb.mp4",
    },
    {
      id: 6,
      title: "Class 06 - Advanced Photoshop Design",
      thumbnail:
        "https://img.freepik.com/free-psd/world-photo-day-landing-page-template_23-2148623649.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 7,
      title: "Class 07 - Advanced video editing",
      thumbnail:
        "https://img.freepik.com/free-photo/beautiful-beauty-influencer-recording-vlog-about-make-up-brush-famous-makeup-artist_482257-22467.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 8,
      title: "Class 08 - Extra value Course",
      thumbnail:
        "https://img.freepik.com/free-photo/industrial-designer-digital-art_23-2151585313.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.w3schools.com/html/movie.mp4",
    },
    {
      id: 9,
      title: "Class 09 - Cad design class",
      thumbnail:
        "https://img.freepik.com/free-vector/flat-design-glamping-landing-page-template_23-2149315053.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6  ">
        {classes.map((item) => (
          <div
            key={item.id}
            className="bg-white shadow-md rounded-lg cursor-pointer card transition-transform duration-300 transform hover:scale-95 hover:shadow-2xl"
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
