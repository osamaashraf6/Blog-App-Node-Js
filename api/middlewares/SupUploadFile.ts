// All required import
import multer from "multer";
import express from "express";
import ApiError from "../utils/ApiError";
import { IFields } from "../interfaces/Fields";

// uploadOption middleware config

const uploadOption = (): multer.Multer => {
  //  memoryStorage===
  const memoryStorage = multer.memoryStorage();
  // fileFilter===
  const fileFilter = (
    req: express.Request,
    file: Express.Multer.File,
    cb: multer.FileFilterCallback
  ) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new ApiError(400, "Not an image! Please upload only images"));
    }
  };
  // upload===
  const upload = multer({ storage: memoryStorage, fileFilter: fileFilter });

  return upload;
};

export const uploadSingleFile = (fieldName: string) =>
  uploadOption().single(fieldName);
export const uploadFieldsFile = (fields: IFields[]) =>
  uploadOption().fields(fields);
