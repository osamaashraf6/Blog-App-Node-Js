// 1. All required import

import { RequestHandler } from "express";
import validatorMiddleware from "../../middlewares/SupValidator";
import { check } from "express-validator";
import Post from "../../models/Post";
import Comment from "../../models/Comment";

// 2.
// createOneCommentValidator
export const createOneCommentValidator: RequestHandler[] = [
  check("userId").isMongoId().withMessage("Invalid User Id !"),
  check("postId")
    .isMongoId()
    .withMessage("Invalid Post Id !")
    .custom(async (val: string) => {
      const post = await Post.findById(val);
      if (!post) {
        throw new Error("Post Not Found !");
      }
      return true;
    }),
  check("comment")
    .notEmpty()
    .withMessage("comment required")
    .isLength({ min: 6, max: 200 })
    .withMessage("comment length must be between 6 & 200"),
  validatorMiddleware,
];
// getOneCommentValidator
export const getOneCommentValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Comment Id !"),
  validatorMiddleware,
];
// updateOneCommentValidator
export const updateOneCommentValidator: RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Comment Id !")
    .custom(async (val: string) => {
      const comment = await Comment.findById(val);
      if (!comment) {
        throw new Error("The Comment Doesn Not Exist To Be Updated !");
      }
      return true;
    })
    .custom(async (val: string, { req }) => {
      const comment = await Comment.findById(val);
      if (comment?.userId._id !== req.user?._id) {
        throw new Error("You Can Only Update Your Comment !");
      }
      return true;
    }),
  check("comment")
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage("comment length must be between 2 & 50"),
  validatorMiddleware,
];
// deleteOneCommentValidator
export const deleteOneCommentValidator: RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Comment Id !")
    .custom(async (val: string) => {
      const comment = await Comment.findById(val);
      if (!comment) {
        throw new Error("The Comment Doesn Not Exist To Be Deleted !");
      }
      return true;
    })
    .custom(async (val: string, { req }) => {
      const comment = await Comment.findById(val);
      if (comment?.userId._id !== req.user?._id) {
        throw new Error("You Can Only Delete Your Comment !");
      }
      return true;
    }),
  validatorMiddleware,
];
