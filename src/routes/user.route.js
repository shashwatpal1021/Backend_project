import { Router } from "express";
import { userCreation, search } from "../controllers/user.controller.js";

const router = Router();

router.route("/search/:id").get(search);
router.route("/create").post(userCreation);

export default router;
