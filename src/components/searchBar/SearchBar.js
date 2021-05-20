import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCities } from "../../containers/home/homeSlice";
import { fetchWeatherReports, selectWeatherReports, resetWeatherReports } from "./searchBarSlice";
import { EuiComboBox, EuiFlexItem, EuiButton, EuiFlexGroup } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const availableCities = useSelector(selectCities);
  const selectedWeatherReports = useSelector(selectWeatherReports);

  const [selectedOptions, setSelected] = useState([]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  function handleClick(cities) {
    cities && cities.forEach((city) => dispatch(fetchWeatherReports(city)));
    setSelected([]);
  }

  return (
    <div className={"searchBarContainer"}>
      <EuiFlexGroup justifyContent="center" alignItems="center" responsive={false} gutterSize="m">
        <EuiComboBox
          placeholder="Search Cities"
          options={availableCities}
          selectedOptions={selectedOptions}
          onChange={onChange}
        />
        <EuiFlexItem grow={false}>
          <EuiButton fill color="secondary" onClick={() => handleClick(selectedOptions)}>
            Get forecasts
          </EuiButton>
        </EuiFlexItem>
        {selectedWeatherReports.length ? (
          <EuiButton fill color="warning" onClick={() => dispatch(resetWeatherReports())}>
            Clear all
          </EuiButton>
        ) : null}
      </EuiFlexGroup>
    </div>
  );
}

export default SearchBar;
