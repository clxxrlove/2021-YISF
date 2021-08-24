const jwt = require('jsonwebtoken');
const passport = require('passport');
require('dotenv').config();
const UserModel = require('../models').User;
const logger = require('../config/logger');

const create = (req, res) => {
    passport.authenticate('local', {session: false}, (err, user) => {
        if (err || !user) {
            return res.status(401).json({
                success: false,
                message: 'Something is not right',
                user,
                err,
            });
        }
        req.login(user, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            if (user.dataValues.banUser) {
                return res.json({
                    success: false,
                    isBan: true
                });
            }
            delete user.dataValues.password;
            const accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, { expiresIn: '30m' });
            const refreshToken = jwt.sign({
                isRefreshToken: true,
                uid: user.toJSON().uid,
            }, process.env.REFRESH_SECRET, { expiresIn: '1d' });
            const token = {
                accessToken,
                refreshToken
            };
            logger(req, 'login', `${user.nickname}님이 로그인 성공`);
            return res.json({
                success: true,
                user, token
            });
        });
    })(req, res);
    return;
};

const access = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (user) {
            req.user = user.toJSON();
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "Login required"
            });
        }
    })(req, res, next);
}

const isAuthenticated = (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (user) {
            return res.json({ success: true });
        } else {
            return res.status(401).json({
                success: false,
                err
            });
        }
    })(req, res);
}

const isAdmin = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (user) {
            const data = user.toJSON();
            if (!data.isAdmin) {
                return res.status(403).json({
                    success: false,
                });
            }
            req.user = data;
            next();
        } else {
            return res.status(401).json({
                success: false,
                err
            });
        }
    })(req, res);
}

const refresh = (req, res) => {
    jwt.verify(req.headers.refreshtoken,
        process.env.REFRESH_SECRET,
        (err, decoded) => {
        if (err) {
            return res.status(400).json({
                success: false,
                err
            })
        }
        if (!decoded.isRefreshToken) {
            passport.authenticate('jwt',
                {session: false}, (err, user) => {
                if (!user)
                    return res.status(401).json({
                        success: false,
                        status: {
                            accessToken: false,
                            refreshToken: false
                        }
                    });
                else {
                    const token = {};
                    token.refreshToken = jwt.sign({
                        isRefreshToken: true,
                        uid: user.toJSON().uid,
                    }, process.env.REFRESH_SECRET, { expiresIn: '1d' });
                    token.accessToken = jwt.sign(user.toJSON(),
                        process.env.JWT_SECRET, { expiresIn: '30m' });
                    return res.json({
                        success: true,
                        token
                    });
                }
            })(req, res);
        } else {
            passport.authenticate('jwt', { session: false }, (err, user) => {
                const token = {};
                token.refreshToken = req.headers.refreshtoken;
                if (user) {
                    token.accessToken = jwt.sign(user.toJSON(), process.env.JWT_SECRET, {expiresIn: '30m'});
                    return res.json({
                        success: true,
                        token
                    });
                } else {
                    UserModel.findOne({ where: { uid: decoded.uid } })
                        .then(userInfo => {
                            token.accessToken = jwt.sign(userInfo.toJSON(), process.env.JWT_SECRET, { expiresIn: '30m' });
                            return res.json({
                                success: true,
                                token
                            });
                        })
                        .catch(err => {
                            return res.json({
                                success: false,
                                err
                            });
                        });
                }
            })(req, res);
        }
    });
};

const isBan = (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (user) {
            if (user.dataValues.banUser) {
                return res.status(403).json({
                    success: true,
                    status: true,
                    err
                })
            } else {
                return res.json({
                    success: true,
                    status: false
                });
            }
        } else {
            return res.status(401).json({
                success: false,
                message: "Login required"
            });
        }
    })(req, res);
}

module.exports = { create, access, refresh, isAuthenticated, isAdmin, isBan };