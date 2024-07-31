import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  interests: [],
  selectedInterests: [],
};

export const interestSlice = createSlice({
  name: "interest",
  initialState,
  reducers: {
    
  },
});

export const {} = interestSlice.actions;

export default interestSlice.reducer;
