// 1. All required import
import express from "express";
import {
  changeUserPasswordByUserHimSelf,
  changeUsersPasswordByManagerOnly,
  createOneUser,
  deleteOneUser,
  getAllUser,
  getOneUser,
  updateUserProfileByUserHimSelf,
  updateUsersProfileByManagerOnly,
} from "../controllers/users";
import { setUserId } from "../middlewares/create_privatecrud_setids/User";
import {
  allowedTo,
  verifyActivity,
  verifyAuthentication,
} from "../middlewares/Authorize";
import {
  editFileWithBuffer,
  uploadUserFile,
} from "../utils/subuploadfiles/users";
import {
  changeLoggedUserPasswordValidator,
  changeUserPasswordValidator,
  deleteUserValidator,
  updateLoggedUserValidator,
  updateUserValidator,
} from "../utils/subvalidators/users";
// 2. HTTP Method and Endpoint and Permissions
const userRoute: express.Router = express.Router();
userRoute.use(verifyAuthentication, verifyActivity);

// private or related
// custom
// TODO: User
userRoute
  .route("/getUserProfileByHimSelf")
  .get(allowedTo("user"), setUserId, getOneUser);
userRoute
  .route("/updateUserProfileByHimSelf")
  .put(
    allowedTo("user"),
    updateLoggedUserValidator,
    uploadUserFile,
    editFileWithBuffer,
    updateUserProfileByUserHimSelf
  );
userRoute
  .route("/changeUserPasswordByUserHimSelf")
  .put(changeLoggedUserPasswordValidator, changeUserPasswordByUserHimSelf);
userRoute
  .route("/deleteUserAccountByUserHimSelf")
  .delete(allowedTo("user"), deleteUserValidator, setUserId, deleteOneUser);
// general
userRoute
  .route("/")
  .post(allowedTo("manager"), createOneUser)
  .get(allowedTo("manager"), getAllUser);
userRoute
  .route("/:id")
  .get(allowedTo("manager"), getOneUser)
  .delete(allowedTo("manager"), deleteOneUser);
// TODO: Manager
userRoute
  .route("/:id")
  .put(allowedTo("manager"), updateUsersProfileByManagerOnly);
userRoute
  .route("/:id/changeUsersPasswordByManagerOnly")
  .put(allowedTo("manager"), changeUsersPasswordByManagerOnly);
export default userRoute;
// ! 3. Front
// general
// private or related
// custom
