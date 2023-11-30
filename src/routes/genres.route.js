import express from "express";
import { Router } from "express";
import {
  createGenres,
  deleteGenres,
  getAllGenres,
  getGenreById,
  updateGenres,
} from "../controllers/genres.controller.js";

const router = Router();

router.route("/").get(getAllGenres);
router.route("/create").post(createGenres);
router.route("/update/:id").put(updateGenres);
router.route("/delete/:id").delete(deleteGenres);
router.route("/search/:id").get(getGenreById);

export default router;
