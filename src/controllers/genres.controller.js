import { Genre } from "../models/genres.model.js";
import { asyncHandler } from "../middlewares/async.middleware.js";

export const getAllGenres = asyncHandler(async (req, res) => {
  const genres = await Genre.find().sort("name");
  res.send(genres);
});

export const createGenres = asyncHandler(async (req, res) => {
  let genre = new Genre({
    name: req.body.name,
  });
  genre = await genre.save();
  res.send(genre);
});

export const updateGenres = asyncHandler(async (req, res) => {
  const genre = await Genre.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
    },
    { new: true }
  );
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send(genre);
});

export const deleteGenres = asyncHandler(async (req, res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if (!genre)
    return res.status(404).send("The genre with the given ID was not found.");

  res.send("removed from the database");
});

export const getGenreById = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre)
    return res.status(404).send("The genre with the given ID was not found");

  res.send(genre);
});
