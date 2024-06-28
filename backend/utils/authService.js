const auth = require('../middleware/auth');
const { authConfig } = require('../configs/auth.config');

const logInGenerateAndStoreToken = (payload, res) => {
    try {
        const accessToken = auth.generateToken(payload, authConfig.accessTokenExpiry);
        const refreshToken = auth.generateToken(payload, authConfig.refreshTokenExpiry);
        const cookieOptions = {
            httpOnly: true,
            secure: true,
        };
        res
            .cookie('accessToken', accessToken, cookieOptions)
            .cookie('refreshToken', refreshToken, cookieOptions);
        return true;
    } catch (error) {
        throw user?.error?.message;
    }
};

const refreshService = async (payload, req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return sendUnauthorized(res, 'Access Denied. No refresh token provided.');
        }
        const isValidRefreshToken = auth.verifyToken(refreshToken);

        if (isValidRefreshToken.email === payload.email && isValidRefreshToken.password === payload.password) {
            const newAccessToken = auth.generateToken(payload, authConfig.accessTokenExpiry);
            const cookieOptions = {
                httpOnly: true,
                secure: true,
            };

            res
                .cookie('accessToken', newAccessToken, cookieOptions)
            return true;
        } else {
            return sendUnauthorized(res, 'Invalid refresh token');
        }
    } catch (error) {
        return sendInternalServerError(res);
    }
};

const sendUnauthorized = (res, message) => {
    return res.status(401).json({ error: message });
};

const sendInternalServerError = (res) => {
    return res.status(500).json({ error: 'Internal Server Error' });
};

const logOutService = async (res) => {
    res
        .clearCookie('refreshToken')
        .clearCookie('accessToken')
    return true;
}

module.exports = {
    logInGenerateAndStoreToken,
    refreshService,
    logOutService
}
