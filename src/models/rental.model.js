import mongoose, { Schema } from "mongoose";

const rentalSchema = mongoose.Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    movie: {
      type: Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
    dateOut: {
      type: Date,
      required: true,
      default: Date.now,
    },
    dateReturned: {
      type: Date,
    },
    rentalFee: {
      type: Number,
      min: 0,
    },
  },
  { timestamps: true }
);

export const Rental = mongoose.model("Rental", rentalSchema);
