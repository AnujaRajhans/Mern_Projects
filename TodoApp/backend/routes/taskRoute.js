const express = require("express");
const taskcontroller = require("../controller/taskController");
const router = express.Router();
const auth = require("../middleware/auth");
const upload = require("../middleware/multer");

router.post("/addtask", auth, upload, taskcontroller.addtask);
router.post("/addCollaborator/:id", auth, taskcontroller.addCollaborator);
router.get("/gettaskbyid/:id", auth, taskcontroller.gettaskbyid);
router.get("/getalltask", auth, taskcontroller.getalltask);
router.put("/updatetask/:id", auth, taskcontroller.updatetask);
router.delete("/deletetask/:id", auth, taskcontroller.deletetask);
router.get("/getFilteredTasks", auth, taskcontroller.getFilteredTasks);
router.get("/getTasksForUser", auth, taskcontroller.getTasksForUser);

module.exports = router;