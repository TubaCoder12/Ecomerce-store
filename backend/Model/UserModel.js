import mongoose from "mongoose";
const { model, Schema } = mongoose;
const userSchema = new Schema(
  {
    name: {
      type: String,
      maxLength: "200",
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      maxLength: "200",
      lowercase: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      maxLength: "200",
    },
    username: {
      type: String,
      required: true,
      unique: true,
      maxLength: "200",
      trim: true,
    },
    role: {
      type: String,
      enum: ["admin", "customer"], // allowed values
      default: "customer", // default role
    },
    profileImage: {},
  },
  { timestamps: true }
);
const User = model("User", userSchema);
export default User;
