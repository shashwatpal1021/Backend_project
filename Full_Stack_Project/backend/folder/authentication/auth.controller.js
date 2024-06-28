var { supabaseInstance } = require("../supabase-db");
var { userLogger } = require("../services/loggerService");
const UserDatabase = require('../infrastructure/databases/userDatabase');
const { UserService } = require('../application/service/userService');

const { logInGenerateAndStoreToken, refreshService, logOutService } = require("../services/authService");

const userDatabase = new UserDatabase(supabaseInstance);
const userService = new UserService(userDatabase);

const getUser = async (req, res) => {
    try {
        const serviceResponse = await userService.getUser();
        userLogger.info('User fetch successful');
        return res.status(200).json(serviceResponse.data);
    } catch (e) {
        console.log("e==>", e)
        return res.status(500).json({ error: e })
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const payload = req.body;
        if (email && password) {
            const logInService = logInGenerateAndStoreToken(payload, res);
            if (logInService) {
                res.status(200).json({
                    success: true,
                    message: "login successfully",
                });
            } else {
                res.status(500).json({
                    success: false,
                    error: 'Facing error in generating token'
                });
            }
        } else {
            res.status(400).json({ error: 'email or password is missing' });
        }
    } catch (error) {
        res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

const refresh = async (req, res) => {
    try {
        const { email, password } = req.body;
        const payload = req.body;
        if (email, password) {
            const service = refreshService(payload, req, res)
            if (service) {
                res.status(200).json({ success: true, message: "refresh successful", });
            } else {
                res.status(401).json({ success: false, error: 'Invalid refresh token' });
            }
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }
}

const logOut = async (req, res) => {
    try {
        const service = logOutService(res);
        if (service) {
            res.status(200).json({ success: true, message: 'Logout successful' });
        } else {
            res.status(401).json({ error: 'Logout failed' });
        }
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getUser, login, refresh, logOut }
