import { configureStore } from "@reduxjs/toolkit";
import appReducer from "../appSlice";
import searchBarReducer from "../components/searchBar/searchBarSlice";

export const store = configureStore({
  reducer: {
    availableCities: appReducer,
    selectedCitiesWeather: searchBarReducer,
  },
});
