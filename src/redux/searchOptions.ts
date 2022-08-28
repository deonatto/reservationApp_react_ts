import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "../types/types";

interface SearchOptionsState {
  city: string;
  dates: string;
  options: Options;
}
const initialState: SearchOptionsState = {
  city: "",
  dates: "",
  options: {
    adult: 0,
    children: 0,
    room: 0,
  },
};
const searchOptionsSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    newSearch(state, action: PayloadAction<SearchOptionsState>){
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

export default searchOptionsSlice.reducer;
export const searchOptionsActions = searchOptionsSlice.actions;