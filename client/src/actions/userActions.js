import {
  USER_LOADING,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_SUCCES,
  REGISTER_SUCCESS,
  REGISTER_FAILED,
} from "./types";
import { returnError } from "./errorActions";

import axios from "axios";

export const loadUser = (dispatch, token) => {
  dispatch({ type: USER_LOADING });

  // Headers
  const config = {
    headers: {
      "Content-type": "application/json",
    },
  };

  // Check token and add to the headers
  if (token) {
    config.headers["x-auth-token"] = token;
  }

  // Fetch the user
  axios
    .get("/api/auth/user", config)
    .then((res) => dispatch({ type: USER_LOADED, payload: res.data }))
    .catch((err) => {
      dispatch(returnError(err.response.data, err.response.status));
      dispatch({ type: AUTH_ERROR });
    });
};

export const registerUser = (newUser, dispatch) => {
  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // POST creating new user
  axios
    .post("/api/users", JSON.stringify(newUser), config)
    .then((res) => {
      dispatch({
        type: REGISTER_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnError(err.response.data, err.response.status, "REGISTER_FAILED")
      );
      dispatch({
        type: REGISTER_FAILED,
      });
    });
};

export const loginUser = (dispatch, user) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  axios
    .post("/api/auth", JSON.stringify(user), config)
    .then((res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch(
        returnError(err.response.data, err.response.status, "LOGIN_FAILED")
      );
      dispatch({
        type: LOGIN_FAILED,
      });
    });
};
