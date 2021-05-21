import React from "react";
import { useSelector } from "react-redux";
import { selectUser } from "../loginSignup/loginSignupSlice";
import { firebaseApp } from "../../config/firebase";
import { selectWeatherReports } from "../searchBar/searchBarSlice";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

import { EuiButton, EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function WeatherTiles() {
  const weatherReports = useSelector(selectWeatherReports);
  const user = useSelector(selectUser);

  function handleStoreFavorite(report) {
    firebaseApp
      .database()
      .ref("favoriteCities")
      .child(user.uid)
      .push({
        label: report.municipio.NOMBRE,
        cod_prov: report.municipio.CODPROV,
        id: report.municipio.CODIGOINE.slice(0, 5),
      })
      .then(console.log("pushed"));
  }

  // firebaseApp
  //   .database()
  //   .ref("favoriteCities")
  //   .child(user.uid)
  //   .once("value")
  //   .then(function (snapshot) {
  //     console.log(snapshot.val());
  //   });

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
                    onClick={() => handleStoreFavorite(report)}
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
