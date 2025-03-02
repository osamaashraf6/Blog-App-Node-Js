// 1. All required import
import mongoose from "mongoose";
// 2. TestSchema
const TestSchema: mongoose.Schema = new mongoose.Schema<any>(
  {
    title: { type: String },
  },
  { timestamps: true }
);
export default mongoose.model<any>("TestModel", TestSchema);
// 3. (pre&post, statics, virtuals) CRUD
