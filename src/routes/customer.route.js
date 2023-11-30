import { Router } from "express";
import {
  getCustomer,
  createCustomer,
  updateCustomer,
} from "../controllers/customer.controller.js";

const router = Router();

router.route("/").get(getCustomer);
router.route("/create").post(createCustomer);
router.route("/:id").put(updateCustomer);

export default router;

