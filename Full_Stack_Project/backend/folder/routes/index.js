var express = require('express');
var router = express.Router();


//* Importing Routes File
var userRouter = require("./api/users");

//* Declare route paths
router.use('/user', userRouter);

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
