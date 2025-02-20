// import actions
import {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logoutFailure,
  logoutSuccess,
  logoutStart,
} from "./userSlice";
import globalService from "../../services/globalService";
import apiClient from "../../utils/apiClient";
// login method
export const login = async (dispatch, user) => {
  dispatch(loginStart());
  try {
    const res = await apiClient.post(
      `${globalService.routes.auth}/login`,
      user
    );
    dispatch(loginSuccess(res.data)); // Axios response already contains JSON in `res.data`
    return { payload: res.data };
  } catch (err) {
    // console.log(err.response?.data?.message);
    const errorMessage =
      err.response?.data || "Too many requests, please try again later.";
    dispatch(loginFailure(errorMessage));
    return { payload: null };
  }
};
// register method
export const register = async (dispatch, user) => {
  dispatch(registerStart());
  try {
    const res = await apiClient.post(
      `${globalService.routes.auth}/register`,
      user
    );
    dispatch(registerSuccess(res.data)); // Axios response already contains JSON in `res.data`
    return { payload: res.data };
  } catch (err) {
    const errorMessage = err.response?.data?.errors[0];
    // console.log(errorMessage);
    dispatch(registerFailure(errorMessage));
    return { payload: null };
  }
};
// logout method
export const logout = (dispatch) => {
  dispatch(logoutStart());
  try {
    dispatch(logoutSuccess());
  } catch (err) {
    dispatch(logoutFailure(err));
  }
};
