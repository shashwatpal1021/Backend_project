const jwt = require('jsonwebtoken');
const NodeCache = require('node-cache');
const cache = new NodeCache();
const { serialize } = require('cookie');
const { log } = require('winston');
const { authConfig } = require('../configs/auth.config');

const secretKey = authConfig.secretKey;

const getRefreshToken = (payload) => {
    return cache.get(`refreshToken_${payload}`);
};

const generateAccessToken = (payload) => {
    const options = { expiresIn: authConfig.accessTokenExpiry };
    return jwt.sign(payload, secretKey, options);
};

const generateRefreshToken = (payload) => {
    const options = { expiresIn: authConfig.refreshTokenExpiry };
    return jwt.sign(payload, secretKey, options);
};

const verifyAccessToken = (accessToken) => {
    try {
        const decoded = jwt.verify(accessToken, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};

const verifyRefreshToken = (refreshToken) => {
    try {
        const decoded = jwt.verify(refreshToken, secretKey);
        return decoded;
    } catch (error) {
        return null;
    }
};


const storeAccessToken = (payload, accessToken, res) => {
    cache.set(`accessToken_${payload}`, accessToken);
    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };
    const accessTokenCookie = serialize('accessToken', accessToken, cookieOptions);
    res.setHeader('Set-Cookie', accessTokenCookie);
};

const storeAccessAndRefreshTokenAndCookie = (payload, refreshToken, accessToken, res) => {
    cache.set(`refreshToken_${payload}`, refreshToken);
    cache.set(`accessToken_${payload}`, accessToken);
    const cookieOptions = {
        httpOnly: true,
        secure: true,
    };
    const accessTokenCookie = serialize('accessToken', accessToken, cookieOptions);
    res.setHeader('Set-Cookie', accessTokenCookie);
    const refreshTokenCookie = serialize('refreshToken', refreshToken, cookieOptions);
    res.append('Set-Cookie', refreshTokenCookie);
};

const authenticateToken = (req, res, next) => {
    const token = req.cookies.refreshToken;
    if (!token) return res.status(401).json({ success: false, message: 'Token required' })
    jwt.verify(token, secretKey, (err, user) => {
        if (err) return res.status(401).json({ success: false, message: 'Invalid token' });
        req.user = user;
        next();
    });
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
    storeAccessAndRefreshTokenAndCookie,
    getRefreshToken,
    authenticateToken,
    storeAccessToken
};
