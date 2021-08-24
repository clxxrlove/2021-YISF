const NoticeModel = require('../models').Notice;
const { map, filter } = require('./fp');

const createNotice = (req, res) => {
    NoticeModel.create({
        title: req.body.title,
        content: req.body.content,
    }).then(() => {
        return res.json({ success: true });
    }).catch(() => {
        return res.status(400).json({ success: false });
    });
}

const getNotice = (req, res) => {
    NoticeModel.findAll({
        attributes: ['nid', 'title']
    }).then((result) => {
        return res.json({
            success: true,
            result
        });
    }).catch(() => {
        return res.status(400).json({ success: false });
    })
}

const getNoticeById = (req, res) => {
    NoticeModel.findOne({ where: { nid: req.params.nid }})
        .then((result) => {
            return res.json({
                success: true,
                result
            });
        }).catch(() => {
            return res.status(400).json({
                success: false
            });
        });
}

const deleteNotice = (req, res) => {
    NoticeModel.destroy({
        where: { nid: req.params.nid }
    }).then(() => {
        res.status(204).end();
    }).catch(() => {
        res.status(400).json({ success: false });
    });
}

const updateNotice = (req, res) => {
    NoticeModel.findOne({ where: { nid: req.params.nid }})
        .then((result) => {
            NoticeModel.update({
                title: req.body.title ? req.body.title : result.title,
                content: req.body.content ? req.body.content : result.content
            }, { where: { nid: req.params.nid }})
                .then(() => {
                    return res.json({ success: true });
                })
        }).catch(() => {
            return res.status(400).json({ success: false });
    })
}

module.exports = { createNotice, getNoticeById, getNotice, deleteNotice, updateNotice }