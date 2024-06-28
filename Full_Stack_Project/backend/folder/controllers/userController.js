var { supabaseInstance } = require("../supabase-db");
var { userLogger } = require("../services/loggerService");
var { responseHandler } = require("../helpers/helper")

const UserDatabase = require('../infrastructure/databases/userDatabase');
const { UserService } = require('../application/service/userService');

const { logInGenerateAndStoreToken, refreshService, logOutService } = require("../services/authService");

const userDatabase = new UserDatabase(supabaseInstance);
const userService = new UserService(userDatabase);


const createUser = async (req, res) => {
    const postBody = req.body;
    try {
        const serviceResponse = await userService.createUser(postBody);
        if (serviceResponse.data) {
            userLogger.info('User Create successful');
            responseHandler(res, 201, { data: serviceResponse.data });
        } else {
            userLogger.error('Something Went Wrong');
            responseHandler(res, 404, { message: "Something Went Wrong." });
        }
    } catch (e) {
        responseHandler(res, 500, { message: e.message });
    }
}

const getUser = async (req, res) => {
    try {
        const serviceResponse = await userService.getUser();
        if (serviceResponse.data) {
            userLogger.info('User fetch successful');
            responseHandler(res, 200, { data: serviceResponse.data });
        } else {
            userLogger.error('Something Went Wrong');
            responseHandler(res, 404, { message: "Something Went Wrong." });
        }
    } catch (e) {
        responseHandler(res, 500, { message: e.message })
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

const updateUser = async (req, res) => {
    const postBody = req.body;
    try {
        const serviceResponse = await userService.updateUser(postBody);
        if (serviceResponse.data) {
            userLogger.info('User Update successful');
            responseHandler(res, 202, { data: serviceResponse.data });
        } else {
            userLogger.error('Something Went Wrong');
            responseHandler(res, 404, { message: "Something Went Wrong." });
        }
    } catch (e) {
        responseHandler(res, 500, { message: e.message })
    }
}

const deleteUser = async (req, res) => {
    const { user_id } = req.body;
    try {
        const serviceResponse = await userService.deleteUser(user_id);
        if (serviceResponse) {
            userLogger.info('User Deleted successful');
            responseHandler(res, 202, {message:"User Deleted successful"});
        } else {
            userLogger.error('Something Went Wrong');
            responseHandler(res, 404, { message: "Something Went Wrong." });
        }
    } catch (e) {
        responseHandler(res, 500, { message: e.message })
    }
}

module.exports = { getUser, login, refresh, logOut, createUser, updateUser, deleteUser } 
