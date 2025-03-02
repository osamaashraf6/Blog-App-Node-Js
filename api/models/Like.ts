// 1. All required import
import mongoose from "mongoose";
import { ILike } from "../interfaces/Like";
// 2. LikeSchema
const LikeSchema = new mongoose.Schema<ILike>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" },
  },
  { timestamps: true }
);
// 3. (pre&post, statics, virtuals) CRUD
LikeSchema.pre<ILike>(/^find/, async function (next) {
  this.populate({ path: "userId", select: "name profileImg" });
  this.populate({ path: "postId", select: "title" });
  next();
});
export default mongoose.model<ILike>("LikeModel", LikeSchema);
