import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import imge1 from "../../assests/si.png";
import imge2 from "../../assests/s.jpg";

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = () => {
    // Add any validation logic here before navigating
    navigate("/dashboard"); // Navigate to the Dashboard
  };

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${imge2})` }}
    >
      <div className="flex flex-col bg-orange-400 bg-opacity-55 lg:flex-row w-full lg:w-[70%] h-auto lg:h-[70%] border-4 border-white rounded-xl shadow-lg">
        {/* Left Section */}
        <div className="lg:w-1/2 rounded-t-xl lg:rounded-t-none lg:rounded-l-xl bg-opacity-70 p-4 flex items-center justify-center">
          <img
            src={imge1}
            alt="3D Man"
            className="w-48 md:w-64 lg:w-[160%] h-auto"
          />
        </div>

        {/* Right Section */}
        <div className="flex items-center justify-center lg:w-1/2 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl p-8">
          <div className="w-full p-10 max-w-xs md:max-w-sm lg:max-w-md">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-bold mb-6 text-center">
              Welcome Back!
            </h1>

            {/* Username Input */}
            <div className="border-b-2 border-black mb-6">
              <label className="h-12 ml-2 outline-none focus:outline-none bg-transparent flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6   opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  className=" ml-2 grow bg-transparent outline-none focus:outline-none"
                  placeholder="Username"
                />
              </label>
            </div>

            {/* Password Input */}
            <div className="border-b-2 border-black mb-4 relative">
              <label className="h-12 ml-2 bg-transparent flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-5 w-5 opacity-70"
                >
                  <path
                    fillRule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clipRule="evenodd"
                  />
                </svg>
                <input
                  type={showPassword ? "text" : "password"}
                  className="grow ml-2  bg-transparent outline-none"
                  placeholder="Password"
                />
              </label>
              {/* Eye Icon */}
              <button
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2 pr-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="h-8 w-8 text-gray-600"
                >
                  {showPassword ? (
                    <path d="M8 3c-3.866 0-7 3.134-7 5s3.134 5 7 5 7-3.134 7-5-3.134-5-7-5Zm0 1.5c1.466 0 2.833.538 3.85 1.404A7.356 7.356 0 0 1 13.5 8c-.271.41-.707.964-1.318 1.512C11.005 10.307 9.52 10.5 8 10.5s-3.005-.193-4.182-1.012C2.707 9.071 2.271 8.516 2 8c.271-.41.707-.964 1.318-1.512C4.995 5.693 6.48 5.5 8 5.5Zm0 2c.69 0 1.25.56 1.25 1.25S8.69 10 8 10s-1.25-.56-1.25-1.25S7.31 7.5 8 7.5Z" />
                  ) : (
                    <path d="M2.25 8c.271-.41.707-.964 1.318-1.512C4.995 5.693 6.48 5.5 8 5.5c1.466 0 2.833.538 3.85 1.404.611.548 1.047 1.102 1.318 1.512-.271.41-.707.964-1.318 1.512C11.005 10.307 9.52 10.5 8 10.5s-3.005-.193-4.182-1.012C2.707 9.071 2.271 8.516 2.25 8Zm5.75 0c0-.69-.56-1.25-1.25-1.25S5.5 7.31 5.5 8s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25Z" />
                  )}
                </svg>
              </button>
            </div>

            {/* Forgot Password */}
            <h3 className="text-sm text-blue-500 cursor-pointer mb-6 text-center">
              Forgot Password?
            </h3>

            {/* Login Button */}
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-600"
                onClick={handleLogin} // Call the navigation function
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
