// 1. All required import
import express from "express";
// 2. setUserId
export const setUserId = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (req.user._id) {
    req.params.id = req.user._id.toString();
  }
  next();
};
