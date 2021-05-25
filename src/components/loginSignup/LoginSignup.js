import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { EuiFieldPassword, EuiFieldText, EuiButton, EuiForm, EuiFormRow, EuiSpacer } from "@elastic/eui";
import { auth } from "../../config/firebase";
import { fetchUserFavoriteCities, setUser } from "./loginSignupSlice";
import "./LoginSignup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);

  const dispatch = useDispatch();
  const history = useHistory();

  const onChangeEmail = (e) => {
    setEmail(e);
  };

  const onChangePassword = (e) => {
    setPassword(e);
  };

  function handleSignUp() {
    auth.createUserWithEmailAndPassword(email, password);
    //TODO handle errors!
  }

  function handleLogin() {
    auth.signInWithEmailAndPassword(email, password);
    //TODO handle errors!
  }

  function authState() {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        dispatch(setUser(user));
        dispatch(fetchUserFavoriteCities(user));
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
          <span className={"hasAccountSetter"} onClick={() => setHasAccount(!hasAccount)}>
            Sign up!
          </span>
        </p>
      ) : (
        <p className={"accountText"}>
          If you have an account,{" "}
          <span className={"hasAccountSetter"} onClick={() => setHasAccount(!hasAccount)}>
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
    </div>
  );
}

export default Login;
