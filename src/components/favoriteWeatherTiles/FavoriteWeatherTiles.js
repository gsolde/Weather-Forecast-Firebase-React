import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../loginSignup/loginSignupSlice";
import { selectWeatherReports } from "../searchBar/searchBarSlice";
import { EuiButton, EuiCard, EuiFlexGrid, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

function FavoriteWeatherTiles() {
  const weatherReports = useSelector(selectWeatherReports);
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  function handleDeleteFavorite(report, user) {
    // pushFavoriteCityToFirebase(report, user);
    // dispatch(addCityToFavorites(addFavoriteCityToStore(report)));
    // setIsFavorite(true);
  }

  return (
    <>
      <EuiFlexGrid gutterSize="xl" responsive={true} columns={3}>
        {weatherReports.map((report, index) => (
          <EuiFlexItem key={index}>
            <EuiCard
              textAlign="left"
              title={report.municipio.NOMBRE}
              description={
                <>
                  <div>Temperature - {`${report.temperatura_actual} ºC`}</div>
                  <div>Rain probability - {`${report.lluvia} mm`}</div>
                </>
              }
              footer={
                <EuiFlexGroup justifyContent="center">
                  <EuiFlexItem grow={false}>
                    <EuiButton
                      size="s"
                      color="danger"
                      iconType="heart"
                      disabled={user ? false : true}
                      onClick={() => handleDeleteFavorite(report, user)}
                    >
                      Delete from favorites
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              }
            />
          </EuiFlexItem>
        ))}
      </EuiFlexGrid>
    </>
  );
}

export default FavoriteWeatherTiles;
