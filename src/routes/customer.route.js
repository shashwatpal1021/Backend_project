import { Router } from "express";
import {
  getCustomer,
  createCustomer,
  updateCustomer,
} from "../controllers/customer.controller.js";

const router = Router();

// routes/customer.route.js

/**
 * @swagger
 * /customer:
 *   get:
 *     summary: Retrieve a list of JSONPlaceholder users
 *     description: Retrieve a list of users from JSONPlaceholder. Can be used to populate a list of fake users when prototyping or testing an API.
 */

router.route("/").get(getCustomer);
router.route("/create").post(createCustomer);
router.route("/:id").put(updateCustomer);

export default router;
