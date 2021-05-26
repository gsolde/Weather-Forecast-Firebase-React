import React from "react";
import { useSelector } from "react-redux";
import { selectWeatherReports, selectWeatherReportsFetchStatus } from "../searchBar/searchBarSlice";
import { selectUser, selectFirebaseFavCitiesFetchStatus } from "../loginSignup/loginSignupSlice";
import { selectFavoriteCitiesSelected } from "../navBar/navBarSlice";
import { EuiFlexGrid } from "@elastic/eui";
import WeatherTile from "../weatherTile/WeatherTile";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import "./WeatherTilesGrid.css";

function WeatherTilesGrid() {
  const user = useSelector(selectUser);
  const isFavoriteCitiesSelected = useSelector(selectFavoriteCitiesSelected);
  const weatherReports = useSelector(selectWeatherReports);
  const weatherReportsFetchStatus = useSelector(selectWeatherReportsFetchStatus);
  const firebaseFavCitiesFetchStatus = useSelector(selectFirebaseFavCitiesFetchStatus);

  return (
    <>
      <EuiFlexGrid gutterSize="xl" responsive={true} columns={3}>
        {weatherReports.map((report, index) => (
          <WeatherTile index={index} report={report} />
        ))}
      </EuiFlexGrid>

      {!weatherReports.length && weatherReportsFetchStatus !== "failed" && firebaseFavCitiesFetchStatus !== "failed" ? (
        <h1 className="noFavoriteCitiesMsg">
          {user && isFavoriteCitiesSelected ? "No favorite cities yet!" : "No forecasts yet!"}
        </h1>
      ) : null}

      {weatherReportsFetchStatus === "failed" ? (
        <h1 className="weatherAPIErrorMsg">Ooops, something's wrong with the weather forecasts API...</h1>
      ) : null}

      {firebaseFavCitiesFetchStatus === "failed" ? (
        <h1 className="weatherAPIErrorMsg">Ooops, something's wrong with the Firebase API...</h1>
      ) : null}
    </>
  );
}

export default WeatherTilesGrid;
