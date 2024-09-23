// req.USER_ID
const Users = require("../models/users");

const isAdminMiddleware = async (req, res, next) => {
  try {
    const { USER_ID } = req;
    req.admin_id = USER_ID;

    const admin_doc = await Users.findById(USER_ID).select("role");

    if (admin_doc.role !== "Admin") {
      throw new Error("Unauthorized!!!");
    }
    next();
  } catch (error) {
    return res.status(401).json({
      isSuccess: false,
      message: error.message,
    });
  }
};

module.exports = isAdminMiddleware;
