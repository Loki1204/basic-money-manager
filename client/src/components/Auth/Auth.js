import React, { useState } from "react";
import {
  Avatar,
  Paper,
  Button,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";
import { GoogleLogin } from "react-google-login";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import { useHistory } from "react-router-dom";
import { useContext } from "react";

import useStyles from "./styles";
import Input from "./Input";
import Icon from "./Icon";
import { AuthGlobalContext } from "../../context/AuthGlobalState";
import { AUTH } from "../../constants/actionTypes";
import { useReducer } from "react";
import authReducer from "../../reducers/AuthReducer";

const Auth = () => {
  const classes = useStyles();
  const initialState = useContext(AuthGlobalContext);
  const history = useHistory();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const [isSignup, setIsSignup] = useState(false);
  const { signup, signin } = useContext(AuthGlobalContext);
  const [, dispatch] = useReducer(authReducer, initialState);

  // Handling the signin/signup form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      signup(formData, history);
    } else {
      signin(formData, history);
    }
  };

  // Handling the inputs of the form
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handling the password input
  const handleShowPassword = () =>
    setShowPassword((prevShowPassword) => !prevShowPassword);

  // Function to switch between signup and signin
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  // Handling Google Login's authentication success
  const googleSuccess = async (res) => {
    const result = res?.profileObj;
    const token = res?.tokenId;

    try {
      dispatch({ type: AUTH, payload: { result, token } });
      history.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // Handling Google Login's authentication failure
  const googleFailure = () => {
    console.log("Google Sign In was unsuccessful. Try again later");
  };

  // UI container
  return (
    <Container component="main" maxWidth="xs">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          {isSignup ? "Sign up" : "Sign in"}
        </Typography>

        {/* Form for signin/signup */}
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  name="firstName"
                  label="First Name"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  name="lastName"
                  label="Last Name"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {isSignup ? "Sign Up" : "Sign In"}
          </Button>
          <GoogleLogin
            clientId={process.env.REACT_APP_CLIENT_ID}
            render={(renderProps) => (
              <Button
                className={classes.googleButton}
                color="primary"
                fullWidth
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                startIcon={<Icon />}
                variant="contained"
              >
                Google Sign In
              </Button>
            )}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
          <Grid container justifyContent="flex-end">
            <Grid>
              <Button onClick={switchMode}>
                {isSignup
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
