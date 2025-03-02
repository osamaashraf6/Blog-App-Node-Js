// 1. All required import

import { IPost } from "../interfaces/Post";
import Post from "../models/Post";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
  updateOneHandler,
} from "./refactorcrud";

// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.
// 3.1 general

// createOnePost
export const createOnePost = createOneHandler<IPost>(Post);
// getAllPost
export const getAllPost = getAllHandler<IPost>(Post, "PostModel");

// getOnePost
export const getOnePost = getOneHandler<IPost>(Post, "saveds");

// updateOnePost
export const updateOnePost = updateOneHandler<IPost>(Post);

// deleteOnePost
export const deleteOnePost = deleteOneHandler<IPost>(Post);

// 3.2 private

// 3.3 custom

