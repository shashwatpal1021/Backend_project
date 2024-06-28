const express = require('express');
const router = express.Router();

const { logOutUser,logInUser, getData, getRegistered } = require('../controller/auth.controllers');

router.get('/allregisteres', getData);
router.post('/register', getRegistered);
router.post('/login', logInUser);
router.post('/logout',logOutUser)

module.exports = router;