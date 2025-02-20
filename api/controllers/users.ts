// 1. All required import
import express from "express";
import asyncHandler from "express-async-handler";
import {
  createOneHandler,
  deleteOneHandler,
  getAllHandler,
  getOneHandler,
} from "./refactorcrud";
import { IUser } from "../interfaces/User";
import User from "../models/User";
import bcrypt from "bcryptjs";
import { createSignToken } from "../utils/Token";
// 2. | (general)=>general | ("private:coll" with general, "private:doc")=>private | (custom, authentication, usercontroller)=>custom | (pre&post, statics, virtuals) | CRUD

// 3.
// 3.1 general

// createOneUser
export const createOneUser = createOneHandler<IUser>(User);
// getAllUser
export const getAllUser = getAllHandler<IUser>(User, "UserModel");
// getOneUser
export const getOneUser = getOneHandler<IUser>(User);
// deleteOneUser
export const deleteOneUser = deleteOneHandler<IUser>(User);

// 3.2 private

// 3.3 custom

// TODO: User
// updateUserProfileByUserHimSelf
export const updateUserProfileByUserHimSelf = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        profileImg: req.body.profileImg,
      },
      { new: true }
    );
    res.status(200).json(document);
  }
);
// changePasswordByUserHimSelf
export const changeUserPasswordByUserHimSelf = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.user._id,
      {
        password: await bcrypt.hash(req.body.password, 13),
        passwordChangedAt: Date.now(),
      },
      { new: true }
    );
    const token = createSignToken(document?._id, document?.role!);
    res
      .status(200)
      .json({ token, message: "Password Has Been Changed By User !" });
  }
);
// TODO: Manager
// updateUsersProfileByManagerOnly
export const updateUsersProfileByManagerOnly = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        lastname: req.body.lastname,
        phone: req.body.phone,
        profileImg: req.body.profileImg,
        active: req.body.active,
        role: req.body.role,
      },
      { new: true }
    );
    res.status(200).json(document);
  }
);
// changeUsersPasswordByManagerOnly
export const changeUsersPasswordByManagerOnly = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document = await User.findByIdAndUpdate(
      req.params.id,
      {
        password: await bcrypt.hash(req.body.password, 13),
        passwordChangedAt: Date.now(),
      },
      { new: true }
    );
    res.status(200).json({ message: "Password Has Been Changed By Manager !" });
  }
);
