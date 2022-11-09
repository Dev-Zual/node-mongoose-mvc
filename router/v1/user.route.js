const express = require("express");
const userController = require("../../controller/user.controller");
const verifyToken = require("../../middleware/verifyToken");
const router = express.Router();

router.route("/").get(userController.getAllUser);

router.route("/signup").post(userController.createUser);
router.route("/signup/confirmation/:token").get(userController.confirmEmail);

router.route("/login").post(userController.logIn);

router.get("/me", verifyToken, userController.getMe);

module.exports = router;
