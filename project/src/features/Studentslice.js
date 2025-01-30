import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunks
export const fetchStudents = createAsyncThunk("students/fetchStudents", async () => {
  const response = await axios.get("http://localhost:5005/api/students/all");
  return response.data;
});

export const addStudent = createAsyncThunk("students/addStudent", async (studentData) => {
  const response = await axios.post("http://localhost:5005/api/students/add", studentData);
  return response.data;
});

export const deleteStudent = createAsyncThunk("students/deleteStudent", async (id) => {
  await axios.delete(`http://localhost:5005/api/students/${id}`);
  return id;
});

const studentSlice = createSlice({
  name: "students",
  initialState: {
    studentList: [],
    status: "idle",
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStudents.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.studentList = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addStudent.fulfilled, (state, action) => {
        state.studentList.push(action.payload);
      })
      .addCase(deleteStudent.fulfilled, (state, action) => {
        state.studentList = state.studentList.filter(student => student._id !== action.payload);
      });
  },
});

export default studentSlice.reducer;
