const express = require('express');
const router = express.Router();
const { access, isAdmin } = require('../authController');
const { createNotice, getNoticeById,
    getNotice, deleteNotice, updateNotice } = require('../noticeController');

router.get('/api/notice', access, getNotice);
router.get('/api/notice/:nid', access, getNoticeById);
router.post('/api/notice', access, isAdmin, createNotice);
router.delete('/api/notice/:nid', access, isAdmin, deleteNotice);
router.patch('/api/notice/:nid', access, isAdmin, updateNotice);

module.exports = router;