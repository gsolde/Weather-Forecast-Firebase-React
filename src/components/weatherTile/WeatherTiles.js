import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../loginSignup/loginSignupSlice";
import { selectWeatherReports } from "../searchBar/searchBarSlice";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

import { EuiButton, EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function WeatherTiles() {
  const weatherReports = useSelector(selectWeatherReports);
  const user = useSelector(selectUser);

  const cardFooterContent = (
    <EuiFlexGroup justifyContent="center">
      <EuiFlexItem grow={false}>
        <EuiButton size="s" color="danger">
          Delete
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton size="s" color="primary" iconType="heart" disabled={user ? false : true}>
          Add to favorites
        </EuiButton>
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
            description={
              <>
                <div>Temperature - {`${report.temperatura_actual} ºC`}</div>
                <div>Rain probability - {`${report.lluvia} %`}</div>
              </>
            }
            footer={cardFooterContent}
          />
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  );
}

export default WeatherTiles;
