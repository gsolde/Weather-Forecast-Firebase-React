import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, selectCities } from "./appSlice";
import SearchBar from "./components/searchBar/SearchBar";
import WeatherTiles from "./components/weatherTile/WeatherTiles";
import NavBar from "./components/navBar/NavBar";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const availableCities = useSelector(selectCities);

  useEffect(() => {
    !availableCities && dispatch(fetchCities());
  });

  return (
    <div className={"App"}>
      <div className={"navBarContainer"}>
        <NavBar />
      </div>
      <div className={"searchBarContainer"}>
        <SearchBar />
      </div>
      <div className={"weatherTilesContainer"}>
        <WeatherTiles />
      </div>
    </div>
  );
}

export default App;
