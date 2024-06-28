var { supabaseInstance } = require("../../../supabase-db/index.js");

const authService = require('../../../utils/authService.js');
const AdminDatabase = require('../../../infrastructure/databases/adminDatabase.js');
const { AdminService } = require('../../../application/services/admin/adminService.js');


const adminDatabase = new AdminDatabase(supabaseInstance);
const adminService = new AdminService(adminDatabase);


const logInUser = async (req, res) => {
  try {
    const postBody = req.body
    if (postBody.email && postBody.password) {
      const serviceResponse = await adminService.login(postBody);
      if (serviceResponse) {
        const logInService = authService.logInGenerateAndStoreToken(postBody, res);
        if(!logInService){
          return res.status(500).json({ success: false, error: 'Login failed' });
        }
        res.status(200).json({ success: true, data: serviceResponse });
      } else {
        res.status(500).json({ success: false, error: error.message });
      }
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
const refresh = async (req, res) => {
  try {
      const { email, password } = req.body;
      const payload = req.body;
      if (email, password) {
          const service = await authService.refreshService(payload, req, res)
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


const logOutUser = async (req, res) => {
  try {
    const service = await authService.logOutService(res);
    if (service) {
      res.status(200).json({ success: true, message: 'Logout successful' });
    } else {
      res.status(401).json({ error: 'Logout failed' });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports = {
  logInUser, logOutUser,refresh
};



