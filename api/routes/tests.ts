// 1. All required import
import express from "express";
import { createOneTest, deleteOneTest, getAllTest } from "../controllers/tests";
// 2. HTTP Method and Endpoint and Permissions
// general
// private or related
// custom
const testRoute: express.Router = express.Router();
testRoute.route("/").post(createOneTest).get(getAllTest);
testRoute.route("/:todoId").delete(deleteOneTest);
export default testRoute;
// ! 3. front
// general
// private or related
// custom
