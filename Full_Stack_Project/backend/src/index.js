require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express()

const logger = require('./logger.js');


app.set('view engine', 'ejs')

app.use((req, res, next) => {
  const startTime = new Date();

  // Log the incoming request
  logger.info(`${req.method} ${req.url}`);

  // Override the res.json method to log the response data
  const originalJson = res.json;
  res.json = function (data) {
    const endTime = new Date();
    const elapsedTime = endTime - startTime;

    // Log information about the API call
    logger.info(`API: ${req.url}, Status: ${res.statusCode}, Elapsed Time: ${elapsedTime}ms, Response: ${JSON.stringify(data)}`);

    // Call the original res.json method
    originalJson.call(res, data);
  };

  next();
});

app.use(
  cors({
    origin: '*',
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const port = process.env.PORT || 4000



app.use("/api/v1/books", require("./routes/book.routes.js"))

app.use("/api/v1/auth", require("./routes/auth.routes.js"))

app.use("/api/v1/images", require("./routes/imageUpload.routes.js"))


app.listen(port, () => console.log(`app listening on port ${port}!`))

module.exports = app