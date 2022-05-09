const { Router } = require("express");

const fileController = require("../controllers/fileController");

const router = new Router();

router.get("/file", fileController.handelFile);


module.exports = router;
