// 1. All required import
import express from "express";
import {
  createOnePost,
  deleteOnePost,
  getAllPost,
  getOnePost,
  updateOnePost,
} from "../controllers/posts";
import {
  verifyAuthentication,
  verifyActivity,
  allowedTo,
} from "./../middlewares/Authorize";
import { filterPosts } from "./../middlewares/create_privatecrud_setids/Post";
import { setUserId } from "../middlewares/create_privatecrud_setids/Post";
import archiveRoute from "./archives";
import commentRoute from "./comments";
import likeRoute from "./likes";
import savedRoute from "./saveds";
import {
  editFileWithBuffer,
  uploadPostFile,
} from "../utils/subuploadfiles/posts";
// 2. HTTP Method and Endpoint and Permissions
// general
const postRoute: express.Router = express.Router();
// postRoute.use(allowedTo("user"));

postRoute.use("/:postId/archives", archiveRoute);
postRoute.use("/:postId/comments", commentRoute);
postRoute.use("/:postId/likes", likeRoute);
postRoute.use("/:postId/saveds", savedRoute);
postRoute
  .route("/")
  .post(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    uploadPostFile,
    editFileWithBuffer,
    setUserId,
    createOnePost
  )
  .get(getAllPost);
postRoute
  .route("/userPosts")
  .get(verifyAuthentication, verifyActivity, filterPosts, getAllPost);
postRoute
  .route("/:id")
  .get(getOnePost)
  .put(verifyAuthentication, verifyActivity, updateOnePost)
  .delete(verifyAuthentication, verifyActivity, deleteOnePost);
// private or related
// custom
export default postRoute;
// ! 3. front
// general
// private or related
// custom
