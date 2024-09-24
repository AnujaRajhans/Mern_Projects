const express = require ('express');
const candidateController = require ("../controllers/candidateController");
const router = express.Router();
router.get ("/getallCandidate",candidateController.getAllCandidates);
router.post ("/addcandidate",candidateController.addCandidate);
module.exports= router;

