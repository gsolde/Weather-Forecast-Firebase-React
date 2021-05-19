import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectCities } from "../../appSlice";
import { EuiComboBox } from "@elastic/eui";
import "@elastic/eui/dist/eui_theme_amsterdam_light.css";

function SearchBar() {
  const availableCities = useSelector(selectCities);

  const [selectedOptions, setSelected] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  console.log(selectedOptions);

  let searchTimeout;
  const onChange = (selectedOptions) => {
    setSelected(selectedOptions);
  };

  const onSearchChange = useCallback(
    (searchValue) => {
      setLoading(true);
      setOptions([]);

      clearTimeout(searchTimeout);

      searchTimeout = setTimeout(() => {
        setLoading(false);
        setOptions(
          availableCities &&
            availableCities.filter((option) => option.label.toLowerCase().includes(searchValue.toLowerCase()))
        );
      }, 500);
    },
    [availableCities]
  );

  useEffect(() => {
    onSearchChange("");
  }, [onSearchChange]);

  return (
    <EuiComboBox
      placeholder="Search City"
      async
      options={options}
      selectedOptions={selectedOptions}
      isLoading={isLoading}
      onChange={onChange}
      onSearchChange={onSearchChange}
    />
  );
}

export default SearchBar;
