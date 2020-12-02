import { Schema, model, models } from "mongoose";

const userSchema = new Schema(
  {
    username: String,
    password: String,
    email: String,
  },
  { timestamps: true }
);

export default models.User || model("User", userSchema);
