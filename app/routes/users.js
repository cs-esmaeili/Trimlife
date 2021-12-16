const { Router } = require("express");

const userController = require("../controllers/userController");

const router = new Router();

//  @desc   Login Handle
//  @route  POST /users/login
router.post("/login", userController.handleLogin);


module.exports = router;
