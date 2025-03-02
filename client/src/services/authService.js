import globalService from "../services/globalService";
import axios from "axios";

// forgetPassword
export const forgotPassword = async (formData) => {
  const res = await axios.post(
    `${globalService.baseUrl}${globalService.routes.auth}/forgetPassword`,
    formData
  );
  localStorage.setItem("verify", res.data.token);
  return res.data;
};
// verifyResetCode
export const verifyResetCode = async (formData) => {
  const res = await axios.post(
    `${globalService.baseUrl}${globalService.routes.auth}/resetCodeVerify`,
    formData,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("verify")}`,
      },
    }
  );

  return res.data;
};
// resetPassword
export const resetPassword = async (formData) => {
  const res = await axios.post(
    `${globalService.baseUrl}${globalService.routes.auth}/resetpassword`,
    formData,
    {
      headers: {
        authorization: `Bearer ${localStorage.getItem("verify")}`,
      },
    }
  );
  localStorage.removeItem("verify", res.data.token);
  return res.data;
};
