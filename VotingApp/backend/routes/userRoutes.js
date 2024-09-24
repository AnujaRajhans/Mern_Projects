const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");

const router = express.Router();
router.post("/register", upload, userController.register);
router.post("/login", userController.login);
router.get("/userinfo", auth, userController.userinfo);
module.exports = router;