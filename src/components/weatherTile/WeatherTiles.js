import React, { useState } from "react";
import { selectUser } from "../loginSignup/loginSignupSlice";
import { selectWeatherReports } from "../searchBar/searchBarSlice";
import { addCityToFavorites } from "../loginSignup/loginSignupSlice";
import { useSelector, useDispatch } from "react-redux";
import { pushFavoriteCityToFirebase, addFavoriteCityToStore } from "../../helpers/helpers";
import { EuiButton, EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

function WeatherTiles() {
  const [isFavorite, setIsFavorite] = useState(false);

  const weatherReports = useSelector(selectWeatherReports);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  function handleStoreFavorite(report, user) {
    pushFavoriteCityToFirebase(report, user);
    dispatch(addCityToFavorites(addFavoriteCityToStore(report)));
    setIsFavorite(true);
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
                    color={isFavorite ? "danger" : "secondary"}
                    iconType="heart"
                    disabled={user ? false : true}
                    onClick={() => handleStoreFavorite(report, user)}
                  >
                    {isFavorite ? "Delete from avorites!" : "Add to favorites"}
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
