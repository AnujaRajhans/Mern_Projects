const express = require("express");
const electionController = require('../controllers/electionController');
const router = express.Router();
router.post("/createElection", electionController.createElection );
router.get("/getElections", electionController.getAllElections );
router.get("/getElectionById", electionController.getElectionById);
router.get("/getResults", electionController.getElectionResults);
module.exports = router;
