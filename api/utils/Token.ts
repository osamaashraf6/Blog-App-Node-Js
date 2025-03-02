// 1. All required import
import Jwt from "jsonwebtoken";

// 2. CreateSignToken
export const createSignToken = (payload: any, role: any) => {
  return Jwt.sign({ _id: payload, role }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_Expire,
  });
};

// 3. CreateResetToken
export const createResetToken = (payload: any) => {
  return Jwt.sign({ _id: payload }, process.env.JWT_KEY!, {
    expiresIn: process.env.JWT_RESET_EXPIRE,
  });
};
