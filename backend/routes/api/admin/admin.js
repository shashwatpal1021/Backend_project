const express = require('express');
const router = express.Router();

const { createAdmin, getAdmins, updateAdmin } = require('../../../presentation/controller/admin/admin.controller');
const { authenticateToken } = require('../../../middleware/auth');
const { createAdminValidateInput, updateAdminValidateInput } = require('../../../validator/admin/admin.validator');

// const { authenticateToken } = require('../middleware/auth');


router.post('/admin', createAdminValidateInput, createAdmin);
router.get('/admin', getAdmins);
router.put('/admin/:id', updateAdminValidateInput, updateAdmin);


module.exports = router;

