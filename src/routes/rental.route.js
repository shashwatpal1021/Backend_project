import { Router } from "express";
import { getAll } from "../controllers/rental.controller.js";

const router = Router();

router.route("/").get(getAll);

export default router
