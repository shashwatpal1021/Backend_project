import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

async function connectDB() {
  try {
    const connectionInstance = await mongoose.connect(
      `${process.env.MONGODB_URI}/${DB_NAME}`
    );
    console.log(
      `\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`
    );
  } catch (error) {
    console.error("could not connect to MongoDB ", error);
  }
}

export default connectDB;
