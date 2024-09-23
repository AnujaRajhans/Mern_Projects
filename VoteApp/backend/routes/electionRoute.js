const express = require('express');
const { createElection, getElections } = require('../controllers/electionController');
const { protect, adminOnly } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/create', protect, adminOnly, createElection);
router.get('/', protect, getElections);

module.exports = router;