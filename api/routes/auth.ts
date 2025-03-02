// 1. All required import
import express from "express";
import {
  forgetPassword,
  limitRequest,
  login,
  register,
  resetPassword,
  verifyResetCode,
} from "../controllers/auth";
import { registerValidaor } from "../utils/subvalidators/auth";
// 2. HTTP Method and Endpoint and Permissions
const authRoute: express.Router = express.Router();
// general
// private or related
// custom
authRoute.route("/register").post(registerValidaor, register);
authRoute.route("/login").post(limitRequest, login);
authRoute.route("/forgetPassword").post(forgetPassword);
authRoute.route("/resetCodeVerify").post(verifyResetCode);
authRoute.route("/resetPassword").post(resetPassword);
export default authRoute;
// ! 3. Front
// general
// private or related
// custom
