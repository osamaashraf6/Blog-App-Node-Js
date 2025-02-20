import { createOneArchiveValidator, deleteOneArchiveValidator } from "./../utils/subvalidators/archives";
// 1. All required import
import express from "express";
import {
  createOneArchive,
  deleteOneArchive,
  getAllArchive,
} from "../controllers/archives";
import {
  filterArchives,
  setUserIdProductId,
} from "../middlewares/create_privatecrud_setids/Archive";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middlewares/Authorize";
// 2. HTTP Method and Endpoint and Permissions
// general
export const archiveRoute: express.Router = express.Router({
  mergeParams: true,
});
archiveRoute.use(verifyAuthentication, verifyActivity, allowedTo("user"));

archiveRoute
  .route("/")
  .post(createOneArchiveValidator, setUserIdProductId, createOneArchive)
  .get(filterArchives, getAllArchive);
archiveRoute.route("/:id").delete(deleteOneArchiveValidator, deleteOneArchive);
export default archiveRoute;
// private or related
// custom

// ! 3. Front
// general
// private or related
// custom
