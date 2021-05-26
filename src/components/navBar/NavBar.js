import React from "react";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  selectUser,
  resetUserFavoriteCities,
  selectUserFavoriteCities,
  fetchUserFavoriteCities,
} from "../loginSignup/loginSignupSlice";
import { selectFavoriteCitiesSelected } from "../navBar/navBarSlice";
import { resetWeatherReports, fetchWeatherReports } from "../searchBar/searchBarSlice";
import { setFavoriteCitiesSelected } from "../navBar/navBarSlice";
import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function NavBar() {
  const dispatch = useDispatch();

  const history = useHistory();
  const user = useSelector(selectUser);
  const isFavoriteCitiesSelected = useSelector(selectFavoriteCitiesSelected);
  const userFavoriteCities = Object.values(useSelector(selectUserFavoriteCities));

  function handleSelectFavorites(cities, user) {
    dispatch(resetWeatherReports());
    dispatch(setFavoriteCitiesSelected(true));
    cities && cities.forEach((city) => dispatch(fetchWeatherReports(city)));
  }

  function handleSearchCities() {
    dispatch(fetchUserFavoriteCities(user));
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
            <EuiButton
              color="primary"
              disabled={isFavoriteCitiesSelected ? true : false}
              onClick={() => handleSelectFavorites(userFavoriteCities, user)}
            >
              My favorite Cities
            </EuiButton>
          </EuiFlexItem>
          <EuiFlexItem grow={false}>
            <EuiButton color="primary" disabled={isFavoriteCitiesSelected ? false : true} onClick={handleSearchCities}>
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
