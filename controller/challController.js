const ChallModel = require('../models').Chall;
const ScoreModel = require('../models').Score;
const SolverModel = require('../models').Solver;
const FiledataModel = require('../models').Filedata;
const UserModel = require('../models').User;
const resetter = require('../scoreResetter');

const mime = require('mime')
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const EventSolver = [];

const logger = require('../config/logger');
const { getGraphData, getRanking, getProbRanking } = require('./graph');
const { map, filter, reduce, take } = require('./fp');

require('dotenv').config();

const equals = (predicate, list) => {
    for (const a of list) {
        if (predicate(a))
            return true;
    }
    return false;
}

const dynamicallyCreate = async (x) => {
    const max = 1000, min = 100;
    const threshold = await getCountOfUsers();
    if (x > threshold) x = threshold;
    return Math.floor(((min - max)
        / Math.pow(Math.floor(threshold), 2))
            * Math.pow(x, 2)) + max;
}

const getCountOfUsers = async () => {
    return await UserModel.count({
        where: { isAdmin: 0 }
    });
}

const addProb = (req, res) => {
    ChallModel.create({
        name: req.body.name,
        type: req.body.type,
        info: req.body.info,
        issuer: req.body.issuer,
        flag: req.body.flag
    }).then((challResult) => {
        const arrayForFiledata = [];
        for (let i=0; i<req.files.length; i++) {
            arrayForFiledata.push(
                FiledataModel.create({
                    filename: req.files[i].filename,
                    filepath: req.files[i].destination,
                    mimetype: req.files[i].mimetype,
                    size: req.files[i].size,
                    pid: challResult.toJSON().pid
                })
            );
        }
        if (!arrayForFiledata) {
            Promise.all(arrayForFiledata)
                .then((fileResult) => {
                    res.json({
                        success: true,
                        result: {
                            challResult,
                            fileResult
                        }
                    });
                }).catch((err) => {
                res.status(400).json({
                    success: false,
                    err
                })
            });
        } else {
            return res.json({
                success: true
            })
        }
    }).catch((err) => {
        res.status(400).json({
            success: false,
            err
        });
    });
}

const getProb = async (req, res) => {
    const rawData = await ChallModel.findAll({
        include: [{
            model: FiledataModel,
            attributes: ['fid', 'filename', 'filepath'],
            // where: { pid: req.params.pid }
        }]
    });
    const data = map(a => a.toJSON(), rawData);
    const forAdmin = map(
        a => { return { pid: a.pid, name: a.name, type: a.type }}, data);
    if (req.params.pid) {
        const findOne = filter(a => a.pid == req.params.pid, data);
        if (findOne == false) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            });
        } else {
            return res.json(findOne);
        }
    } else if (req.params.type) {
        const char = req.params.type.toLowerCase();
        const findOne = filter(a => a.type == char, data);
        if (findOne == false) {
            return res.status(400).json({
                success: false,
                message: "No data found"
            });
        } else {
            return res.json(findOne);
        }
    } else {
        if (forAdmin === []) {
            return res.status(204).json({
                success: false,
                message: "No data found"
            });
        } else
            return res.json(forAdmin);
    }
};

const getProbByActivation = (req, res) => {
    ChallModel.findAll({ where: { active: true }})
        .then((rawData) => {
            const data = map(a => {
                const temp = a.toJSON();
                delete temp.flag;
                return temp;
            }, rawData)
            return res.json({
                success: true,
                result: data
            });
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                err
            });
        });
};

const getProbByType = (req, res) => {
    ChallModel.findAll({ where: { type: req.params.type, active: true }})
        .then((rawData) => {
            const data = map(a => {
                const temp = a.toJSON();
                delete temp.flag;
                return temp;
            }, rawData)
            return res.json({
               success: true,
               result: data
            });
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                err
            });
        });
}

const getProbByPid = (req, res) => {
    ChallModel.findOne({ where: { pid: req.params.pid, active: true }})
        .then((result) => {
            if (result == null) {
                return res.status(400).json({
                    success: false,
                    message: "No data found"
                });
            }
            ChallModel.increment('views', { where: { pid: req.params.pid }})
                .then(async () => {
                    const resultWithoutFlag = result.toJSON();
                    delete resultWithoutFlag.flag;
                    const solverData = await SolverModel.findAll({ where: { pid: req.params.pid }});
                    const fileData = await FiledataModel.findAll({ where: { pid: req.params.pid }});
                    const solver = map(a => a.toJSON(), solverData);
                    const files = map(a => a.toJSON(), fileData);

                    return res.json({
                        success: true,
                        result: resultWithoutFlag,
                        solved: equals(a => a.uid === req.user.uid
                        , solver),
                        downloadFile: files[0] !== undefined ? map(a => '/api/prob/download/' + req.params.pid + '/' + a.fid, files) : false
                    })
                })
                .catch((err) => {
                    return res.status(400).json({
                        success: false,
                        err
                    });
                })
        })
        .catch((err) => {
            return res.status(400).json({
                success: false,
                err
            });
        });
}

const submitFlag = (req, res, next) => {
    ChallModel.findOne({
        where: {
            pid: req.params.pid,
            flag: req.body.flag
        }})
        .then((result) => {
            if (req.user.isAdmin) {
                const err = new Error('FlagHandlerError: Admin is not allowed to submit.');
                err.status = 403;
                err.message = 'Submitting flags to an administrator account is prohibited.';
                throw err;
            }
            if (result === null) {
                const err = new Error('FlagHandlerError: Invalid flag.');
                err.status = 400;
                logger(req, 'error-flag', `${req.user.nickname}님이 ${req.params.pid}번 문제에서 ${req.body.flag}로 인증 실패`);
                err.message = 'Invalid flag.';
                throw err;
            }
            // if (result.type == 'event') {
            //     const eventList = filter(a => a.uid === req.user.uid, EventSolver);
            //     if (eventList.indexOf(req.user.uid) !== -1) {
            //         const err = new Error('FlagHandlerError: Already submitted event.');
            //         err.status = 400;
            //         logger(req, 'error-flag', `${req.user.nickname}님이 ${req.params.pid}번 이벤트 문제에서 재인증으로 인증 실패`);
            //         err.message = 'Already submitted event.';
            //         throw err;
            //     } else {
            //         if (req.body.flag == result.flag) {
            //             EventSolver.push(req.user);
            //             console.log(EventSolver);
            //             logger(req, 'flag', `${req.user.nickname}님이 ${req.params.pid}번 이벤트 문제에서 ${req.body.flag}로 인증 성공`);
            //             return;
            //         } else {
            //             const err = new Error('FlagHandlerError: Invalid flag.');
            //             err.status = 400;
            //             logger(req, 'error-flag', `${req.user.nickname}님이 ${req.params.pid}번 이벤트 문제에서 ${req.body.flag}로 인증 실패`);
            //             err.message = 'Invalid flag.';
            //             throw err;
            //         }
            //     }
            // }

            flagHandler(req, res, next, result.toJSON().score, req.user.uid);
        })
        .catch((err) => {
            logger(req, 'error', `${req.user.nickname}님이 ${req.params.pid}번 문제에서 ${req.body.flag}로 인증 중 오류 발생, 오류 -> ${err}`, err);
            return res.status(err.status || 400).json({
                success: false,
                message: err.message || "Bad Request",
            });
        });
}

const flagHandler = async (req, res, next, score, uid) => {
    const solverData = await SolverModel.findOne({ where: {
        pid: req.params.pid, uid
    }})

    if (solverData != null) {
        logger(req, 'error-flag', `${req.user.nickname}님이 ${req.params.pid}번 문제 반복 제출 확인`);
        return res.status(400).json({
            success: false,
            message: "Already solved"
        });
    }
    SolverModel.findAll({ where: { pid: req.params.pid }})
        .then(async () => {
            // const userList = [];
            // const prevScore = await dynamicallyCreate(solver.length);
            // const nextScore = await dynamicallyCreate(solver.length + 1);
            // const medianScore = prevScore - nextScore;

            await SolverModel.create({
                uid,
                pid: req.params.pid
            });

            // for (let i = 0; i < solver.length; i++) {
            //     userList.push(solver[i].uid);
            // }
            // await ChallModel.update({ score: nextScore }, { where: { pid: req.params.pid }});
            // await ChallModel.increment('count', { where: { pid: req.params.pid }});
            // await ScoreModel.increment('pscore', { by: prevScore, where: { uid } });
            // await ScoreModel.increment('solved', { where: { uid } });
            // await ScoreModel.update({ solvedAt: new Date }, { where: { uid } });
            // await ScoreModel.decrement('pscore',
            //     { by: medianScore, where: { uid: { [Op.in]: userList} }})
            await resetter.setScore();
            await resetter.getGraphData();
            await resetter.setSolvedAt();

            logger(req, 'flag', `${req.user.nickname}님이 ${req.params.pid}번 문제에서 ${req.body.flag}로 인증 성공`);
            next();
        })
        .catch(err => {
            logger(req, 'error-flag', `${req.user.nickname}님이 ${req.params.pid}번 문제에서 ${req.body.flag}로 인증 시도중 에러 발견`);
            return res.status(400).json({
                success: false,
                err
            })
        });
}

const modifyProb = (req, res) => {
    if (req.params.pid == 'file')
        return modifyFile(req, res);
    ChallModel.findOne({ where: { pid: req.params.pid }})
        .then(prob => {
            const probData = {
                name: req.body.name ? req.body.name : prob.name,
                type: req.body.type ? req.body.type : prob.type,
                info: req.body.info ? req.body.info : prob.info,
                issuer: req.body.issuer ? req.body.issuer : prob.issuer,
                flag: req.body.flag ? req.body.flag : prob.flag,
                active: req.body.active !== undefined ? req.body.active : prob.active,
            }
            ChallModel.update(probData, { where: { pid: req.params.pid }})
                .then(() => {
                    if (req.files !== undefined) {
                        const arrayForFiledata = [];
                        for (let i = 0; i < req.files.length; i++) {
                            arrayForFiledata.push(
                                FiledataModel.create({
                                    filename: req.files[i].filename,
                                    filepath: req.files[i].destination,
                                    mimetype: req.files[i].mimetype,
                                    size: req.files[i].size,
                                    pid: challResult.toJSON().pid
                                })
                            );
                        }
                        Promise.all(arrayForFiledata)
                            .then(() => {
                                res.json({
                                    success: true,
                                });
                            }).catch((err) => {
                            res.status(400).json({
                                success: false,
                                err
                            })
                        });
                    } else {
                        return res.json({
                            success: true,
                            message: 'none files'
                        })
                    }
                })
                .catch(err => {
                    return res.status(400).json({
                        success: false,
                        err
                    });
                });
        });
}

const modifyFile = (req, res) => {
    if (req.file === undefined) {
        return res.status(400).json({
            success: false,
            message: "No file found"
        });
    }

    const data = {
        filename: req.file.filename,
        filepath: req.file.destination,
        mimetype: req.file.mimetype,
        size: req.file.size,
    }

    if (req.params.fid) {
        FiledataModel.update(data, { where: { fid: req.params.fid }})
            .then(() => {
                return res.json({ success: true });
            }).catch((err) => {
            return res.status(400).json({ success: false, err });
        });
    } else if (req.body.pid) {
        data.pid = req.body.pid;
        FiledataModel.create(data)
            .then(() => {
                return res.json({ success: true });
            }).catch((err) => {
            return res.status(400).json({ success: false, err });
        });
    } else {
        return res.status(400).json({ success: false, message: "No params and body found." });
    }
}

const getRankingByElapsed = async (req, res) => {
    return res.json(await getGraphData())
}

const getRankingBySolved = async (req, res) => {
    return res.json(await getRanking());
}

const getRankingUpToThird = async (req, res) => {
    return res.json(await getProbRanking(3));
}

const getRankingUpToTenth = async (req, res) => {
    return res.json(await getProbRanking(10));
}

const downloadFile = async (req, res) => {
    const rawData = await FiledataModel.findOne({ where: { fid: req.params.fid, pid: req.params.pid }});
    if (rawData === null)
        return res.status(400).json({ success: false, message: "Invalid fid or pid" });
    const data = rawData.toJSON();
    // const data = rawData[0].toJSON();
    const file = '/root/back/back/' + data.filepath + data.filename;

    logger(req, 'download', `${req.user.nickname}님이 ${req.params.pid}번 문제에서 ${req.params.fid}번 파일 다운로드 시도`);
    // try {
    //     if (fs.existsSync(file)) {
    //         res.setHeader('Content-disposition', 'attachment; filename=' + data.filename + '.' + mime.extension(data.mimetype)); // 다운받아질 파일명 설정
    //         res.setHeader('Content-type', data.mimetype); // 파일 형식 지정
    //
    //         const filestream = fs.createReadStream(file);
    //         filestream.pipe(res);
    //     } else {
    //         return res.status(400).json({
    //             success: false,
    //             message: 'no file found'
    //         });
    //     }
    // } catch (e) {
    //     res.status(400).json({
    //         success: false,
    //         message: 'error occurred during file download'
    //     })
    // }
    res.download(file, data.filename + '.' + mime.extension(data.mimetype));
}

const deleteProb = async (req, res) => {
    ChallModel.destroy({
        where: { pid: req.params.pid }
    }).then(() => {
        return res.status(204).end();
    }).catch(() => {
        return res.status(400).json({ success: false });
    });
}
// (async function() {
//     console.log(await SolverModel.findAll());
// })()

module.exports = {
    addProb, getProb, getProbByPid,
    getProbByType, submitFlag,
    flagHandler, modifyProb, modifyFile,
    getProbByActivation,
    getRankingByElapsed,
    getRankingBySolved,
    getRankingUpToThird,
    getRankingUpToTenth,
    deleteProb,
    downloadFile
};