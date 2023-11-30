
import { Router } from "express";

import { authCreation } from "../controllers/auth.controller.js";

const router = Router();

router.route("/").post(authCreation);

// function validate(req) {
//   const schema = {
//     email: Joi.string().min(5).max(255).required().email(),
//     password: Joi.string().min(5).max(255).required(),
//   };

//   return Joi.validate(req, schema);
// }



export default router;
