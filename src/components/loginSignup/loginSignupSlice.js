import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../config/firebase";
import { firebaseApp } from "../../config/firebase";

const initialState = { userDetails: auth.currentUser, userFavoriteCities: [] };

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
      state.userDetails = action.payload;
    },
    resetUserFavoriteCities: (state) => initialState,
    addCityToFavorites: (state, action) => {
      state.userFavoriteCities = [...state.userFavoriteCities, action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserFavoriteCities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchUserFavoriteCities.fulfilled, (state, action) => {
        state.status = "success";
        state.userFavoriteCities = action.payload ? action.payload : [];
      })
      .addCase(fetchUserFavoriteCities.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectUserFavoriteCities = (state) => state.userData.userFavoriteCities;
export const selectFirebaseFavCitiesFetchStatus = (state) => state.userData.status;
export const selectUser = (state) => state.userData.userDetails;

export const { setUser, setUserFavoriteCities, resetUserFavoriteCities, addCityToFavorites } = loginSignupSlice.actions;

export default loginSignupSlice.reducer;
