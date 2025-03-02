// 1. All required import
import mongoose from "mongoose";
import { IComment } from "../interfaces/Comment";
// 2. CommentSchema
const CommentSchema = new mongoose.Schema<IComment>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" },
    comment: { type: String, trim: true, required: true },
  },
  { timestamps: true }
);

// 3. (pre&post, statics, virtuals) CRUD
CommentSchema.pre<IComment>(/^find/, async function (next) {
  this.populate({ path: "userId", select: "name profileImg" });
  this.populate({ path: "postId", select: "title" });
  next();
});
export default mongoose.model<IComment>("CommentModel", CommentSchema);
