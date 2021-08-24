const SolverModel = require('../models').Solver;
const CommentModel = require('../models').Comment;
// const ChallModel = require('../models').Chall;

const initComment = require('../models/randComment');
const { map, filter, reduce, take } = require('./fp');

const getComment = async (req, res) => {
    const data = await CommentModel.findAll({ where: { pid: req.params.pid }});
    return res.json({
        success: data.length !== 0,
        data
    });
}

// const createComment = (req, res) => {
//     const comment = initComment();
//     SolverModel.findOne({ where: { pid: req.params.pid, uid: req.user.uid }})
//         .then((result) => {
//             CommentModel.create({
//                 pid: req.params.pid,
//                 name: req.user.name,
//                 comment: comment
//             }).then((status) => {
//                 console.log(status);
//                 return res.json({ success: true });
//             }).catch(() => {
//                 return res.status(400).json({ success: false });
//             })
//         })
//         .catch(() => res.status(400).json({ success: false, message: "You need to be solved" }));
//     return;
// }

const createComment = async (req, res) => {
    const comment = initComment();
    // CommentModel.create({
    //     pid: req.params.pid,
    //     name: req.user.name,
    //     comment: comment.content
    // }).then((status) => {
    //     console.log(status);
    //     return res.json({ success: true });
    // }).catch(() => {
    //     return res.status(400).json({ success: false });
    // });
    const result = await CommentModel.create({
        pid: req.params.pid,
        name: req.user.nickname,
        content: comment.content
    });
    if (result) {
        return res.json({ success: true });
    } else {
        return res.status(400).json({ success: false });
    }
}

const deleteComment = (req, res) => {
    CommentModel.destroy({
        where: { cid: req.params.cid, pid: req.params.pid }
    }).then(() => {
        return res.status(204).end();
    }).catch(() => {
        return res.status(400).json({ success: false });
    });
}

module.exports = { createComment, deleteComment, getComment };