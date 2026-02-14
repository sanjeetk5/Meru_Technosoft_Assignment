import api from "../../api/axios";
import {
  AUTH_REGISTER_REQUEST,
  AUTH_REGISTER_SUCCESS,
  AUTH_REGISTER_FAIL,
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAIL,
  AUTH_LOGOUT,
} from "./authActionTypes";

// -------------------------
// Register (NO AUTO LOGIN)
// -------------------------
export const registerUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_REGISTER_REQUEST });

    const res = await api.post("/auth/register", userData);

    dispatch({
      type: AUTH_REGISTER_SUCCESS,
      payload: res.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AUTH_REGISTER_FAIL,
      payload: error.response?.data?.message || "Registration failed",
    });

    return false;
  }
};

// -------------------------
// Login
// -------------------------
export const loginUser = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AUTH_LOGIN_REQUEST });

    const res = await api.post("/auth/login", userData);

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    dispatch({
      type: AUTH_LOGIN_SUCCESS,
      payload: res.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: AUTH_LOGIN_FAIL,
      payload: error.response?.data?.message || "Login failed",
    });

    return false;
  }
};

// -------------------------
// Logout
// -------------------------
export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");

  dispatch({ type: AUTH_LOGOUT });
};
