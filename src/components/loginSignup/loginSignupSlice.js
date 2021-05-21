import { createSlice } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";

const initialState = { user: auth.currentUser };

export const loginSignupSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = loginSignupSlice.actions;
export const selectUser = (state) => state.authentication.user;

export default loginSignupSlice.reducer;
