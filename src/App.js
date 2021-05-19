import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, selectCities } from "./appSlice";
import "./App.css";
import SearchBar from "./components/searchBar/SearchBar";

function App() {
  const dispatch = useDispatch();
  const availableCities = useSelector(selectCities);

  useEffect(() => {
    !availableCities && dispatch(fetchCities());
  });

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
      </header>
    </div>
  );
}

export default App;
