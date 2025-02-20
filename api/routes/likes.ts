// 1. All required import
import express from "express";
import { createOneLike, deleteOneLike, getAllLike } from "../controllers/likes";
import {
  filterLikes,
  setUserIdProductId,
} from "../middlewares/create_privatecrud_setids/Like";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middlewares/Authorize";
import { createOneLikeValidator } from "../utils/subvalidators/likes";

// 2. HTTP Method and Endpoint and Permissions
// general
export const likeRoute: express.Router = express.Router({
  mergeParams: true,
});

likeRoute
  .route("/")
  .get(filterLikes, getAllLike)
  .post(
    createOneLikeValidator,
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    setUserIdProductId,
    createOneLike
  );
likeRoute
  .route("/userLikes")
  .get(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    filterLikes,
    getAllLike
  );
likeRoute
  .route("/:id")
  .delete(
    verifyAuthentication,
    verifyActivity,
    allowedTo("user"),
    deleteOneLike
  );
export default likeRoute;
// private or related
// custom

// ! 3. Front
// general
// private or related
// custom
