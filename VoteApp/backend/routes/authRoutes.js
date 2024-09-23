const express = require('express');
const { register, login, getProfile } = require('../controllers/authController');
const upload = require('../middlewares/uploadMiddleware');
const { protect } = require('../middlewares/authMiddleware');
const router = express.Router();

router.post('/register', upload.single('profileImage'), register);
router.post('/login', login);
router.get('/me', protect, getProfile);

module.exports = router;