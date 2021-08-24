const express = require('express');
const router = express.Router();
const { access, isAdmin } = require('../authController');
const C = require('../challController');
const wrap = require('../wrap');
const { createComment, deleteComment, getComment } = require('../commentController');

const multer = require('multer');

const storage  = multer.diskStorage({ // 2
    destination(req, file, cb) {
        cb(null, 'models/files/');
    },
    filename(req, file, cb) {
        cb(null, `${Date.now()}__${file.originalname}`);
    },
});

const upload = multer({ dest: 'models/files/' });

router.get('/api/prob/admin', access, isAdmin, wrap(C.getProb));
router.get('/api/prob/admin/id/:pid', access, isAdmin, wrap(C.getProb));
router.get('/api/prob/admin/type/:type', access, isAdmin, wrap(C.getProb));

router.get('/api/prob', access, C.getProbByActivation);
router.get('/api/prob/id/:pid', access, C.getProbByPid);
router.get('/api/prob/type/:type', access, C.getProbByType);
router.get('/api/prob/comment/:pid', access, wrap(getComment));

router.get('/api/ranking/user/top3', access, wrap(C.getRankingByElapsed));
router.get('/api/ranking/user/top16', access, wrap(C.getRankingBySolved));
router.get('/api/ranking/prob/top3', access, wrap(C.getRankingUpToThird));
router.get('/api/ranking/prob/top10', access, wrap(C.getRankingUpToTenth));
router.get('/api/prob/download/:pid/:fid', access, wrap(C.downloadFile));

router.post('/api/prob', access, isAdmin, upload.array('attachments'), C.addProb);
router.post('/api/prob/submit/:pid', access, C.submitFlag, C.flagHandler, wrap(createComment));
router.patch('/api/prob/:pid', access, isAdmin, upload.single('alter'), C.modifyProb);
router.patch('/api/prob/file/:fid', access, isAdmin, upload.single('alter'), C.modifyFile);
router.patch('/api/prob/file', access, isAdmin, upload.single('alter'), C.modifyFile);
router.delete('/api/prob/id/:pid', access, isAdmin, C.deleteProb);
router.delete('/api/prob/comment/:pid/:cid', access, isAdmin, deleteComment);

module.exports = router;