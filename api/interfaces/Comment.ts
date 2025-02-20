import { Document } from "mongoose";
import { IUser } from "./User";
import { IPost } from "./Post";

export interface IComment extends Document {
  userId: IUser;
  postId: IPost;
  comment: string;
}
