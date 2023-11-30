import mongoose from "mongoose";

const customerSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  isGold: {
    type: Boolean,
    default: false,
  },
  phone: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
},{timestamps:true});

export const Customer = mongoose.model("Customer", customerSchema);
