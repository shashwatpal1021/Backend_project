const express = require("express")
const router = express.Router()

const userController = require('./users.controller')

router.post('/authenticate', userController.authenticate)
router.get('/', userController.getAll)

module.exports = router;
