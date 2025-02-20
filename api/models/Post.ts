// 1. All required import
import mongoose from "mongoose";
import { IPost } from "../interfaces/Post";
// 2. PostSchema
const PostSchema = new mongoose.Schema<IPost>(
  {
    title: { type: String, required: true, trim: true },
    briefDesc: { type: String, required: true, trim: true },
    detailedDesc: { type: String, required: true, trim: true },
    postImg: { type: String },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    category: { type: String, required: true, trim: true },
    tags: [String],
  },
  { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } }
);
PostSchema.virtual("saveds", {
  ref: "SavedModel",
  localField: "_id",
  foreignField: "postId",
});
// 3. (pre&post, statics, virtuals) CRUD
PostSchema.pre<IPost>(/^find/, async function (next) {
  this.populate({ path: "userId", select: "name profileImg" });
  next();
});
export default mongoose.model<IPost>("PostModel", PostSchema);
