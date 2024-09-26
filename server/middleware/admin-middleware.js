const adminModel = require("../models/admin-model.js");
const jwt = require("jsonwebtoken");

const adminMiddleware = async (req, res, next) => {
  const adminToken = req.cookies.adminToken;

  if (!adminToken || adminToken === undefined) {
    return res.status(401).json({ msg: "Invalid authentication" });
  }
  try {
    const decoded = jwt.verify(adminToken, process.env.JWT_SECRET_KEY);
    const user = await adminModel
      .findOne({ phoneNumber: decoded.phoneNumber })
      .select({ password: 0 });

    if (!user) {
      return res.status(401).json({ msg: "Invalid user " });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
  }
};
module.exports = adminMiddleware;
