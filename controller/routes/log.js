const express = require('express');
const router = express.Router();
const { access, isAdmin } = require('../authController');
const { getLog, getLogByType, getLogForSearch, getPage } = require('../logHandler');
const wrap = require('../wrap');

router.use(access);
router.use(isAdmin);

router.get('/api/log/:page', wrap(getLog));
router.get('/api/log/type/:type/:page', wrap(getLogByType));
router.post('/api/log/search/:page', wrap(getLogForSearch));
router.post('/api/log/count/all', wrap(getPage));

module.exports = router;