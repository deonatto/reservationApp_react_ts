import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "../types/types";

interface AuthState {
  city: string;
  dates: string;
  options: Options;
}
const initialState: AuthState = {
  city: "",
  dates: "",
  options: {
    adult: 0,
    children: 0,
    room: 0,
  },
};
const authSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    newSearch(state, action: PayloadAction<AuthState>){
      state.city = action.payload.city;
      state.dates = action.payload.dates;
      state.options = action.payload.options
    },
    resetSearch(state){
      state.city = '';
      state.dates = '';
      state.options = {
        adult: 0,
        children: 0,
        room: 0
      }
    }
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;