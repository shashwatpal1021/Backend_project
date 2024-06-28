const { body, validationResult } = require('express-validator');

const createAdminValidateInput = [
    body('name').notEmpty().isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    body('phone').isLength({ min: 10, max: 10 }).withMessage('mobile must be a number'),
    body('role_id').notEmpty().isUUID().withMessage('role_id must be a UUID'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() });
        }
        next();
    }
];

const updateAdminValidateInput = [
    body('name').optional().isLength({ min: 5 }).withMessage('Name must be at least 5 characters long'),
    body('email').isEmail().optional().withMessage('Please enter a valid email address'),
    body('phone').isLength({ min: 10, max: 10 }).optional().withMessage('mobile must be a number'),
    body('role_id').notEmpty().optional().isUUID().withMessage('role_id must be a UUID'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() });
        }
        next();
    }
];


module.exports = { createAdminValidateInput, updateAdminValidateInput }