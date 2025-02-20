// 1. All required import

import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/SupValidator";
import Post from "../../models/Post";
import Like from "../../models/Like";

// 2.
// createOneLikeValidator
export const createOneLikeValidator: RequestHandler[] = [
  check("postId")
    .isMongoId()
    .withMessage("Invalid Post Id !")
    .custom(async (val: string) => {
      const post = await Post.findById(val);
      if (!post) {
        throw new Error("The Post Not Found !");
      }
      const like = await Like.findOne({ postId: val });
      if (like) {
        throw new Error("The Post Has Been Liked Before  !");
      }
      return true;
    }),
  // check("userId").isMongoId().withMessage("Invalid User Id !"),
  validatorMiddleware,
];
// getOneLikeValidator
// updateOneLikeValidator
// deleteOneLikeValidator
export const deleteOneLikeValidator: RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Like Id !")
    .custom(async (val: string) => {
      const like = await Like.findById(val);
      if (!like) {
        throw new Error("The Like Doesn Not Exist To Be Deleted !");
      }
      return true;
    })
    .custom(async (val: string, { req }) => {
      const like = await Like.findById(val);
      if (like!.userId._id !== req.user?._id) {
        throw new Error("You Can Only Delete Your Like !");
      }
      return true;
    }),
  validatorMiddleware,
];
