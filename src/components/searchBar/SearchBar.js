import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCities } from "../../appSlice";
import { fetchWeatherReports } from "./searchBarSlice";
import { EuiComboBox } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";
import "./SearchBar.css";

function SearchBar() {
  const dispatch = useDispatch();
  const availableCities = useSelector(selectCities);
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
      <EuiComboBox
        placeholder="Search Cities"
        options={availableCities}
        selectedOptions={selectedOptions}
        onChange={onChange}
      />
      <button className={"button"} onClick={() => handleClick(selectedOptions)}>
        Get forecasts
      </button>
    </div>
  );
}

export default SearchBar;
