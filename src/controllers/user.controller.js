import { User } from "../models/user.model.js";
import _ from "lodash";
import bcrypt from "bcrypt";
import { asyncHandler } from "../middlewares/async.middleware.js";

const userCreation = asyncHandler(async (req, res) => {
  let user = await User.findOne({
    email: req.body.email,
  });

  if (user) return res.status(400).send("User already registered.");

  user = new User(_.pick(req.body, ["name", "email", "password"]));

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
  await user.save();

  // const token = user.generateAuthToken();
  res.send(_.pick(user, ["_id", "name", "email"]));
  // res.send("hello")
  // console.log("hi shashwat")
});
// userCreation()

const search = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  res.send(user);
});

export { userCreation, search };
