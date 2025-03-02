// 1. All required import
import express from "express";
import {
  createOneComment,
  deleteOneComment,
  getAllComment,
  updateOneComment,
} from "../controllers/comments";
import {
  filterComments,
  setUserIdProductId,
} from "../middlewares/create_privatecrud_setids/Comment";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middlewares/Authorize";

// 2. HTTP Method and Endpoint and Permissions
// general
export const commentRoute: express.Router = express.Router({
  mergeParams: true,
});

commentRoute
  .route("/")
  .post(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    setUserIdProductId,
    createOneComment
  )
  .get(filterComments, getAllComment);
commentRoute
  .route("/userComments")
  .get(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    filterComments,
    getAllComment
  );
commentRoute
  .route("/:id")
  .put(updateOneComment)
  .delete(verifyAuthentication, verifyActivity, deleteOneComment);
export default commentRoute;
// private or related
// custom

// ! 3. Front
// general
// private or related
// custom
