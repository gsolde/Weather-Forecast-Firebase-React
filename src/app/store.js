import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../containers/home/homeSlice";
import loginSignupReducer from "../components/loginSignup/loginSignupSlice";
import searchBarReducer from "../components/searchBar/searchBarSlice";

export const store = configureStore({
  reducer: {
    authentication: loginSignupReducer,
    availableCities: homeReducer,
    selectedCitiesWeather: searchBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
