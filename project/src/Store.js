import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./features/Studentslice"; // Import your reducer

const store = configureStore({
  reducer: {
    students: studentReducer, // Add reducers here
  },
});

export default store;
