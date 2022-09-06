import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Options } from "../types/types";

interface SearchOptionsState {
  dates: string;
  options: Options;
}
const initialState: SearchOptionsState = {
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
      state.options = action.payload.options
    },
    resetSearch(state){
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