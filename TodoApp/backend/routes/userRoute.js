const express = require("express");

const usercontroller = require("../controller/userController");
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

const router = express.Router();

router.post("/register", upload, usercontroller.register);
router.post("/login", usercontroller.login);
router.get("/userinfo", auth, usercontroller.userinfo);

module.exports = router;