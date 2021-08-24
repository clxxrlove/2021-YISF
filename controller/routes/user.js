const express = require('express');
const router = express.Router();
const { access, isAdmin } = require('../authController');
const { getScore, getSpecificUser, getUser,
    addUserForAdmin, addUser, modifyUser, getMe } = require('../userController');
const wrap = require('../wrap');

router.get('/api/user/:uid/solvedList', access, wrap(getScore));
router.get('/api/user/me', access, getMe);
router.get('/api/user/:uid', access, isAdmin, getSpecificUser);
router.patch('/api/user/:uid', access, isAdmin, modifyUser);
router.get('/api/user', access, isAdmin, getUser);
router.post('/api/user', access, isAdmin, addUser);
router.post('/api/user/admin', access, isAdmin, addUserForAdmin);

module.exports = router;