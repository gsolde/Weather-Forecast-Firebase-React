import React from "react";
import { useSelector } from "react-redux";
import { selectWeatherReports } from "../searchBar/searchBarSlice";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

import { EuiButton, EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function WeatherTiles() {
  const weatherReports = useSelector(selectWeatherReports);
  const cardFooterContent = (
    <EuiFlexGroup justifyContent="flexEnd">
      <EuiFlexItem grow={false}>
        <EuiButton>Save to favourites</EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );

  return (
    <EuiFlexGrid gutterSize="xl" responsive={true} columns={3}>
      {weatherReports.map((report, index) => (
        <EuiFlexItem key={index}>
          <EuiCard
            textAlign="left"
            title={report.municipio.NOMBRE}
            description={`${report.temperatura_actual} ºC`}
            footer={cardFooterContent}
          />
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  );
}

export default WeatherTiles;
