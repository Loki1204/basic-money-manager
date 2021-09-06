import React, { createContext, useReducer } from "react";

import * as api from "../api/index";
import AuthReducer from "../reducers/AuthReducer";
import { AUTH } from "../constants/actionTypes";

// Initial state
const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

// Create context
export const AuthGlobalContext = createContext(initialState);

// Provider component
export const AuthGlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, initialState);

  // Global function for signin
  async function signin(formData, history) {
    try {
      const { data } = await api.signin(formData);

      dispatch({ type: AUTH, payload: data });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

    // Global function for signup
  async function signup(formData, history) {
    try {
      const { data } = await api.signup(formData);

      dispatch({ type: AUTH, payload: data });

      history.push("/");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <AuthGlobalContext.Provider
      value={{
        firstName: state.firstName,
        lastName: state.lastName,
        email: state.email,
        password: state.password,
        confirmPassword: state.confirmPassword,
        signin,
        signup,
      }}
    >
      {children}
    </AuthGlobalContext.Provider>
  );
};
