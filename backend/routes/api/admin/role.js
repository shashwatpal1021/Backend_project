const express = require('express');
const router = express.Router();

const { getRole, createAdminRole, updateAdminRole } = require('../../..//presentation/controller/role.controllers');
const { roleValidateInput, updateRoleValidateInput } = require('../../../validator/role.validator');


router.get('/', getRole);
router.post('/',roleValidateInput, createAdminRole);
router.put('/:id',updateRoleValidateInput, updateAdminRole);


module.exports = router;

