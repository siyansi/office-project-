// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// // Fetch all students
// export const fetchTotalStudents = createAsyncThunk("students/fetchAll", async () => {
//   const response = await fetch("http://localhost:5005/api/students/all");
//   return response.json();
// });

// // Fetch a single student by ID
// export const fetchStudentById = createAsyncThunk("students/fetchById", async (id) => {
//   const response = await fetch(`http://localhost:5005/api/students/${id}`);
//   return response.json();
// });

// const studentSlice = createSlice({
//   name: "students",
//   initialState: {
//     allStudents: [],
//     loggedInStudent: null,
//     status: "idle",
//     error: null,
//   },
//   reducers: {
//     clearStudentData: (state) => {
//       state.loggedInStudent = null;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchStudents.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchStudents.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.allStudents = action.payload;
//       })
//       .addCase(fetchStudents.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       })
//       .addCase(fetchStudentById.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchStudentById.fulfilled, (state, action) => {
//         state.status = "succeeded";
//         state.loggedInStudent = action.payload;
//       })
//       .addCase(fetchStudentById.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export const { clearStudentData } = studentSlice.actions;
// export default studentSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "http://localhost:5005/api/students";

// Fetch student by ID
export const fetchStudentById = createAsyncThunk(
    "students/fetchStudentById",
    async (studentId, { rejectWithValue }) => {
      try {
        console.log("Fetching student details for ID:", studentId); // ✅ Debugging log
        const response = await axios.get(`http://localhost:5005/api/students/${studentId}`);
        console.log("API Response:", response.data); // ✅ Log the API response
        return response.data;
      } catch (error) {
        console.error("Error fetching student:", error.response?.data || error.message);
        return rejectWithValue(error.response?.data || error.message);
      }
    }
  );
  

// Fetch all students and return total count
export const fetchTotalStudents = createAsyncThunk(
  "students/fetchTotalStudents",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_URL}/all`);
      console.log("Fetched Students List:", response.data);
      return {
        total: response.data.length,
        students: response.data,
      };
    } catch (error) {
      console.error("Error fetching students:", error.response?.data || error.message);
      return rejectWithValue(error.response?.data || error.message);
    }
  }
);
const studentSlice = createSlice({
    name: "students",
    initialState: {
      loggedInStudent: null, // Default should be null, NOT undefined
      totalStudents: 0,
      studentList: [],
      status: "idle",
      error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchStudentById.pending, (state) => {
          state.status = "loading";
        })
        .addCase(fetchStudentById.fulfilled, (state, action) => {
          console.log("Updating Redux state with student:", action.payload); // ✅ Debugging log
          state.status = "succeeded";
          state.loggedInStudent = action.payload; // ✅ Ensure state updates
        })
        .addCase(fetchStudentById.rejected, (state, action) => {
          state.status = "failed";
          state.error = action.payload;
        });
    },
  });
  
  export default studentSlice.reducer;
  