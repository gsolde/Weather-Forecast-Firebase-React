import React from "react";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { selectUser, resetUserFavoriteCities, selectUserFavoriteCities } from "../loginSignup/loginSignupSlice";
import { resetWeatherReports, fetchWeatherReports } from "../searchBar/searchBarSlice";
import { setFavoriteCitiesSelected } from "../navBar/navBarSlice";
import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function NavBar() {
  const history = useHistory();
  const user = useSelector(selectUser);
  const userFavoriteCities = useSelector(selectUserFavoriteCities);
  const dispatch = useDispatch();

  function handleSelectFavorites(cities) {
    dispatch(resetWeatherReports());
    dispatch(setFavoriteCitiesSelected(true));
    cities && cities.forEach((city) => dispatch(fetchWeatherReports(city)));
  }

  function handleSearchCities() {
    dispatch(resetWeatherReports());
    dispatch(setFavoriteCitiesSelected(false));
  }

  function handleLogout() {
    auth.signOut();
    dispatch(resetUserFavoriteCities());
    dispatch(resetWeatherReports());
    dispatch(setFavoriteCitiesSelected(false));
  }

  return (
    <EuiFlexGroup gutterSize="m" justifyContent="center" responsive={false}>
      {user ? (
        <>
          <EuiFlexItem grow={false}>
            <EuiButton color="primary" onClick={() => handleSelectFavorites(userFavoriteCities)}>
              My favorite Cities
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton color="text" onClick={handleSearchCities}>
              Search Cities
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton color="danger" onClick={handleLogout}>
              Log out
            </EuiButton>
          </EuiFlexItem>
        </>
      ) : (
        <EuiFlexItem grow={false}>
          <EuiButton color="ghost" onClick={() => history.push("/login")}>
            Log in
          </EuiButton>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );
}

export default NavBar;
