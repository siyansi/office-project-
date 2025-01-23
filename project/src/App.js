import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from './componenet/navbar/Navbar';
import Sidebar from './componenet/Sidebar/Sidebar';
import Maincontent from './componenet/maincontent/Maincontent';
import Dashboardpage from './pages/dasboard/Dashboardpage';
import Signup from "./componenet/signup/Signup";

function App() {
  const [selectedPage, setSelectedPage] = useState("Home");

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
            <div className="flex flex-col h-screen">
              <Navbar />
              <div className="flex flex-1">
                <Sidebar onMenuClick={handleSidebarClick} />
                <Maincontent selectedPage={selectedPage} />
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
