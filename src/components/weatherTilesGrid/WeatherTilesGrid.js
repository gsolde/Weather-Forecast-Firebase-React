import React from "react";
import { selectWeatherReports } from "../searchBar/searchBarSlice";
import { useSelector } from "react-redux";
import { EuiFlexGrid } from "@elastic/eui";
import WeatherTile from "../weatherTile/WeatherTile";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

function WeatherTilesGrid() {
  const weatherReports = useSelector(selectWeatherReports);

  return (
    <EuiFlexGrid gutterSize="xl" responsive={true} columns={3}>
      {weatherReports.map((report, index) => (
        <WeatherTile index={index} report={report} />
      ))}
    </EuiFlexGrid>
  );
}

export default WeatherTilesGrid;
