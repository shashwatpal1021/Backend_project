import { Router } from "express";
import {
  allMovies,
  createMovies,
  deleteMovie,
  searchById,
  updateMovies,
} from "../controllers/movies.controller.js";

const router = Router();

router.route("/").get(allMovies);
router.route("/search/:id").get(searchById);
router.route("/create").post(createMovies);
router.route("/update/:id").put(updateMovies);
router.route("/delete/:id").delete(deleteMovie);

export default router;
