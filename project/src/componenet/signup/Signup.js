import React, { useState,  } from "react";
import { useNavigate } from "react-router-dom";
import imge1 from "../../assests/m.png";
import imge2 from "../../assests/s.jpg";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import Cookies from 'js-cookie';  // Make sure to install 'js-cookie'
import { jwtDecode } from 'jwt-decode'; // For newer versions
import "../../App.css";
import axios from "axios";



const Signup = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setErrorMessage("Username and Password are required");
        return;
      }
  
      const res = await axios.post("http://localhost:5005/auth/user/login", {
        email: username,
        password,
      });
  
      if (res.status === 200) {
        const token = res.data.token;
        Cookies.set("token", token, { expires: 1 });
  
        const decodedToken = jwtDecode(token);
        const userRole = decodedToken.role;
        const userId = decodedToken.id;
        const registerNumber = decodedToken.registerNumber;
  
        // if (!registerNumber) {
        //   console.error("❌ registerNumber is missing from token!");
        //   return;
        // }
  
        // ✅ Store `registerNumber` as `assignee`
        console.log("✅ Storing assignee:", registerNumber);
        localStorage.setItem("assignee", registerNumber);
        localStorage.setItem("role", userRole);
        localStorage.setItem("token", token);
  
        if (userRole === "Admin") {
          localStorage.setItem("adminId", userId);
          navigate("/admin/dashboard");
        } else if (userRole === "Student") {
          localStorage.setItem("studentId", userId);
          navigate("/student/dashboard");
        } else {
          setErrorMessage("Unauthorized role access");
        }
      } else {
        setErrorMessage("Invalid login response");
      }
    } catch (error) {
      console.log("Login error:", error);
      setErrorMessage("Login failed. Please try again.");
    }
  };
  

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{
        backgroundImage: `url(${imge2})`,
      }}
    >
      <div
        className="flex flex-col bg-orange-400 bg-opacity-55 lg:flex-row w-full lg:w-[70%] h-auto lg:h-[80%] border-4 border-[#F5A623] borderd shadow-lg"
        style={{ borderRadius: "5px" }}
      >
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
            <div
              className={`border-b-2 border-black mb-4 relative ${
                errorMessage ? "border-red-500" : ""
              }`}
            >
              <label className="h-12 ml-2 outline-none focus:outline-none bg-transparent flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="h-6 w-6 opacity-70"
                >
                  <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                </svg>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="ml-2 grow bg-transparent outline-none focus:outline-none font-[Poppins]"
                  placeholder="Username"
                />
              </label>
            </div>

            {/* Password Input */}
            <div
              className={`border-b-2 border-black mb-2 relative ${
                errorMessage ? "border-red-500" : ""
              }`}
            >
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="grow ml-2 bg-transparent outline-none font-[Poppins]"
                  placeholder="Password"
                />
              </label>
              {/* Eye Icon */}
              <button
                type="button"
                className="absolute right-0 top-[60%] transform -translate-y-1/2 pr-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="h-8 w-8 text-gray-100"
                >
                  {showPassword ? (
                    <IoIosEyeOff className="text-black" size={13} />
                  ) : (
                    <IoIosEye className="text-black" size={13} />
                  )}
                </svg>
              </button>
            </div>

            {/* Error Message */}

            {/* Forgot Password */}
            <h3 className="text-sm text-black cursor-pointer font-[Poppins] font-semibold mb-3 text-right">
              Forgot Password?
            </h3>

            {/* Login Button */}
            {errorMessage && (
              <div className="text-[#fa3d3d] text-sm text-left mb-2 font-[Poppins]">
                *{errorMessage}
              </div>
            )}
            <div className="flex justify-center">
              <button
                className="bg-blue-500 text-black font-bold py-2 px-6 rounded-md hover:bg-blue-600 w-full"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* <p className="text-transparent"> {userRole}</p> */}
    </div>
  );
};

export default Signup;
