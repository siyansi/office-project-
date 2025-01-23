import React from 'react';

import Dashboardpage from '../../pages/dasboard/Dashboardpage';
import Student from '../../pages/student/Student';
import Attendance from '../../pages/attened/Attendance';

const Maincontent = ({ selectedPage }) => {
  return (
    <div className='w-full' style={{ fontFamily: 'Poppins' }}>
      <div className="ml-64 p-4 mt-16">
        {/* Conditional rendering for different pages */}
        
        {selectedPage === "Dashboard" && (
          <div>
            <h2 className="text-3xl font-bold mb-6"></h2>
            <Dashboardpage />
          </div>
        )}
        
        {selectedPage === "Student" && (
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
        {selectedPage === "Your channel" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Your Channel</h2>
            <p>Your channel content goes here...</p>
          </div>
        )}

        {selectedPage === "History" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">History</h2>
            <p>History content goes here...</p>
          </div>
        )}

        {selectedPage === "Playlists" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Playlists</h2>
            <p>Playlists content goes here...</p>
          </div>
        )}

        {selectedPage === "Your videos" && (
          <div>
            <h2 className="text-3xl font-bold mb-6">Your Videos</h2>
            <p>Your videos content goes here...</p>
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
