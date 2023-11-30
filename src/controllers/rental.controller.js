import { Movie } from "../models/movies.model.js";
import { Rental } from "../models/rental.model.js";
import { asyncHandler } from "../middlewares/async.middleware.js";

export const getAll = asyncHandler(async (req, res) => {
  const rentals = await Rental.find().sort("-dateOut");
  res.send(rentals);
});

export const createRental = asyncHandler(async (req, res) => {
  const customer = await Customer.findById(req.body.customer._id);
  if (!customer) return res.status(400).send("Invalid customer.");

  const movie = await Movie.findById(req.body.movie._id);
  if (!movie) return res.status(400).send("Invalid movie.");

  if (movie.numberInStock == 0)
    return req.status(400).send("Movie not in stack.");

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate,
    },
  });
  res.send(rental)
});
