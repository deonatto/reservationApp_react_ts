import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "../types/types";

interface hotelState {
  city: string;
  dates: string[];
  options: Options;
}
const initialState: hotelState = {
  city: "",
  dates: [],
  options: {
    adult: 0,
    children: 0,
    room: 0,
  },
};
const hotelSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    
  },
});

export default hotelSlice.reducer;
export const usersActions = hotelSlice.actions;
