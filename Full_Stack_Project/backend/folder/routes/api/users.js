var express = require('express');
var router = express.Router();
var { getUser, login, refresh, logOut } = require("../../controllers/userController");
const { authenticateToken } = require('../../middleware/auth');
var { getUser, createUser, updateUser, deleteUser } = require("../../controllers/userController");

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('CORS Headers:', res.getHeaders());
  res.send('CORS is working!');
})
/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});



router.post('/login', login);
router.post('/refresh', refresh);

// protected 

router.post("/createUser",authenticateToken, createUser)
router.get("/getUser",authenticateToken, getUser);
router.post('/logout', authenticateToken, logOut);
router.post("/updateUser",authenticateToken, updateUser)
router.post("/deleteUser",authenticateToken, deleteUser)


module.exports = router;
