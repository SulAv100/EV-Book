const express = require("express");
const router = express.Router();
const authController = require("../controllers/usercontroller.js")
const authMiddleware = require("../middleware/auth-middleware.js")
const adminMiddleware = require("../middleware/admin-middleware.js")

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route('/getUser').get(authMiddleware,authController.getProfile);
router.route('/adminData').get(adminMiddleware,authController.getAdminProfile);
router.route('/logout').post(authController.logout);
router.route('/adminLogout').post(authController.adminLogout);
router.route('/adminLogin').post(authController.adminLogin);
router.route('/changePassword').post(authController.changePassword);

module.exports = router;