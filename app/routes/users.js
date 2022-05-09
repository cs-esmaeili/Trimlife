const { Router } = require("express");

const userController = require("../controllers/userController");

const router = new Router();

//  @desc   Login Handle
//  @route  POST /users/login
router.post("/login", userController.handleLogin);
//  @desc   Login Handle
//  @route  POST /users/register
router.post("/register", userController.handleRegister);
router.post("/revokeToken", userController.revokeToken);


module.exports = router;
