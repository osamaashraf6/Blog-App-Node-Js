import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  address: IAddress[];
  profileImg: string;
  active: boolean;
  role: TRole;
  resetCode: string | undefined;
  resetCodeVerify: boolean | undefined;
  resetCodeExpireTime: Date | number | undefined;
  passwordChangedAt: Date | number;
}

export interface IAddress {
  street: string;
  city: string;
  state: string;
  postalCode: string;
}

type TRole = "manager" | "admin" | "user";
