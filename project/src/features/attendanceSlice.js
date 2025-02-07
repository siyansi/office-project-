import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  presentCount: 0,
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    updatePresentCount: (state, action) => {
      state.presentCount = action.payload;
    },
  },
});

export const { updatePresentCount } = attendanceSlice.actions;
export default attendanceSlice.reducer;
