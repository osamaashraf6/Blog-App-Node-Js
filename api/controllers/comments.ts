// 1. All required import

import { IComment } from "../interfaces/Comment";
import Comment from "../models/Comment";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  updateOneHandler,
} from "./refactorcrud";

// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.
// 3.1 general

// createOneComment
export const createOneComment = createOneHandler<IComment>(Comment);
// getAllComment
export const getAllComment = getAllHandler<IComment>(Comment, "CommentModel");

// getOneComment: There is no something called getOneComment not logical

// updateOneComment
export const updateOneComment = updateOneHandler<IComment>(Comment);

// deleteOneComment
export const deleteOneComment = deleteOneHandler<IComment>(Comment);

// 3.2 private

// 3.3 custom
