// All required import
import { Request, Response, NextFunction, RequestHandler } from "express";
import { validationResult } from "express-validator";

// validatorMiddleware Middleware
const validatorMiddleware: RequestHandler | any = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  } else {
    next();
  }
};

export default validatorMiddleware;
