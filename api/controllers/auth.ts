// 1. All required import
import express from "express";
import asyncHandler from "express-async-handler";
import { IUser } from "../interfaces/User";
import User from "../models/User";
import ApiError from "../utils/ApiError";
import { createResetToken, createSignToken } from "../utils/Token";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import sendMail from "../utils/SendMail";
import Jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
// 2. | (general) | ("private:coll" with general, "private:doc") | (custom, authentication, usercontroller) | (pre&post, statics, virtuals) | CRUD

// 3.

// 3.1 general

// 3.2 private

// 3.3 custom

// register
export const register = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const document: IUser | null = await User.create(req.body);
    if (!document) {
      return next(new ApiError(400, "Document Not Found !"));
    }
    const token = createSignToken(document._id, document.role);
    res.status(200).json({ token, data: document });
  }
);
// login
export const login = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError(401, "Invalid Credentails !"));
    }
    const password = await bcrypt.compare(req.body.password, user!.password);
    if (!password) {
      return next(new ApiError(401, "Invalid Credentails !"));
    }
    const token = createSignToken(user._id, user!.role);
    res.status(200).json({ token, data: user });
  }
);
// logout
// forgetPassword
export const forgetPassword = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    // 1. check if the email is existed
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new ApiError(404, "User Not Found !"));
    }
    // 2. make the resetCode by random & hash it by crypto
    const resetCode: string = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const hashedResetCode = crypto
      .createHash("sha256")
      .update(resetCode)
      .digest("hex");
    // 3. assign and save the user.resetCode ... in the db
    user.resetCode = hashedResetCode;
    user.resetCodeVerify = false;
    user.resetCodeExpireTime = Date.now() + 10 * 60 * 1000;
    // 4. in try catch: send the resetcode to the SendMail() & save the user
    const message: string = `Your resetCode Is ${resetCode}`;
    try {
      await sendMail({
        email: user.email,
        subject: "Reset Code For Forgetting Password ",
        message,
      });
      await user.save({ validateModifiedOnly: true });
    } catch (err: any) {
      console.error(`message:${err.message} `);
      return next(new ApiError(400, "Error Sending Email !"));
    }
    // 5. after try catch make the CreateResetToken & send in res
    const token: string = createResetToken(user._id);
    res
      .status(200)
      .json({ token, message: "Your resetCode Is Sent To Your Email" });
  }
);
// verifyResetCode
export const verifyResetCode = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    // 1. check if there is a token in the headers
    let resetToken: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      resetToken = req.headers.authorization.split(" ")[1];
    } else {
      return next(new ApiError(400, "Get Your Reset Code First !"));
    }
    // 2. verify the token by jwt
    const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_KEY!);
    // 3. hash the incoming resetCode by crypto
    const hashedResetCode: string = crypto
      .createHash("sha256")
      .update(req.body.resetCode)
      .digest("hex");
    // 4. find the user by the id & resetCode & expiretime
    const user = await User.findOne({
      _id: decodedToken._id,
      resetCode: hashedResetCode,
      resetCodeExpireTime: { $gt: Date.now() },
    });
    // 5. check if there is user or not
    if (!user) {
      return next(new ApiError(400, "Invalid Or Expired Reset Code"));
    }
    // 6. make user.resetCodeVerify = true & save the user & res
    user.resetCodeVerify = true;
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: "reset code verified" });
  }
);
//  verifyPersonalIdentity

// resetPassword
export const resetPassword = asyncHandler(
  async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ): Promise<void> => {
    // 1. check if there is a token in the headers
    let resetToken: string = "";
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      resetToken = req.headers.authorization.split(" ")[1];
    } else {
      return next(new ApiError(400, "Get Your Reset Code First !"));
    }
    // 2. verify the token by jwt
    const decodedToken: any = Jwt.verify(resetToken, process.env.JWT_KEY!);
    // 3. find the user by the id & resetCodeVerify
    const user = await User.findOne({
      _id: decodedToken._id,
      resetCodeVerify: true,
    });
    // 4. check if there is user or not
    if (!user) {
      return next(new ApiError(400, "Verify Your Reset Code First !"));
    }
    // 5. make user.resetCodeVerify = true | user.resetCode = undefined | ... |  & save the user & res
    user.password = req.body.password;
    user.resetCode = undefined;
    user.resetCodeVerify = undefined;
    user.resetCodeExpireTime = undefined;
    user.passwordChangedAt = Date.now();
    await user.save({ validateModifiedOnly: true });
    res.status(200).json({ message: "your password has been changed" });
  }
);
// refreshTokenForSession
// extendexpiretimeTokenOnRememberMe
// useremailautofillCredentialOnRememberMe

export const limitRequest = rateLimit({
  windowMs: 60 * 60 * 1000,
  limit: 20,
});
