import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/types";

interface AuthState {
  user: User;
  loggedIn: boolean;
}
const initialState: AuthState = {
  user: {
    username: "",
    city: "",
    country: "",
    createdAt: "",
    email: "",
    phone: "",
    updatedAt: "",
  },
  loggedIn: false,
};
const authSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    login(state, action: PayloadAction<User>) {
      state.user = {...action.payload};
      state.loggedIn = true;
    },
    logout(state) {
      state.user = {
        username: "",
        city: "",
        country: "",
        createdAt: "",
        email: "",
        phone: "",
        updatedAt: "",
      };
      state.loggedIn = false;
    },
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;
