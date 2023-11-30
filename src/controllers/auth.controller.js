import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";

const authCreation = async (req, res) => {
  // const { error } = validate(req.body);
  // if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({
    email: req.body.email,
  });
  if (!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) return res.status(400).send("Invalid email or Password.");
  // const token = user.generateAuthToken();
  // res.send(token);
  res.send(validPassword);
};

export { authCreation };
