const { body, validationResult } = require('express-validator');

const loginValidateInput = [
    body('email').notEmpty().isEmail().withMessage('Please enter a valid email address'),
    body('password').notEmpty().isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),

    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, error: errors.array() });
        }
        next();
    }
];




module.exports = { loginValidateInput }