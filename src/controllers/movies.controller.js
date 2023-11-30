import { Genre } from "../models/genres.model.js";
import { Movie } from "../models/movies.model.js";
import { asyncHandler } from "../middlewares/async.middleware.js";

export const allMovies = asyncHandler(async (req, res) => {
  const movies = await Movie.find().sort("name");
  res.send(movies);
});

export const createMovies = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.body.genre._id);
  if (!genre) return res.status(400).send("Invalid genre.");

  const movie = new Movie({
    title: req.body.title,
    genre: {
      _id: genre._id,
      name: genre.name,
    },
    numberInStock: req.body.numberInStock,
    dailyRentalRate: req.body.dailyRentalRate,
  });
  await movie.save();

  res.send(movie);
});

export const updateMovies = asyncHandler(async (req, res) => {
  const genre = await Genre.findById(req.body.genre._id);

  if (!genre) return res.status(404).send("Invalid genre.");

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    {
      title: req.body.title,
      genre: {
        _id: genre._id,
        name: genre.name,
      },
      numberInStock: req.body.numberInStock,
      dailyRentalRate: req.body.dailyRentalRate,
    },
    {
      new: true,
    }
  );
  if (!movie)
    return res.status(404).send("The movie with the given ID was not found.");

  res.send(movie);
});

export const deleteMovie = asyncHandler(async (req, res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given Id was not found.");

  res.send("successful");
});

export const searchById = asyncHandler(async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie)
    return res.status(404).send("The movie with the given ID was not found");

  res.send(movie);
});
