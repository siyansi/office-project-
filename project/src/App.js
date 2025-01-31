import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./componenet/navbar/Navbar";
import Sidebar from "./componenet/Sidebar/Sidebar";
import Maincontent from "./componenet/maincontent/Maincontent";
import Dashboardpage from "./pages/dasboard/Dashboardpage";
import Student from "./pages/student/Student";
import Attendance from "./pages/attened/Attendance";
import Assignment from "./pages/assignment/Assignment";
import ScoreCard from "./pages/scorecard/ScoreCard";
import ClassRecording from "./pages/clssrecording/ClassRecording";
import Account from "./pages/account/Account";
import Signup from "./componenet/signup/Signup";
import StudentDetail from "./pages/student/StudentDetails";

function App() {
  const handleMenuSelection = (page) => {
    console.log("Selected page:", page);
    // Add your navigation logic here if needed
  };

  return (
    <Router>
      <Routes>
        {/* Signup page without Navbar and Sidebar */}
        <Route path="/" element={<Signup />} />

        {/* Routes with Sidebar and Navbar */}
        <Route
          path="/*"
          element={
            <div className="flex w-full overflow-x-hidden">
              <Sidebar onMenuClick={handleMenuSelection} />
              <div className="w-full">
                <Navbar />
                <Routes>
                  <Route path="dashboard" element={<Dashboardpage />} />
                  <Route path="students" element={<Student />} />
                  <Route path="attendance" element={<Attendance />} />
                  <Route path="assignments" element={<Assignment />} />
                  <Route path="score-card" element={<ScoreCard />} />
                  <Route path="class-recordings" element={<ClassRecording />} />
                  <Route path="account" element={<Account />} />
                  <Route
                    path="watch-later"
                    element={
                      <h2 className="text-3xl font-bold mb-6">Watch Later</h2>
                    }
                  />
                  <Route
                    path="liked-videos"
                    element={
                      <h2 className="text-3xl font-bold mb-6">Liked Videos</h2>
                    }
                  />
                  <Route path="student/:id" element={<StudentDetail />} />
                </Routes>
              </div>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;