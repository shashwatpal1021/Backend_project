require('dotenv');
const { whitelists, NODE_ENV, PORT} = require("./envConfig")

const dynamicCors = function (req, callback) {
  let corsOptions;
  const isEnv = process.env.NODE_ENV;

  const origin = req.headers.origin || `http://localhost:${process.env.PORT}`;
  console.log(origin)

  if (isEnv === "prod" || isEnv === "dev" || whitelists.indexOf(origin) !== -1 || !origin && origin !== undefined) {
    corsOptions = { origin: true, credentials: true };
  } else {
    corsOptions = { origin: false };
    throw new Error("Access Denied")
  }
  callback(null, corsOptions);
};

module.exports = dynamicCors;
