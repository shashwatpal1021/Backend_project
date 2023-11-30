import express from "express";
import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "My API",
      version: "1.0.0",
      description: "A sample API for learning Swagger",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

import userRouter from "./routes/user.route.js";
import authRouter from "./routes/auth.route.js";
import customerRouter from "./routes/customer.route.js";
import genresRouter from "./routes/genres.route.js";
import moviesRouter from "./routes/movies.routes.js";
import rentalRouter from "./routes/rental.route.js";

// app.use("/api/genres", genres);

app.use("/api/customer", customerRouter);
app.use("/api/movies", moviesRouter);
app.use("/api/rentals", rentalRouter);
app.use("/api/users", userRouter);
app.use("/api/auth", authRouter);
app.use("/api/genres", genresRouter);

// app.get("/api/courses/:id", (req, res) => {
//   res.send(req.params.id);
// });
// const port = 3000;
// app.listen(port, () => console.log(`listening on port ${port}`));

export { app };
