import React from 'react';

import Dashboardpage from '../../pages/dasboard/Dashboardpage';
import Student from '../../pages/student/Student';
import Attendance from '../../pages/attened/Attendance';
import Assignment from '../../pages/assignment/Assignment';
import ScoreCard from '../../pages/scorecard/ScoreCard';
import ClassRecording from '../../pages/clssrecording/ClassRecording';
import Account from '../../pages/account/Account';

const Maincontent = ({ selectedPage }) => {
  return (
    <div className='w-full' style={{ fontFamily: 'Poppins' }}>
      <div className="ml-1 p-1 mt-16">
        {/* Conditional rendering for different pages */}
        
        {selectedPage === "Dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-6"></h2>
            <Dashboardpage />
          </div>
        )}
        
        {selectedPage === "Students" && (
          <div className="">
            <h2 className="text-3xl font-bold mb-6"></h2>
            <Student />
          </div>
        )}
        
        {selectedPage === "Attendance" && (
          <div>
            <h2 className="text-3xl font-bold mb-6"></h2>
           <Attendance/>
          </div>
        )}

        {/* New Sections */}
        {selectedPage === "Assignments" && (
          <div>
            <h2 className="text-3xl font-bold mb-6"></h2>
           <Assignment/>
                   </div>
        )}

        {selectedPage === "Score Card" && (
          <div>
            <h2 className="text-3xl font-bold mb-6"></h2>
        <ScoreCard/>
          </div>
        )}

        {selectedPage === "Class Recordings" && (
          <div>
            <h2 className="text-3xl font-bold mb-6"></h2>
           <ClassRecording/>
          </div>
        )}

        {selectedPage === "Account" && (
          <div>
            <h2 className="text-3xl font-bold mb-6"></h2>
            <Account/>
          </div>
        )}

        {selectedPage === "Watch Later" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Watch Later</h2>
            <p>Watch Later content goes here...</p>
          </div>
        )}

        {selectedPage === "Liked videos" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Liked Videos</h2>
            <p>Liked videos content goes here...</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Maincontent;
