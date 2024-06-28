var express = require("express");
var router = express.Router();
var adminRouter = require("./admin");
var authRouter = require("./auth");
var roleRouter = require("./role");
const { authenticateToken } = require("../../../middleware/auth");


router.use('/auth', authRouter);

// router.use('/', authenticateToken, adminRouter);
// router.use('/role', authenticateToken, roleRouter)


router.use('/',  adminRouter);
router.use('/role',  roleRouter)


router.get('/', (req, res, next) => {
    res.send({ success: true, message: "" });
})

module.exports = router;