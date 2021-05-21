import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import { firebaseApp } from "../../config/firebase";

const initialState = { user: auth.currentUser };

export const fetchUserFavoriteCities = createAsyncThunk("userData/fetchUserFavoriteCities", async (user) => {
  let res = firebaseApp
    .database()
    .ref("favoriteCities")
    .child(user.uid)
    .once("value")
    .then((snapshot) => {
      return snapshot.val();
    });
  const data = await res;
  return data;
});

export const loginSignupSlice = createSlice({
  name: "userData",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavoriteCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserFavoriteCities.fulfilled, (state, action) => {
        state.status = "success";
        state.userFavoriteCities = action.payload;
      })
      .addCase(fetchUserFavoriteCities.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setUser, setUserFavoriteCities } = loginSignupSlice.actions;
export const selectUser = (state) => state.authentication.user;
export const selectUserFavoriteCities = (state) => state.authentication.userFavoriteCities;

export default loginSignupSlice.reducer;
