const express = require('express');
const { loginAdmin, protectedRoute } = require('../controllers/adminController');
const { verifyAdmin } = require('../middleware/auth');

const router = express.Router();

router.post('/admin-login', loginAdmin);
router.get('/protected', verifyAdmin, protectedRoute);

module.exports = router;
