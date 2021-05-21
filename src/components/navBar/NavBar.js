import React from "react";
import { auth } from "../../config/firebase";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUser } from "../loginSignup/loginSignupSlice";
import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function NavBar() {
  const history = useHistory();
  const user = useSelector(selectUser);

  return (
    <EuiFlexGroup gutterSize="m" justifyContent="center" responsive={false}>
      {user ? (
        <EuiFlexItem grow={false}>
          <EuiButton
            color="danger"
            onClick={() => {
              auth.signOut();
            }}
          >
            Log out
          </EuiButton>
        </EuiFlexItem>
      ) : (
        <EuiFlexItem grow={false}>
          <EuiButton color="ghost" onClick={() => history.push("/login")}>
            Log in
          </EuiButton>
        </EuiFlexItem>
      )}
    </EuiFlexGroup>
  );
}

export default NavBar;
