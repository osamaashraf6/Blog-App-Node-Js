// 1. All required import
import express from "express";
import {
  createOneAddressByUser,
  deleteOneAddressByUser,
  getAllAddressByUser,
} from "../controllers/addresses";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middlewares/Authorize";
// 2. HTTP Method and Endpoint and Permissions
// general
// private or related
export const addressRoute: express.Router = express.Router();
addressRoute.use(verifyAuthentication, verifyActivity, allowedTo("user"));

addressRoute.route("/").post(createOneAddressByUser).get(getAllAddressByUser);
addressRoute.route("/:addressId").delete(deleteOneAddressByUser);
export default addressRoute;
// custom

// ! 3. Front
// general
// private or related
// custom
