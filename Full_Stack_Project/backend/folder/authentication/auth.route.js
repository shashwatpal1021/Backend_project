var express = require('express');
var router = express.Router();
var { getUser, login, refresh, logOut } = require("../../controllers/userController");
const { authenticateToken } = require('../../middleware/auth');

/* GET users listing. */
router.get('/', function (req, res, next) {
  console.log('CORS Headers:', res.getHeaders());
  res.send('CORS is working!');
});

router.get("/getUser", getUser);

router.post('/login', login);
router.post('/refresh', authenticateToken, refresh);
router.post('/logout', authenticateToken, logOut);


module.exports = router;
