import { Document } from "mongoose";
import { IUser } from "./User";
import { IPost } from "./Post";

export interface IArchive extends Document {
  userId: IUser;
  postId: IPost;
}
