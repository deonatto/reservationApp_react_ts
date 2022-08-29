import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../types/types";

interface AuthState {
  user: string;
  loading: boolean;
  error: string;
}
const initialState: AuthState = {
  user: '',
  loading: false,
  error: ''
};
const authSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    login(state, action: PayloadAction<AuthState>){
      
    },
    login_success(){

    },
    login_failure(){

    },
    logout(state){
      state.user= ''
      state.loading= false;
      state.error='';
    }
  },
});

export default authSlice.reducer;
export const authActions = authSlice.actions;