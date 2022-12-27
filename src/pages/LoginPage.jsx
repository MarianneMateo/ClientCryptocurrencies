import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import swal from "sweetalert";
import axios from "axios";

const theme = createTheme();

const ButtonStyles = {
  marginTop: "3%",
  marginBottom: "2%",
  backgroundColor: "#4cd137",
  color: "white",
  boxShadow: "none",
  fontWeight: "bold",
};

const form = {
  marginTop: "1%",
};

export const LoginPage = ({ stateUser, setStateUser }) => {
  /*   const { isConnected, id, name, email } = stateUser; */
  const navigate = useNavigate();
  const [body, setBody] = useState({ email: "", password: "" });

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setBody({ ...body, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/sign-in", body);
    console.log(response.data);
    if (response.data.connected) {
      setStateUser({
        isConnected: response.data.connected,
        id_user: response.data.id_user,
        name: response.data.name,
        email: response.data.email,
      });
    } else {
      swal("Something went wrong", "Email or Password incorrect", "warning");
    }
  };

  return (
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
        <Avatar sx={{ m: 1, bgcolor: "#4cd137" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form style={form} onSubmit={handleSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={body.email}
            onChange={handleChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={body.password}
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={ButtonStyles}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link
                onClick={() => {
                  navigate("/sign-up");
                }}
                component="button"
                variant="body2"
              >
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};
