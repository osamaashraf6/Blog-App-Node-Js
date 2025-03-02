import { Document } from "mongoose";
import { IUser } from "./User";

export interface IPost extends Document {
  title: string;
  briefDesc: string;
  detailedDesc: string;
  postImg: string;
  userId: IUser;
  category: string;
  tags: string[];
}
