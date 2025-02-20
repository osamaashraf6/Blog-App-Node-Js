// 1. All required import

import { RequestHandler } from "express";
import { check } from "express-validator";
import validatorMiddleware from "../../middlewares/SupValidator";
import Post from "../../models/Post";
import Saved from "../../models/Saved";

// 2.
// createOneSavedValidator
export const createOneSavedValidator: RequestHandler[] = [
  check("postId")
    .isMongoId()
    .withMessage("Invalid Post Id !")
    .custom(async (val: string) => {
      const post = await Post.findById(val);
      if (!post) {
        throw new Error("The Post Not Found !");
      }
      const saved = await Saved.findOne({ postId: val });
      if (saved) {
        throw new Error("The Post Has Been Saved Before  !");
      }
      return true;
    }),
  // check("userId").isMongoId().withMessage("Invalid User Id !"),
  validatorMiddleware,
];
// getOneSavedValidator
// updateOneSavedValidator
// deleteOneSavedValidator
export const deleteOneSavedValidator: RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Saved Id !")
    .custom(async (val: string, { req }) => {
      const saved = await Saved.findById(val);
      if (!saved) {
        throw new Error("The Saved Doesn Not Exist To Be Deleted !");
      }
      if (saved?.userId?.toString() !== req.user?._id.toString()) {
        // console.log(req.user?._id.toString());
        // console.log(req.user?._id.toString());
        throw new Error("You Can Only Delete Your Saved !");
      }
      return true;
    }),
  validatorMiddleware,
];
