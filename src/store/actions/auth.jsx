import axios from "axios";
import * as actionTypes from "./actionTypes";

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSucces = (token, refreshToken) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    accessToken: token,
    refreshToken: refreshToken
  };
};

export const authFail = error => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  // localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const checkAuthExpired = expirationTime => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (username, password) => {
  return dispatch => {
    dispatch(authStart());
    axios
      .post("http://localhost:9004/api/auth/login", {
        username: username,
         password: password,
        deviceInfo: {
          deviceId: "16487875545",
          deviceType: "DEVICE_TYPE_ANDROID",
          notificationToken: "123"
        }
      })
      .then(response => {
        console.log(response);
        const expirationDate = new Date(
          new Date().getTime() + response.data.expiryDuration
        );
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("expirationDate", expirationDate);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        localStorage.setItem("tokenType", response.data.tokenType);
        dispatch(
          authSucces(response.data.accessToken, response.data.refreshToken)
        ); 
        dispatch(checkAuthExpired(response.data.expiryDuration));
      })
      .catch(error => {
        console.log(error);
      });
  };
};

export const authCheckState = () => {
  return dispatch => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const refreshToken = localStorage.getItem("refreshToken");
        dispatch(authSucces(token, refreshToken));
        dispatch(
          checkAuthExpired(expirationDate.getTime() - new Date().getTime())
        );
      }
    }
  };
};