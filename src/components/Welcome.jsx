import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { verifyUser } from "../services/authService";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
function Welcome(props) {
  const [confirmed, setConfirmed] = useState([]);

  useEffect(() => {
    async function confirmUser() {
      if (props.match.path === "/confirm/:confirmationCode") {
        await verifyUser(props.match.params.confirmationCode);
      }
      setConfirmed(true);
    }

    confirmUser();
  });
  return (
    <div>
      {confirmed ? (
        <>
          <header>
            <h3>
              <strong>Account confirmed!</strong>
            </h3>
          </header>
          <Link to={"/signin"}>Please Login</Link>{" "}
        </>
      ) : (
        <Box sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </div>
  );
}

export default Welcome;
