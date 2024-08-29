const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { auth, admin } = require('../middleware/auth');
router.get('/', categoryController.getCategories);
router.post('/', auth, admin, categoryController.addCategory);
module.exports = router;
