// 1. All required import

import express from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import ApiError from "../utils/ApiError";

// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.
// 3.1 general

// 3.2 private

// createOneAddressByUser
export const createOneAddressByUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      { $addToSet: { address: req.body.address } },
      { new: true }
    );
    if (!document) {
      next(new ApiError(404, "Document Not Found !"));
    }
    res
      .status(200)
      .json({ length: document?.address.length, data: document?.address });
  }
);

// getAllAddressByUser
export const getAllAddressByUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findById(req.user._id);
    if (!document) {
      next(new ApiError(404, "Document Not Found !"));
    }
    res
      .status(200)
      .json({ length: document?.address.length, data: document?.address });
  }
);
// getOneAddressByUser
// updateOneAddressByUser
// deleteOneAddressByUser
export const deleteOneAddressByUser = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      { $pull: { address: { _id: req.params.addressId } } },
      { new: true }
    );
    if (!document) {
      next(new ApiError(404, "Document Not Found !"));
    }
    res.status(200).json("One Address Has Been Deleted Successfully");
  }
);

// 3.3 custom
