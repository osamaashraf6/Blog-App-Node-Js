// 1. All required import
import { RequestHandler } from "express";
import validatorMiddleware from "../../middlewares/SupValidator";
import { check } from "express-validator";
import Post from "../../models/Post";
// 2.
// createOnePostValidator
export const createOnePostValidator: RequestHandler[] = [
  check("title")
    .notEmpty()
    .withMessage("Title Name Is Required")
    .isLength({ min: 3, max: 50 })
    .withMessage("Title Name Must Be Between 3 And 50 Characters")
    .custom(async (val) => {
      const document = await Post.findOne({ title: val });
      if (document) {
        throw new Error("Post Title Already Existed");
      }
      return true;
    }),
  validatorMiddleware,
];
// getOnePostValidator
export const getOnePostValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];
// updateOnePostValidator
export const updateOnePostValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  check("title")
    .optional()
    .isLength({ min: 3, max: 50 })
    .withMessage("Title Name Must Be Between 3 And 50 Characters"),
  validatorMiddleware,
];
// deleteOnePostValidator
export const deleteOnePostValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Mongo Id"),
  validatorMiddleware,
];
