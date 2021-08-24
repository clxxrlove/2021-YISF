const express = require('express');
const router = express.Router();
const { create, isAuthenticated, refresh, isBan } = require('../authController');

router.post('/api/auth/login', create);
router.get('/api/auth', isAuthenticated);
router.get('/api/auth/refresh', refresh);
router.get('/api/auth/banuser', isBan);

module.exports = router;

