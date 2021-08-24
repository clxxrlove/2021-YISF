const Sequelize = require('sequelize');
const { QueryTypes } = require('sequelize');
const ScoreModel = require('../models').Score;
const UserModel = require('../models').User;

const jwt = require('jsonwebtoken');
const path = require('path');
const crypto = require('crypto');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const sequelize = new Sequelize(config.database, config.username, config.password, config);

const getScore = async (req, res) => {
    if (!req.user.isAdmin) {
        if (req.params.uid != req.user.uid) {
            return res.status(403).json({
                success: false,
                message: `You don't have permission to access this page.`
            });
        }
    }

    const query = `select yisf_web.chall.pid, yisf_web.chall.name, yisf_web.chall.issuer from yisf_web.solver inner join yisf_web.chall on yisf_web.solver.pid = yisf_web.chall.pid where yisf_web.solver.uid = ?;`


    await (async function (req, res) {
        const user = await ScoreModel.findOne({ where: { uid: req.params.uid }});
        const result = await sequelize.query(
            query,
            {
                replacements: [req.params.uid],
                type: QueryTypes.SELECT
            }
        )
        const data = {
            success: true,
            uid: req.params.uid,
            user,
            result
        };
        res.json(data);
    })(req, res);
}

const certificationUser = (req, res) => {

}

const getMe = (req, res) => {
    jwt.verify(req.headers.authorization.toString().substring(7), process.env.JWT_SECRET, (err, decoded) => {
        if (decoded) {
            UserModel.findOne({ where: { uid: decoded.uid }})
                .then((user) => {
                    return res.json({
                        success: true,
                        user
                    })
                })
                .catch((err) => {
                    return res.status(400).json({
                        success: false,
                        err
                    })
                })
        } else {
            return res.status(401).json({
                success: false,
                err
            })
        }
    });
}

const getSpecificUser = (req, res) => {
    UserModel.findOne({ where: { uid: req.params.uid }})
        .then((user) => {
            return res.json({
                success: true,
                user
            });
        })
        .catch((err) => {
            return res.status(403).json({
                success: false,
                err
            })
        });
};

const getUser = (req, res) => {
    UserModel.findAll()
        .then((user) => {
            return res.json({
                success: true,
                user
            });
        })
        .catch((err) => {
            return res.status(403).json({
                success: false,
                err
            });
        });
}

const modifyUser = (req, res) => {
    UserModel.findOne({ where: { uid: req.params.uid }})
        .then((user) => {
            const cipher = req.body.password ? crypto.createHash('sha512').update(req.body.password).digest('hex') : false;
            const userdata = {
                email: req.body.email ? req.body.email : user.email,
                nickname: req.body.nickname ? req.body.nickname: user.nickname,
                password: req.body.password ? cipher : user.password,
                name: req.body.name ? req.body.name : user.name,
                isAdmin: req.body.usertype ? req.body.usertype : user.isAdmin,
            };
            UserModel.update(userdata, { where: { uid: req.params.uid }})
                .then(() => {
                    UserModel.findOne({ where: { uid: req.params.uid }})
                        .then(user => {
                            return res.json({
                                success: true,
                                user,
                            });
                        }).catch(err => {
                            return res.status(400).json({
                                success: false,
                                err
                            });
                        });
                })
                .catch(err => {
                    return res.status(400).json({
                        success: false,
                        err
                    });
                });
        })
        .catch(err => {
            return res.status(400).json({
                success: false,
                err
            });
        });
}

const addUser = (req, res) => {
    UserModel.create({
        email: req.body.email,
        nickname: req.body.nickname,
        password: req.body.password,
        name: req.body.name,
        isAdmin: req.body.usertype,
    }).then((result) => {
        UserModel.findOne({ where: { email: req.body.email }})
            .then(user => {
                ScoreModel.create({
                    uid: user.toJSON().uid
                }).then(() => {
                    return res.json({
                        success: true,
                        result
                    });
                })
            })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            err
        });
    })
}

const addUserForAdmin = (req, res) => {
    const cipher = crypto.createHash('sha512').update(req.body.password).digest('hex');
    UserModel.create({
        email: req.body.email,
        nickname: req.body.nickname,
        password: cipher,
        name: req.body.name,
        isAdmin: req.body.usertype,
    }).then((result) => {
        UserModel.findOne({ where: { email: req.body.email }})
            .then(user => {
                ScoreModel.create({
                    uid: user.toJSON().uid
                }).then(() => {
                    return res.json({
                        success: true,
                        result
                    });
                })
            })
    }).catch((err) => {
        res.status(400).json({
            success: false,
            err
        });
    })
}

module.exports = {
    getScore,
    getSpecificUser,
    getUser,
    modifyUser,
    addUser,
    addUserForAdmin,
    getMe
}