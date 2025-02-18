import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./componenet/navbar/Navbar";
import AdminSidebar from "./componenet/Sidebar/Sidebar"; // Admin sidebar
import StudentSidebar from "./componenet/Sidebar/StudentSidebar"; // Student sidebar
import Dashboardpage from "./pages/dasboard/Dashboardpage";
import Attendance from "./pages/attened/Attendance";
import Assignment from "./pages/assignment/Assignment";
import ScoreCard from "./pages/scorecard/ScoreCard";
import ClassRecording from "./pages/clssrecording/ClassRecording";
import Account from "./pages/account/Account";
import Signup from "./componenet/signup/Signup";
import ScoreCardDetails from "./pages/scorecard/scoreCardDetails";
import Student from "./pages/student/Student";
import StudentDetails from "./pages/student/studentpage/StudentDetails";
import StudentAttendance from "./pages/attened/StudentAttendance";
// import ScoreboardDetails from "./pages/scorecard/scoreCardDetails";
import StudentNavbar from "./componenet/navbar/StudentNavbar";
import StudentAssignments from "./pages/assignment/StudentAssignment";
import ScoreDetails from "./pages/scorecard/StudentScoreCard";
import StudentAccount from "./pages/account/StudentAccount";

// Protected Route Component
const ProtectedRoute = ({ element, allowedRoles }) => {
  const userRole = localStorage.getItem("role");
  if (!userRole) return <Navigate to="/" replace />; // Redirect to login if no role
  if (!allowedRoles.includes(userRole)) return <Navigate to="/unauthorized" replace />; // Unauthorized access
  return element;
};

const handleMenuSelection2 = (page) => {
  console.log("Navigating to:", page);
};

const StudentLayout = () => (
  <div className="flex w-full overflow-x-hidden">
    <StudentSidebar onMenuClick={handleMenuSelection2} />
    <div className="w-full">
      <StudentNavbar />
      <Routes>
        <Route path="dashboard" element={<Dashboardpage />} />
        <Route path="students" element={<StudentDetails />} />
        <Route path="attendance" element={<StudentAttendance />} />
        <Route path="assignments" element={<StudentAssignments/>} />
        <Route path="score-card" element={<ScoreDetails />} />
        <Route path="class-recordings" element={<ClassRecording />} />
        <Route path="account" element={<StudentAccount />} />
      </Routes>
    </div>
  </div>
);

const handleMenuSelection = (page) => {
  console.log("Navigating to:", page);
};

const AdminLayout = () => (
  <div className="flex w-full overflow-x-hidden">
    <AdminSidebar onMenuClick={handleMenuSelection} />
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
      </Routes>
    </div>
  </div>
);

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Signup/Login Page */}
        <Route path="/" element={<Signup />} />

        {/* Student Protected Routes */}
        <Route
          path="/student/*"
          element={<ProtectedRoute element={<StudentLayout />} allowedRoles={["Student"]} />}
        />

        {/* Admin Protected Routes */}
        <Route
          path="/admin/*"
          element={<ProtectedRoute element={<AdminLayout />} allowedRoles={["Admin"]} />}
        />

        {/* ScoreCardDetails for both roles */}
        <Route
          path="/scoreboard/:id"
          element={<ProtectedRoute element={<ScoreCardDetails />} allowedRoles={["Admin", "Student"]} />}
        />
      </Routes>
    </Router>
  );
};

export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./componenet/navbar/Navbar";
// import Sidebar from "./componenet/Sidebar/Sidebar";
// import AdminSidebar from "./componenet/Sidebar/Sidebar"; // Admin sidebar
// import StudentSidebar from "./componenet/Sidebar/StudentSidebar"; // Student sidebar
// import Dashboardpage from "./pages/dasboard/Dashboardpage";
// import Attendance from "./pages/attened/Attendance";
// import Assignment from "./pages/assignment/Assignment";
// import ScoreCard from "./pages/scorecard/ScoreCard";
// import ClassRecording from "./pages/clssrecording/ClassRecording";
// import Account from "./pages/account/Account";
// import Signup from "./componenet/signup/Signup";
// import StudentDetail from "./pages/student/StudentDetails";
// import ScoreCardDetails from "./pages/scorecard/scoreCardDetails";
// import Student from "./pages/student/Student";
// import StudentDetails from "./pages/student/studentpage/StudentDetails";

// // Protected Route Component
// const ProtectedRoute = ({ element, allowedRoles }) => {
//   const userRole = localStorage.getItem("role"); // Get user role from localStorage

//   if (!userRole) {
//     return <Navigate to="/" replace />; // If no role, redirect to login
//   }

//   if (!allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" replace />; // Redirect if role not allowed
//   }

//   return element;
// };

// const App = () => {
//   const handleMenuSelection = (page) => {
//     console.log("Selected page:", page);
//     // Add your navigation logic here if needed
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Signup/Login */}
//         <Route path="/" element={<Signup />} />

//         {/* Role-based Dashboards */}
//         <Route
//           path="/*"
//           element={
//             <ProtectedRoute
//               element={
//                 <div className="flex w-full overflow-x-hidden">
//                   <StudentSidebar onMenuClick={handleMenuSelection} />
//                   <div className="w-full">
//                     <Navbar />
//                     <Routes>
//                       <Route path="student-dashboard" element={<Dashboardpage />} />
//                       <Route path="student-students" element={<StudentDetails />} />
//                       <Route path="stu-attendance" element={<Attendance />} />
//                       <Route path="stu-assignments" element={<Assignment />} />
//                       <Route path="stu-score-card" element={<ScoreCard />} />
//                       <Route path="student-class-recordings" element={<ClassRecording />} />
//                       <Route path="sut-account" element={<Account />} />
//                     </Routes>
//                   </div>
//                 </div>
//               }
//               allowedRoles={["Student"]}
//             />
//           }
//         />

//         <Route
//           path="/*"
//           element={
//             <ProtectedRoute
//               element={
//                 <div className="flex w-full overflow-x-hidden">
//                   <AdminSidebar onMenuClick={handleMenuSelection} />
//                   <div className="w-full">
//                     <Navbar />
//                     <Routes>
//                       <Route path="admin-dashboard" element={<Dashboardpage />} />
//                       <Route path="admin-students/:id" element={<Student />} />
//                       <Route path="admin-attendance" element={<Attendance />} />
//                       <Route path="admin-assignments" element={<Assignment />} />
//                       <Route path="admin-score-card" element={<ScoreCard />} />
//                       <Route path="admin-class-recordings" element={<ClassRecording />} />
//                       <Route path="admin-account" element={<Account />} />
//                     </Routes>
//                   </div>
//                 </div>
//               }
//               allowedRoles={["Admin"]}
//             />
//           }
//         />

//         {/* ScoreCardDetails for both roles */}
//         <Route
//           path="/scoreboard/:id"
//           element={
//             <ProtectedRoute
//               element={<ScoreCardDetails />}
//               allowedRoles={["Admin", "Student"]}
//             />
//           }
//         />
//       </Routes>
//     </Router>
//   );
// };

// export default App;



// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./componenet/navbar/Navbar";
// import Sidebar from "./componenet/Sidebar/Sidebar";
// import Maincontent from "./componenet/maincontent/Maincontent";
// import Dashboardpage from "./pages/dasboard/Dashboardpage";
// import Student from "./pages/student/Student";
// import Attendance from "./pages/attened/Attendance";
// import Assignment from "./pages/assignment/Assignment";
// import ScoreCard from "./pages/scorecard/ScoreCard";
// import ClassRecording from "./pages/clssrecording/ClassRecording";
// import Account from "./pages/account/Account";
// import Signup from "./componenet/signup/Signup";
// import StudentDetail from "./pages/student/StudentDetails";

// function App() {
//   const handleMenuSelection = (page) => {
//     console.log("Selected page:", page);
//     // Add your navigation logic here if needed
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Signup page without Navbar and Sidebar */}
//         <Route path="/" element={<Signup />} />

//         {/* Routes with Sidebar and Navbar */}
//         <Route
//           path="/*"
//           element={
//             <div className="flex w-full overflow-x-hidden">
//               <Sidebar onMenuClick={handleMenuSelection} />
//               <div className="w-full">
//                 <Navbar />
//                 <Routes>
//                   <Route path="dashboard" element={<Dashboardpage />} />
//                   <Route path="students" element={<Student />} />
//                   <Route path="attendance" element={<Attendance />} />
//                   <Route path="assignments" element={<Assignment />} />
//                   <Route path="score-card" element={<ScoreCard />} />
//                   <Route path="class-recordings" element={<ClassRecording />} />
//                   <Route path="account" element={<Account />} />
//                   <Route
//                     path="watch-later"
//                     element={
//                       <h2 className="text-3xl font-bold mb-6">Watch Later</h2>
//                     }
//                   />
//                   <Route
//                     path="liked-videos"
//                     element={
//                       <h2 className="text-3xl font-bold mb-6">Liked Videos</h2>
//                     }
//                   />
//                   <Route path="student/:id" element={<StudentDetail />} />
//                 </Routes>
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;



// import React, { useEffect, useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import Navbar from "./componenet/navbar/Navbar";
// import Sidebar from "./componenet/Sidebar/Sidebar";
// import Dashboardpage from "./pages/dasboard/Dashboardpage";
// import Attendance from "./pages/attened/Attendance";
// import Assignment from "./pages/assignment/Assignment";
// import ScoreCard from "./pages/scorecard/ScoreCard";
// import ClassRecording from "./pages/clssrecording/ClassRecording";
// import Account from "./pages/account/Account";
// import Signup from "./componenet/signup/Signup";
// import StudentDetail from "./pages/student/StudentDetails";
// import ScoreCardDetails from "./pages/scorecard/scoreCardDetails";
// import StudentSidebar from "./componenet/Sidebar/StudentSidebar";
// import AdminSidebar from "./componenet/Sidebar/Sidebar";
// import DashboardPage from "./pages/dasboard/Dashboardpage";

// // Protected Route Component
// const ProtectedRoute = ({ element, allowedRoles }) => {
//   const userRole = localStorage.getItem("role"); // Get user role from localStorage

//   if (!userRole) {
//     return <Navigate to="/" replace />; // If no role, redirect to login
//   }

//   if (!allowedRoles.includes(userRole)) {
//     return <Navigate to="/unauthorized" replace />; // Redirect if role not allowed
//   }

//   return element;
// };

// function App() {
//   const handleMenuSelection = (page) => {
//     console.log("Selected page:", page);
//     // Add your navigation logic here if needed
//   };
  // return (
  //   <Router>
  //     <Routes>
  //       {/* Signup/Login */}
  //       <Route path="/" element={<Signup />} />

        // /* Role-Based Dashboards */
        // /* <Route path="/student-dashboard" element={<ProtectedRoute element={<DashboardPage />} allowedRoles={["Student"]} />} />
        // <Route path="/admin-dashboard" element={<ProtectedRoute element={<DashboardPage />} allowedRoles={["Admin"]} />} /> */}
        // /* Other Protected Routes */
//         <Route
//           path="/*"
//           element={
//             <div className="flex w-full overflow-x-hidden">
//               <Sidebar onMenuClick={handleMenuSelection} />
//               <div className="w-full">
//                 <Navbar />
//                 <Routes>
//                 <Route path="/student-dashboard" element={<ProtectedRoute element={<DashboardPage />} allowedRoles={["Student"]} />} />
//                 <Route path="/admin-dashboard" element={<ProtectedRoute element={<DashboardPage />} allowedRoles={["Admin"]} />} />
//                   <Route path="dashboard" element={<Dashboardpage />} />
//                   <Route path="attendance" element={<Attendance />} />
//                   <Route path="assignments" element={<Assignment />} />
//                   <Route path="score-card" element={<ScoreCard />} />
//                   <Route path="class-recordings" element={<ClassRecording />} />
//                   <Route path="account" element={<Account />} />
//                   <Route path="student/:id" element={<StudentDetail />} />
//                   <Route path="scoreboard/:id" element={<ScoreCardDetails />} />
//                 </Routes>
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;




// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./componenet/navbar/Navbar";
// import Sidebar from "./componenet/Sidebar/Sidebar";
// // import Maincontent from "./componenet/maincontent/Maincontent";
// import Dashboardpage from "./pages/dasboard/Dashboardpage";
// import Student from "./pages/student/Student";
// import Attendance from "./pages/attened/Attendance";
// import Assignment from "./pages/assignment/Assignment";
// import ScoreCard from "./pages/scorecard/ScoreCard";
// import ClassRecording from "./pages/clssrecording/ClassRecording";
// import Account from "./pages/account/Account";
// import Signup from "./componenet/signup/Signup";
// import StudentDetail from "./pages/student/StudentDetails";
// import ScoreCardDetails from "./pages/scorecard/scoreCardDetails";

// function App() {
//   const handleMenuSelection = (page) => {
//     console.log("Selected page:", page);
//     // Add your navigation logic here if needed
//   };

//   return (
//     <Router>
//       <Routes>
//         {/* Signup page without Navbar and Sidebar */}
//         <Route path="/" element={<Signup />} />

//         {/* Routes with Sidebar and Navbar */}
//         <Route
//           path="/*"
//           element={
//             <div className="flex w-full overflow-x-hidden">
//               <Sidebar onMenuClick={handleMenuSelection} />
//               <div className="w-full">
//                 <Navbar />
//                 <Routes>
//                   <Route path="dashboard" element={<Dashboardpage />} />
//                   <Route path="students" element={<Student />} />
//                   <Route path="attendance" element={<Attendance />} />
//                   <Route path="assignments" element={<Assignment />} />
//                   <Route path="score-card" element={<ScoreCard />} />
//                   <Route path="class-recordings" element={<ClassRecording />} />
//                   <Route path="account" element={<Account />} />
//                   <Route
//                     path="watch-later"
//                     element={
//                       <h2 className="text-3xl font-bold mb-6">Watch Later</h2>
//                     }
//                   />
//                   <Route
//                     path="liked-videos"
//                     element={
//                       <h2 className="text-3xl font-bold mb-6">Liked Videos</h2>
//                     }
//                   />
//                   <Route path="student/:id" element={<StudentDetail />} />
//                   <Route path="scoreboard/:id" element={<ScoreCardDetails />} />

//                 </Routes>
//               </div>
//             </div>
//           }
//         />
//       </Routes>
//     </Router>
//   );
// }

// export default App;