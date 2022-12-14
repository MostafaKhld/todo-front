import React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import { ResetRequest } from "./../services/resetService";
import { toast } from "react-toastify";
import { createTheme, ThemeProvider } from "@mui/material/styles";
function ResetPassword(props) {
  const handleSubmit = async (event) => {
    event.preventDefault();
    const x = new FormData(event.currentTarget);
    try {
      const { data } = await ResetRequest({
        email: x.get("email"),
      });

      toast.success(data);
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
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
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

export default ResetPassword;
