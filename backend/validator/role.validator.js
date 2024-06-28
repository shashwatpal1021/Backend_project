const { body, validationResult } = require('express-validator');

const roleValidateInput = [
    body('name').notEmpty().isLength({ min: 3 }).withMessage('Name cannot be empty'),
    body('access').isArray().custom((value) => {
        if (!value || value.length === 0) {
            throw new Error('Access must contain at least one element');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() });
        }
        next();
    }
];

const updateRoleValidateInput = [
    body('name').notEmpty().isLength({ min: 3 }).withMessage('Name cannot be empty'),
    body('access').isArray().custom((value) => {
        if (!value || value.length === 0) {
            throw new Error('Access must contain at least one element');
        }
        return true;
    }),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() });
        }
        next();
    }
];




module.exports = { roleValidateInput,updateRoleValidateInput }