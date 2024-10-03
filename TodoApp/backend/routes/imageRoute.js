const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();
const imagecontroller = require("../controller/imageController");
router.post("/addimage", auth, imagecontroller.addimage);
router.get("/getallimage", auth, imagecontroller.getallimage);

module.exports = router;