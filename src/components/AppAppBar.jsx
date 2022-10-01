import * as React from "react";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import AppBar from "./AppBar";
import Toolbar from "./Toolbar";
import { Link as RouterLink } from "react-router-dom";
const rightLink = {
  fontSize: 16,
  color: "common.white",
  ml: 3,
};

function AppAppBar({ user }) {
  return (
    <div>
      <AppBar position="fixed">
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box sx={{ flex: 1 }} />
          <Link
            variant="h6"
            underline="none"
            color="inherit"
            href="#"
            sx={{ fontSize: 24 }}
          >
            {"Todo Task"}
          </Link>
          <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
            {!user && (
              <Link
                color="inherit"
                variant="h6"
                underline="none"
                to="/signin/"
                sx={rightLink}
                component={RouterLink}
              >
                {"Sign In"}
              </Link>
            )}
            {!user && (
              <Link
                variant="h6"
                underline="none"
                to="/signup/"
                sx={{ ...rightLink, color: "secondary.main" }}
                component={RouterLink}
              >
                {"Sign Up"}
              </Link>
            )}
            {user && (
              <Link to="/signout" component={RouterLink}>
                <span style={{ color: "#ffff" }}>Logout</span>
              </Link>
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </div>
  );
}

export default AppAppBar;
