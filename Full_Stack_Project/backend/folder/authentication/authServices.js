const NodeCache = require('node-cache');
const cache = new NodeCache();
const { serialize } = require('cookie');

const auth = require('../middleware/auth');
const logInGenerateAndStoreToken = (payload, res) => {
  try {
    const accessToken = auth.generateAccessToken(payload);
    const refreshToken = auth.generateRefreshToken(payload);
    auth.storeAccessAndRefreshTokenAndCookie(payload, refreshToken, accessToken, res);
    return true;
  } catch (error) {
    console.log("log in error", error)
  }
};

const refreshService = async (payload, req, res,) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const isValidRefreshToken = auth.verifyRefreshToken(refreshToken);
    if (isValidRefreshToken && auth.getRefreshToken(payload) === refreshToken) {
      const newAccessToken = auth.generateAccessToken(payload);
      auth.storeAccessToken(payload, newAccessToken, res);
      return true;
    } else {
      res.status(401).json({ error: 'Invalid refresh token' });
    }
  } catch (error) {
    console.log("refresh error", error)
  }
}

const logOutService = async (res) => {
  res.clearCookie('refreshToken', { path: '/user' });
  res.clearCookie('accessToken', { path: '/user' })
  return true;
}

module.exports = {
  logInGenerateAndStoreToken,
  refreshService,
  logOutService
}