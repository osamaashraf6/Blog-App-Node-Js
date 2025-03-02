// 1. All required import

import { RequestHandler } from "express";
import validatorMiddleware from "../../middlewares/SupValidator";
import { check } from "express-validator";

// 2.
// createOneAddressByUserValidator
export const createOneAddressByUserValidator: RequestHandler[] = [
  check("address").notEmpty().withMessage("Address Required !"),
  validatorMiddleware,
];
// getOneAddressByUserValidator
// updateOneAddressByUserValidator
// deleteOneAddressByUserValidator
export const deleteOneAddressByUserValidator: RequestHandler[] = [
  check("id").isMongoId().withMessage("Invalid Address Id !"),
  validatorMiddleware,
];
