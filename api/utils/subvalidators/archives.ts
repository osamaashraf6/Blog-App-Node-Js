// 1. All required import

import { RequestHandler } from "express";
import validatorMiddleware from "../../middlewares/SupValidator";
import { check } from "express-validator";
import Post from "../../models/Post";
import Archive from "../../models/Archive";

// 2.
// createOneArchiveValidator
export const createOneArchiveValidator: RequestHandler[] = [
  check("postId")
    .isMongoId()
    .withMessage("Invalid Post Id !")
    .custom(async (val: string) => {
      const post = await Post.findById(val);
      if (!post) {
        throw new Error("The Post Not Found !");
      }
      const archive = await Archive.findOne({ postId: val });
      if (archive) {
        throw new Error("The Post Has Been Archived Before  !");
      }
      return true;
    }),
  validatorMiddleware,
];
// createOneArchiveValidator
// createOneArchiveValidator
// createOneArchiveValidator
export const deleteOneArchiveValidator: RequestHandler[] = [
  check("id")
    .isMongoId()
    .withMessage("Invalid Archive Id !")
    .custom(async (val: string) => {
      const archive = await Archive.findById(val);
      if (!archive) {
        throw new Error("The Archive Doesn Not Exist To Be Deleted !");
      }
      return true;
    }),
  validatorMiddleware,
];
