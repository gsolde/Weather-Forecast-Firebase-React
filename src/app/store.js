import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../containers/home/homeSlice";
import loginSignupReducer from "../components/loginSignup/loginSignupSlice";
import searchBarReducer from "../components/searchBar/searchBarSlice";

export const store = configureStore({
  reducer: {
    userData: loginSignupReducer,
    cities: homeReducer,
    weather: searchBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
