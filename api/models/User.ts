// 1. All required import
import mongoose from "mongoose";
import { IUser } from "../interfaces/User";
import bcrypt from "bcryptjs";
// 2. UserSchema
const UserSchema: mongoose.Schema = new mongoose.Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    lastname: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    password: { type: String, trim: true },
    phone: { type: String, trim: true, unique: true },
    address: [
      {
        street: { type: String, required: true, trim: true },
        city: { type: String, required: true, trim: true },
        state: { type: String, required: true, trim: true },
        postalCode: { type: String, required: true, trim: true },
      },
    ],
    profileImg: { type: String },
    active: { type: Boolean, default: true },
    role: { type: String, enum: ["manager", "admin", "user"], default: "user" },
    resetCode: { type: String },
    resetCodeVerify: { type: Boolean },
    resetCodeExpireTime: { type: Date },
    passwordChangedAt: { type: Date },
  },
  { timestamps: true }
);
// 3. (pre&post, statics, virtuals) CRUD
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) next();
  this.password = await bcrypt.hash(this.password, 13);
  next();
});

export default mongoose.model<IUser>("UserModel", UserSchema);
