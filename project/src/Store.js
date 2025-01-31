import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/newStudentSlice";

const store = configureStore({
  reducer: {
    students: studentReducer,
  },
});

export default store;