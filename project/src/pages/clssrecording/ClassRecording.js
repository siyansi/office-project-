import React, { useState } from "react";

const ClassRecordings = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [currentVideo, setCurrentVideo] = useState(null);

  const getYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be)([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Array of class data with title, description, and video link
  const classes = [
    {
      id: 1,
      title: "Class 01 - Introduction to UX Design",
      thumbnail: "https://img.freepik.com/free-psd/influencer-work-youtube-cover_23-2149708659.jpg?t=st=1737720365~exp=1737723965~hmac=fc1e04f313f410c631320675ca7bc9feb62be6e10ee3384fc7ea23be1c481156&w=1380",
      video: "https://www.youtube.com/watch?v=SqcY0GlETPk&t=163s&pp=ygULcmVhY3QgY2xhc3M%3D",
    },
    {
      id: 2,
      title: "Class 02 - Principles of UI Design",
      thumbnail:
        "https://img.freepik.com/free-psd/flat-design-graphic-template_23-2150056242.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.youtube.com/watch?v=vfs1wBDoqBY&pp=ygUJY3NzIGNsYXNz",
    },
    {
      id: 3,
      title: "Class 03 - Introduction to Typography",
      thumbnail:
        "https://img.freepik.com/free-psd/career-occupation-cv-landing-page-template_23-2149370967.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.youtube.com/watch?v=huCTiOUFZpg&pp=ygUPdHJvcG9sb2d5IGNsYXNz",
    },
    {
      id: 4,
      title: "Class 04 - Laws of UI/UX",
      thumbnail:
        "https://img.freepik.com/premium-vector/renders-format-mp4-h-264-motion-design-software_681307-61.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.youtube.com/watch?v=tAjwXyaZTZM",
    },
    {
      id: 5,
      title: "Class 05 - Introduction to Graphic Design",
      thumbnail:
        "https://img.freepik.com/free-psd/arts-crafts-youtube-cover-template-kids-with-gradient-colors_23-2149477540.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.youtube.com/watch?v=vfs1wBDoqBY&pp=ygUJY3NzIGNsYXNz",
    },
    {
      id: 6,
      title: "Class 06 - Advanced Photoshop Design",
      thumbnail:
        "https://img.freepik.com/free-psd/world-photo-day-landing-page-template_23-2148623649.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.youtube.com/watch?v=tAjwXyaZTZM",
    },
    {
      id: 7,
      title: "Class 07 - Advanced video editing",
      thumbnail:
        "https://img.freepik.com/free-photo/beautiful-beauty-influencer-recording-vlog-about-make-up-brush-famous-makeup-artist_482257-22467.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.youtube.com/watch?v=-E2mRSZvJlM",
    },
    {
      id: 8,
      title: "Class 08 - Extra value Course",
      thumbnail:
        "https://img.freepik.com/free-photo/industrial-designer-digital-art_23-2151585313.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.youtube.com/watch?v=5BJDFKs41pI",
    },
    {
      id: 9,
      title: "Class 09 - Cad design class",
      thumbnail:
        "https://img.freepik.com/free-vector/flat-design-glamping-landing-page-template_23-2149315053.jpg?ga=GA1.1.1726861027.1704513461&semt=ais_hybrid",
      video: "https://www.youtube.com/watch?v=5BJDFKs41pI",
    },
  ];

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
