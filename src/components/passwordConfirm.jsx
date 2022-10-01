import React, { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ResetConfirm } from "./../services/resetService";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function PasswordConfirm(props) {
  const [User, setUser] = useState({});

  useEffect(() => {
    async function populateUser() {
      if (props.match.path === "/password-reset/:userId/:token") {
        let User = {};
        User.userId = props.match.params.userId;
        User.token = props.match.params.token;
        setUser(User);
      }
    }
    populateUser();
  });
  const handleSubmit = async (event) => {
    event.preventDefault();
    const x = new FormData(event.currentTarget);
    try {
      const { data } = await ResetConfirm({
        password: x.get("password"),
        token: User.token,
        userId: User.userId,
      });

      toast.success(data);
      props.history.push("/confirm/");
    } catch (ex) {
      if (ex.response) {
        toast.error(ex.response.data.message);
      }
    }
  };
  const theme = createTheme();
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Please Enter a New Password
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 2 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="Password"
              name="password"
              type="password"
              autoFocus
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Reset Password
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default PasswordConfirm;
