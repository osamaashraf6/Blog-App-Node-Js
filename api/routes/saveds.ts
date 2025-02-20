// 1. All required import
import express from "express";
import {
  filterSaveds,
  setUserIdProductIdd,
} from "../middlewares/create_privatecrud_setids/Saved";
import {
  createOneSaved,
  deleteOneSaved,
  getAllSaved,
} from "../controllers/saveds";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middlewares/Authorize";
import { createOneSavedValidator, deleteOneSavedValidator } from "../utils/subvalidators/saveds";

// 2. HTTP Method and Endpoint and Permissions
// general
export const savedRoute: express.Router = express.Router({
  mergeParams: true,
});
savedRoute.use(verifyAuthentication, verifyActivity, allowedTo("user"));

savedRoute
  .route("/")
  .post(createOneSavedValidator, setUserIdProductIdd, createOneSaved)
  .get(filterSaveds, getAllSaved);
savedRoute.route("/:id").delete(deleteOneSavedValidator, deleteOneSaved);
export default savedRoute;
// private or related
// custom

// ! 3. Front
// general
// private or related
// custom
