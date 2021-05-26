import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, selectCities } from "./homeSlice";
import { selectFavoriteCitiesSelected } from "../../components/navBar/navBarSlice";
import SearchBar from "../../components/searchBar/SearchBar";
import WeatherTilesGrid from "../../components/weatherTilesGrid/WeatherTilesGrid";
import NavBar from "../../components/navBar/NavBar";
import "./Home.css";

function Home() {
  const dispatch = useDispatch();
  const availableCities = useSelector(selectCities);
  const favoriteCitiesSelected = useSelector(selectFavoriteCitiesSelected);

  useEffect(() => {
    !availableCities && dispatch(fetchCities());
  });

  return (
    <div className={"App"}>
      <div className={"navBarContainer"}>
        <NavBar />
      </div>
      {!favoriteCitiesSelected ? (
        <div className={"searchBarContainer"}>
          <p className={"navBarInstructions"}>Select any number of cities & get the weather forecast!</p>
          <SearchBar />
        </div>
      ) : null}
      <div className={"weatherTilesContainer"}>
        <WeatherTilesGrid />
      </div>
    </div>
  );
}

export default Home;
