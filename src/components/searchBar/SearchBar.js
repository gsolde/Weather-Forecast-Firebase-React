import React, { useState } from "react";
import { useSelector } from "react-redux";
import { selectCities } from "../../appSlice";
import { EuiComboBox } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

function SearchBar() {
  const availableCities = useSelector(selectCities);
  const [selectedOptions, setSelected] = useState([]);

  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  return (
    <EuiComboBox
      placeholder="Search City"
      options={availableCities}
      selectedOptions={selectedOptions}
      onChange={onChange}
    />
  );
}

export default SearchBar;
