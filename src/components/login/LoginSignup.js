import React, { useState } from "react";
import { EuiFieldPassword, EuiFieldText, EuiButton, EuiForm, EuiFormRow, EuiSpacer } from "@elastic/eui";
import "./LoginSignup.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hasAccount, setHasAccount] = useState(true);
  const [dual, setDual] = useState(true);

  const onChangeEmail = (e) => {
    setEmail(e);
  };

  const onChangePassword = (e) => {
    setPassword(e);
  };

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
      <EuiButton fill type="submit" color="secondary">
        {hasAccount ? "Log in!" : "Sign up!"}
      </EuiButton>
    </div>
  );
}

export default Login;
