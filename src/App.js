import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./containers/home/Home";
import LoginSignup from "./components/login/LoginSignup";
import "./App.css";

function App() {
  return (
    <div className={"App"}>
      <Router>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={LoginSignup} />
      </Router>
    </div>
  );
}

export default App;
