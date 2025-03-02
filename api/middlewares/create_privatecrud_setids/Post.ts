// 1. All required import
import express from "express";
// 2. setUserId
export const setUserId = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.body.userId) {
    req.body.userId = req.user._id.toString();
  }
  next();
};
export const filterPosts = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let filterData: any = {};
  if (req.user._id) {
    filterData.userId = req.user._id.toString();
  }
  req.filterData = filterData;
  next();
};
