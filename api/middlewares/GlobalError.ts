// 1. All required import
import express from "express";
import { IError } from "../interfaces/Error";
// 2. GlobalError middleware
const GlobalError = (
  error: IError,
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) => {
  error.statusCode = error.statusCode || 500;
  error.status = error.status || "Internal Server Error";
  if (process.env.NODE_ENV !== "production") {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
      stack: error.stack,
      error,
    });
  } else {
    res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
};

export default GlobalError;
