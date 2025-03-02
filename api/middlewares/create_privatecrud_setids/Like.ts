// 1. All required import
import express from "express";
// To create one archive (تابع ل مستخدم معين)
// SetUserIdProductId
export const setUserIdProductId = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  if (!req.body.userId) {
    req.body.userId = req.user?._id;
  }
  if (!req.body.postId) {
    req.body.postId = req.params.postId;
  }
  next();
};
// To get All Archives of user
export const filterLikes = (
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  let filterData: any = {};
  if (req.user?._id && !req.params.postId) {
    filterData.userId = req.user._id.toString();
  }
  if (req.params.postId) {
    filterData.postId = req.params.postId;
  }
  req.filterData = filterData;
  next();
};
