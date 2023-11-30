import mongoose from "mongoose";

const genreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
  },
  { timestamps: true }
);

export const Genre = mongoose.model("Genre", genreSchema);
