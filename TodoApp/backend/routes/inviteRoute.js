const express = require("express");
const auth = require("../middleware/auth");
const invitecontroller = require("../controller/inviteController");
const router = express.Router();

router.post("/invitation", auth, invitecontroller.invitation);

module.exports = router;