import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componenet/navbar/Navbar";
import Sidebar from "./componenet/Sidebar/Sidebar";
import Maincontent from "./componenet/maincontent/Maincontent";
import Dashboardpage from "./pages/dasboard/Dashboardpage";
import Signup from "./componenet/signup/Signup";
import StudentDetail from "./pages/student/StudentDetails";  // Import Student Detail Page

function App() {
  const [selectedPage, setSelectedPage] = useState("Dashboard");

  const handleSidebarClick = (page) => {
    setSelectedPage(page);
  };

  return (
    <Router>
      <Routes>
        {/* Show the Signup page without the Navbar and Sidebar */}
        <Route path="/" element={<Signup />} />

        {/* For all other pages, show the Navbar and Sidebar */}
        <Route
          path="/dashboard"
          element={
            <div className="flex w-full overflow-x-hidden">
              <Sidebar onMenuClick={handleSidebarClick} />
              <div className="w-full">
                <Navbar />
                <Maincontent selectedPage={selectedPage} />
              </div>
            </div>
          }
        />
        
        {/* Add Dynamic Route for Student Details */}
        <Route
          path="/student/:id"
          element={
            <div className="flex w-full overflow-x-hidden">
              <Sidebar onMenuClick={handleSidebarClick} />
              <div className="w-full">
                <Navbar />
                <StudentDetail /> {/* Student details page */}
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
