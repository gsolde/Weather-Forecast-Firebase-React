import React from "react";

import { EuiButton, EuiFlexGroup, EuiFlexItem } from "@elastic/eui";

function NavBar() {
  return (
    <EuiFlexGroup gutterSize="m" justifyContent="center" responsive={false}>
      <EuiFlexItem grow={false}>
        <EuiButton color="text" onClick={() => {}}>
          Login
        </EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton onClick={() => {}}>Sign in</EuiButton>
      </EuiFlexItem>
      <EuiFlexItem grow={false}>
        <EuiButton color="danger" onClick={() => {}}>
          Log out
        </EuiButton>
      </EuiFlexItem>
    </EuiFlexGroup>
  );
}

export default NavBar;
