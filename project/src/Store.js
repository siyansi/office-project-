import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/newStudentSlice";
import attendanceReducer from "./features/attendanceSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
    attendance: attendanceReducer,

  },
});

export default store;