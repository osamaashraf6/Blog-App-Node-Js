// 1. All required import
import mongoose from "mongoose";
import { IArchive } from "../interfaces/Archive";
// 2. ArchiveSchema
const ArchiveSchema = new mongoose.Schema<IArchive>(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: "PostModel" },
  },
  { timestamps: true }
);
// 3. (pre&post, statics, virtuals) CRUD
ArchiveSchema.pre<IArchive>(/^find/, async function (next) {
  this.populate({ path: "postId", select: "title postImg" });
  next();
});
export default mongoose.model<IArchive>("ArchiveModel", ArchiveSchema);
