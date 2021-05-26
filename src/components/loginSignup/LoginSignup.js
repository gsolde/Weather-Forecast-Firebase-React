import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { EuiFieldPassword, EuiFieldText, EuiButton, EuiForm, EuiFormRow, EuiSpacer } from "@elastic/eui";
import { auth } from "../../config/firebase";
import { fetchUserFavoriteCities, setUser } from "./loginSignupSlice";
import { resetWeatherReports } from "../searchBar/searchBarSlice";
import "./LoginSignup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [errMsg, setErrMsg] = useState(null);

  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e);
  };

  const onChangePassword = (e) => {
    setPassword(e);
  };

  function handleSignUp() {
    auth.createUserWithEmailAndPassword(email, password).catch((err) => setErrMsg(err.message));
  }

  function handleLogin() {
    auth.signInWithEmailAndPassword(email, password).catch((err) => setErrMsg(err.message));
  }

  function handleLogInSignUpSwitch() {
    setHasAccount(!hasAccount);
    setErrMsg(null);
  }

  function authState() {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setUser(user));
        dispatch(fetchUserFavoriteCities(user));
        dispatch(resetWeatherReports(user));
        history.push("/");
      } else {
        dispatch(setUser(user));
      }
    });
  }

  useEffect(() => {
    authState();
  }, []);

  return (
    <>
      <div className={"loginFormContainer"}>
        <EuiForm component="form">
          <EuiFormRow label="e-mail">
            <EuiFieldText placeholder="e-mail" value={email} onChange={(e) => onChangeEmail(e.target.value)} />
          </EuiFormRow>
          <EuiFormRow label="password">
            <EuiFieldPassword
              placeholder="Password"
              type={"dual"}
              value={password}
              onChange={(e) => onChangePassword(e.target.value)}
            />
          </EuiFormRow>
          <EuiSpacer />
        </EuiForm>
        {hasAccount ? (
          <p className={"accountText"}>
            Don't have an account yet?{" "}
            <span className={"hasAccountSetter"} onClick={handleLogInSignUpSwitch}>
              Sign up!
            </span>
          </p>
        ) : (
          <p className={"accountText"}>
            If you have an account,{" "}
            <span className={"hasAccountSetter"} onClick={handleLogInSignUpSwitch}>
              Log in!
            </span>
          </p>
        )}
        <EuiSpacer />
        {hasAccount ? (
          <EuiButton fill type="submit" color="primary" onClick={handleLogin}>
            Log in
          </EuiButton>
        ) : (
          <EuiButton fill type="submit" color="secondary" onClick={handleSignUp}>
            Sign Up
          </EuiButton>
        )}
        <div>{errMsg ? <p className="errorMsg">{errMsg}</p> : null}</div>
      </div>
    </>
  );
}

export default Login;
