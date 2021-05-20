import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../containers/home/homeSlice";
import searchBarReducer from "../components/searchBar/searchBarSlice";

export const store = configureStore({
  reducer: {
    availableCities: homeReducer,
    selectedCitiesWeather: searchBarReducer,
  },
});
