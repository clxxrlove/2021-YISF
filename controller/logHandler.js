const LogModel = require('../models').Log;
const { map, filter } = require('./fp');

const getLog = async (req, res) => {
    if (req.params.page < 1) return res.status(400).json({ success: false, message: "page will be greater than 1" });
    const data = map(a => a.toJSON(), await LogModel.findAll({
        order: [['createdAt', 'DESC']],
        limit: 20, offset: 20 * (req.params.page - 1)
    }));
    if (data == false) return res.status(204).end();
    return res.json(data);
}

const getLogByType = async (req, res) => {
    if (req.params.page < 1) return res.status(400).json({ success: false, message: "page will be greater than 1" });
    const data = map(a => a.toJSON(), await LogModel.findAll({
        where: { type: req.params.type },
        order: [['createdAt', 'DESC']],
        limit: 20, offset: 20 * (req.params.page - 1)
    }));
    if (data == false) return res.status(204).end();
    return res.json(data);
}

const getLogForSearch = async (req, res) => {
    if (req.params.page < 1) return res.status(400).json({ success: false, message: "page will be greater than 1" });
    const data = map(a => a.toJSON(), await LogModel.findAll({
        where: JSON.parse(JSON.stringify(req.body)),
        order: [['createdAt', 'DESC']],
        limit: 20, offset: 20 * (req.params.page - 1)
    }));
    if (data == false) return res.status(204).end();
    return res.json(data);
}

const getPage = async (req, res) => {
    const data = await LogModel.count({ where: JSON.parse(JSON.stringify(req.body))});
    return res.json({
        count: data,
        page: data / 20 > Math.floor(data / 20) ? Math.floor(data / 20) + 1 : Math.floor(data / 20)
    });
}

module.exports = { getLog, getLogByType, getLogForSearch, getPage };