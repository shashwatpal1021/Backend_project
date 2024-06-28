const jwt = require('jsonwebtoken');
const { authConfig } = require('../configs/auth.config');

const secretKey = authConfig.secretKey;

const generateToken = (payload, tokenExperiyTime) => {
    const options = { expiresIn: tokenExperiyTime };
    return jwt.sign(payload, secretKey, options);
};

const verifyToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

const authenticateToken =  (req, res, next) => {
    try {
        const token = req.cookies.accessToken;
        if (!token) return res.status(401).json({ success: false, message: 'Token required' })
        jwt.verify(token, secretKey, (err, user) => {
            if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
            req.user = user;
            next();
        });
    } catch (error) {
        throw user?.error?.message;

    }
};



module.exports = {
    generateToken,
    verifyToken,
    authenticateToken,
};
