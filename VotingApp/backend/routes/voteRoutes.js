const express = require("express");
const voteController = require ('../controllers/voteController');
const auth = require("../middleware/auth");
const upload = require("../middleware/upload");
const router = express.Router();
router.post("/addvote", auth,voteController.AddVote);
router.get("/api/getAllvote", voteController.GetAllVote);
module.exports = router;