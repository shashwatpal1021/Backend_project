const asyncHandler = require('express-async-handler')
var { supabaseInstance } = require("../../supabase-db/index.js");

const RoleDatabase = require('../../infrastructure/databases/roleDatabase.js');
const { RoleService } = require('../../application/roleService');

const roleDatabase = new RoleDatabase(supabaseInstance);
const roleService = new RoleService(roleDatabase);

exports.getRole = asyncHandler(async (req, res) => {
    try {
        const serviceResponse = await roleService.getRole();
        if (serviceResponse.data) {
            return res.status(200).json({
                success: true,
                message: " get role successfully",
                data: serviceResponse.data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
})

exports.createAdminRole = async (req, res) => {
    try {
        const postBody = req.body
        const serviceResponse = await roleService.createRole(postBody);

        if (serviceResponse.data) {
            return res.status(200).json({
                success: true,
                message: "role created successfully",
                data: serviceResponse.data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}

exports.updateAdminRole = async (req, res) => {
    try {
        const postBody = req.body;
        const id = req.params.id;
        const serviceResponse = await roleService.updateRole(postBody, id);

        if (serviceResponse.data) {
            return res.status(200).json({
                success: true,
                message: "Role updated successfully",
                data: serviceResponse.data,
            });
        } else {
            return res.status(500).json({ success: false, message: error })
        }
    } catch (error) {
        res.status(500).json({ success: false, message: error })
    }
}
