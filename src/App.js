import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCities, selectCities } from "./appSlice";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const availableCities = useSelector(selectCities);

  useEffect(() => {
    !availableCities && dispatch(fetchCities());
  });

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test</h1>
      </header>
    </div>
  );
}

export default App;
