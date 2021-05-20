import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, selectCities } from "./homeSlice";
import SearchBar from "../../components/searchBar/SearchBar";
import WeatherTiles from "../../components/weatherTile/WeatherTiles";
import NavBar from "../../components/navBar/NavBar";
import "./Home.css";

function Home() {
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
        <p className={"navBarInstructions"}>Select any number of cities & get the weather forecast!</p>
        <SearchBar />
      </div>
      <div className={"weatherTilesContainer"}>
        <WeatherTiles />
      </div>
    </div>
  );
}

export default Home;
