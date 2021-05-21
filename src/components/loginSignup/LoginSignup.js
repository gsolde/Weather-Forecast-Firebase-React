import React, { useEffect, useState } from "react";
import { auth } from "../../config/firebase";
import { EuiFieldPassword, EuiFieldText, EuiButton, EuiForm, EuiFormRow, EuiSpacer } from "@elastic/eui";
import "./LoginSignup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [dual, setDual] = useState(true);

  function handleSignUp() {
    auth.createUserWithEmailAndPassword(email, password);
    //TODO handle errors!
  }

  function handleLogin() {
    auth.signInWithEmailAndPassword(email, password);
    console.log(auth.currentUser);
    //TODO handle errors!
  }

  function authState() {
    auth.onAuthStateChanged(function (user) {
      if (user) {
        console.log(user);
      } else {
        console.log("no one is logged in!");
      }
    });
  }

  const onChangeEmail = (e) => {
    setEmail(e);
  };

  const onChangePassword = (e) => {
    setPassword(e);
  };

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
            type={dual ? "dual" : undefined}
            value={password}
            onChange={(e) => onChangePassword(e.target.value)}
          />
        </EuiFormRow>
        <EuiSpacer />
      </EuiForm>
      <p className={"accountText"}>
        Don't have an account yet?{" "}
        <span className={"hasAccountSetter"} onClick={() => setHasAccount(!hasAccount)}>
          Sign up!
        </span>
      </p>
      <EuiSpacer />
      {hasAccount ? (
        <EuiButton fill type="submit" color="primary" onClick={() => handleLogin}>
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
