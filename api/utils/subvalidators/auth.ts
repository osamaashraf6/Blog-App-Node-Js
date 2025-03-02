// 1. All required import

import { RequestHandler } from "express";
import validatorMiddleware from "../../middlewares/SupValidator";
import { check } from "express-validator";
import User from "../../models/User";

// 2.
// registerValidaor
export const registerValidaor: RequestHandler[] = [
  check("name")
    .notEmpty()
    .withMessage("user name required")
    .isLength({ min: 2, max: 50 })
    .withMessage("name length must be between 2 & 50"),
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email")
    .custom(async (val: string) => {
      const user = await User.findOne({ email: val });
      if (user) {
        throw new Error("Email is already exist");
      }
      return true;
    }),
  check("role")
    .optional()
    .custom((val: string, { req }) => {
      req.body.role = "user";
      return true;
    }),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char")
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("password doesn't match");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char"),
  check("phone")
    .optional()
    .isMobilePhone(["ar-EG"])
    .withMessage("invalid phone number"),
  validatorMiddleware,
];
// loginValidator
export const loginValidator: RequestHandler[] = [
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char"),
  validatorMiddleware,
];
// forgetPasswordValidator
export const forgetPasswordValidator: RequestHandler[] = [
  check("email")
    .notEmpty()
    .withMessage("Email is Required")
    .isEmail()
    .withMessage("Invalid Email"),
  validatorMiddleware,
];
// resetPasswordValidator
export const resetPasswordValidator: RequestHandler[] = [
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char")
    .custom((val: string, { req }) => {
      if (val !== req.body.confirmPassword) {
        throw new Error("password doesn't match");
      }
      return true;
    }),
  check("confirmPassword")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 6, max: 20 })
    .withMessage("password length from 6 to 20 char"),
  validatorMiddleware,
];
