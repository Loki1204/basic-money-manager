import React, { useState, useEffect, useReducer, useContext } from "react";
import { Button, Typography, Toolbar } from "@material-ui/core";
import { Link, useHistory, useLocation } from "react-router-dom";
import decode from "jwt-decode";

import { LOGOUT } from "../../constants/actionTypes";
import authReducer from "../../reducers/AuthReducer";
import { AuthGlobalContext } from "../../context/AuthGlobalState";

import useStyles from "./styles";
const Header = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const authInitialState = useContext(AuthGlobalContext);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("Profile")));
  const [, dispatch] = useReducer(authReducer, authInitialState);

  // Handling the LogOut
  const logout = () => {
    dispatch({ type: LOGOUT });
    history.push("/");
    setUser(null);
  };

  // Handling the user profile and token in local storage
  useEffect(() => {
    const token = user?.token;

    if (token) {
      const decodedToken = decode(token);

      if (decodedToken.exp * 1000 < new Date().getTime()) logout();
    }

    setUser(JSON.parse(localStorage.getItem("Profile")));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <>
      <h2>Basic Money Manager</h2>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
    </>
  );
};

export default Header;
