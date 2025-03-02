// 1. All required import
import express from "express";
import asyncHandler from "express-async-handler";
import Test from "../models/Test";
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.

// 3.1 general

// createOneTest
export const createOneTest = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const document = await Test.create(req.body);
    res.status(200).json(document);
  }
);
// getAllTest
export const getAllTest = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const document = await Test.find();
    res.status(200).json(document);
  }
);
// deleteOneTest
export const deleteOneTest = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    await Test.findByIdAndDelete(req.params.todoId);
    res.status(200).json("Test Has Been Deleted Successfully !");
  }
);
// 3.2 private

// 3.3 custom
