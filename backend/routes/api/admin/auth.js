const express = require('express');
const router = express.Router();

const { logInUser, logOutUser, refresh } = require('../../../presentation/controller/admin/auth.controllers');
const { authenticateToken } = require('../../../middleware/auth');
const {loginValidateInput} =require('../../../validator/admin/auth.validator')

router.post('/login',loginValidateInput, logInUser);
// router.post("/refresh",authenticateToken, refresh)
// router.post('/logout',authenticateToken, logOutUser);

router.post("/refresh", refresh)
router.post('/logout', logOutUser);

module.exports = router;