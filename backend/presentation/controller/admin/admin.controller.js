var { supabaseInstance } = require("../../../supabase-db/index.js");

const AdminDatabase = require('../../../infrastructure/databases/adminDatabase.js');
const { AdminService } = require('../../../application/services/admin/adminService');

const adminDatabase = new AdminDatabase(supabaseInstance);
const adminService = new AdminService(adminDatabase);


exports.createAdmin = async (req, res) => {
    try {
        const postBody = req.body
        const serviceResponse = await adminService.createAdmin(postBody);
        if (serviceResponse.data) {
            return res.status(200).json({
                success: true,
                message: " admin created successfully",
                data: serviceResponse.data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

exports.updateAdmin = async (req, res) => {
    try {
        const postBody = req.body;
        const id = req.params.id;
        const serviceResponse = await adminService.updateAdmin(postBody, id);

        if (serviceResponse.data) {
            return res.status(200).json({
                success: true,
                message: " admin updated successfully",
                data: serviceResponse.data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

exports.getAdmins = async (req, res) => {
    try {
        const { page, limit } = req.query;

        const serviceResponse = await adminService.getAdmin(page, limit);
        if (serviceResponse) {
            return res.status(200).json({
                success: true,
                message: "admin list successfully",
                data: serviceResponse
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}
