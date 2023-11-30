import mongoose from "mongoose";
// import Joi from "joi";
// import jwt from "jsonwebtoken"
// import config from "config"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
    },
    email: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 20,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
    },
    isAdmin: Boolean,
  },
  { timestamps: true }
);

// userSchema.methods.generateAuthToken = function () {
//   const token = jwt.sign(
//     { _id: this._id, isAdmin: this.isAdmin },
//     config.get("jwtPrivateKey")
//   );
//   return token;
// };

export const User = mongoose.model("User", userSchema);
