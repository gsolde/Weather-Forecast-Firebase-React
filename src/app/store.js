import { configureStore } from "@reduxjs/toolkit";
import homeReducer from "../containers/home/homeSlice";
import loginSignupReducer from "../components/loginSignup/loginSignupSlice";
import searchBarReducer from "../components/searchBar/searchBarSlice";
import navBarReducer from "../components/navBar/navBarSlice";

export const store = configureStore({
  reducer: {
    userData: loginSignupReducer,
    cities: homeReducer,
    weather: searchBarReducer,
    navigation: navBarReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
