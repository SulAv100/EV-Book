const express = require("express");
const router = express.Router();
const authController = require("../controllers/usercontroller.js")
const authMiddleware = require("../middleware/auth-middleware.js")

router.route("/register").post(authController.register);
router.route("/login").post(authController.login);
router.route('/getUser').get(authMiddleware,authController.getProfile);
router.route('/logout').post(authController.logout);
router.route('/adminLogin').post(authController.adminLogin);

module.exports = router;