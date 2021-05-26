import React from "react";
import { selectWeatherReports } from "../searchBar/searchBarSlice";
import { useSelector } from "react-redux";
import { selectUser } from "../loginSignup/loginSignupSlice";
import { selectFavoriteCitiesSelected } from "../navBar/navBarSlice";
import { EuiFlexGrid } from "@elastic/eui";
import WeatherTile from "../weatherTile/WeatherTile";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import "./WeatherTilesGrid.css";

function WeatherTilesGrid() {
  const weatherReports = useSelector(selectWeatherReports);
  const user = useSelector(selectUser);
  const isFavoriteCitiesSelected = useSelector(selectFavoriteCitiesSelected);

  return (
    <>
      <EuiFlexGrid gutterSize="xl" responsive={true} columns={3}>
        {weatherReports.map((report, index) => (
          <WeatherTile index={index} report={report} />
        ))}
      </EuiFlexGrid>
      {!weatherReports.length ? (
        <h1 className="noFavoriteCitiesMsg">
          {user && isFavoriteCitiesSelected ? "No favorite cities yet!" : "Get some forecasts!"}
        </h1>
      ) : null}
    </>
  );
}

export default WeatherTilesGrid;
