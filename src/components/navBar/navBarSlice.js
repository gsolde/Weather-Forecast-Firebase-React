import { createSlice } from "@reduxjs/toolkit";

const initialState = { favoriteCitiesSelected: false };

export const navBarSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setFavoriteCitiesSelected: (state, action) => {
      state.favoriteCitiesSelected = action.payload;
    },
  },
});

export const selectFavoriteCitiesSelected = (state) => state.navigation.favoriteCitiesSelected;
export const { setFavoriteCitiesSelected } = navBarSlice.actions;

export default navBarSlice.reducer;
