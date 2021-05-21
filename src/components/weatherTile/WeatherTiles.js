import React from "react";
import { useSelector } from "react-redux";
import { selectUser, selectUserFavoriteCities } from "../loginSignup/loginSignupSlice";
import { selectWeatherReports } from "../searchBar/searchBarSlice";
import { pushFavoriteCityToFirebase } from "../../helpers/helpers";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

import { EuiButton, EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function WeatherTiles() {
  const weatherReports = useSelector(selectWeatherReports);
  const user = useSelector(selectUser);
  const userFavoriteCities = useSelector(selectUserFavoriteCities);

  function handleStoreFavorite(report, user) {
    pushFavoriteCityToFirebase(report, user);
  }

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
            footer={
              <EuiFlexGroup justifyContent="center">
                <EuiFlexItem grow={false}>
                  <EuiButton
                    size="s"
                    color="primary"
                    iconType="heart"
                    disabled={user ? false : true}
                    onClick={() => handleStoreFavorite(report, user)}
                  >
                    Add to favorites
                  </EuiButton>
                </EuiFlexItem>
              </EuiFlexGroup>
            }
          />
        </EuiFlexItem>
      ))}
    </EuiFlexGrid>
  );
}

export default WeatherTiles;
