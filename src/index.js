import dotenv from "dotenv";
import connectDB from "./db/index.js";
import { app } from "./app.js";

dotenv.config({
  path: "./.env",
});
const port = process.env.PORT || 4000;

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("mongo db connection failed !!! ", err);
  });

