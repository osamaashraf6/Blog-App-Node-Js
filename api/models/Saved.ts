// 1. All required import
import mongoose from "mongoose";
import { ISaved } from "../interfaces/Saved";
// 2. SavedSchema
const SavedSchema = new mongoose.Schema<ISaved>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" },
  },
  { timestamps: true }
);
// 3. (pre&post, statics, virtuals) CRUD

SavedSchema.pre<ISaved>(/^find/, async function (next) {
  this.populate({ path: "postId", select: "title postImg briefDesc category" });
  next();
});
export default mongoose.models.SavedModel ||
  mongoose.model<ISaved>("SavedModel", SavedSchema);
