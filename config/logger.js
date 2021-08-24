const winston = require('winston');
require('winston-daily-rotate-file');
require('date-utils');

const LogModel = require('../models').Log;

const logger = {
    login: winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'log/YISF_%DATE%_login.log',
                zippedArchive: false,
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            }),
            new winston.transports.Console({
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            })
        ]
    }),
    download: winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'log/YISF_%DATE%_download.log',
                zippedArchive: false,
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            }),
            new winston.transports.Console({
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            })
        ]
    }),
    flag_submit: winston.createLogger({
        level: 'info',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'log/YISF_%DATE%_flag-submit.log',
                zippedArchive: false,
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            }),
            new winston.transports.Console({
                format: winston.format.printf(
                    info => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${info.level.toUpperCase()}] - ${info.message}`)
            })
        ]
    }),
    handler: winston.createLogger({
        level: 'error',
        transports: [
            new winston.transports.DailyRotateFile({
                filename: 'log/YISF_%DATE%_err.log',
                zippedArchive: false,
                format: winston.format.printf(
                    error => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${error.level.toUpperCase()}] - ${error.message}`)
            }),
            new winston.transports.Console({
                format: winston.format.printf(
                    error => `${new Date().toFormat('YYYY-MM-DD HH24:MI:SS')} [${error.level.toUpperCase()}] - ${error.message}`)
            })
        ]
    })
};

const logHandler = (req, type, data, err) => {
    const currentURL = req.protocol+'://' + req.get('host') + req.originalUrl;
    switch (type) {
        case 'login':
            logger.login.info(req.headers["x-forwarded-for"] + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
            LogModel.create({
                ip: req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : req.connection.remoteAddress.slice(7),
                referer: req.headers["referer"] ? req.headers["referer"] : false,
                nickname: req.user.nickname,
                type: 'login'
            });
            break;
        case 'download':
            logger.download.info(req.headers["x-forwarded-for"] + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
            LogModel.create({
                ip: req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : req.connection.remoteAddress.slice(7),
                referer: req.headers["referer"] ? req.headers["referer"] : false,
                nickname: req.user.nickname,
                pid: req.params.pid,
                fid: req.params.fid,
                type: 'download'
            });
            break;
        case 'flag':
            logger.flag_submit.info(req.headers["x-forwarded-for"] + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
            LogModel.create({
                ip: req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : req.connection.remoteAddress.slice(7),
                referer: req.headers["referer"] ? req.headers["referer"] : false,
                nickname: req.user.nickname,
                pid: req.params.pid,
                flag: req.body.flag,
                type: 'flag'
            })
            break;
        case 'error':
            logger.handler.error(req.headers["x-forwarded-for"] + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
            LogModel.create({
                ip: req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : req.connection.remoteAddress.slice(7),
                referer: req.headers["referer"] ? req.headers["referer"] : false,
                nickname: req.user.nickname,
                payload: err.message,
                type: 'error'
            })
            break;
        case 'error-flag':
            logger.handler.error(req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : req.connection.remoteAddress.toString().slice(7) + ' ' + req.headers["user-agent"] + ' referer: ' + req.headers["referer"] + ' url: ' + currentURL + data);
            LogModel.create({
                ip: req.headers["x-forwarded-for"] ? req.headers["x-forwarded-for"] : req.connection.remoteAddress.slice(7),
                referer: req.headers["referer"] ? req.headers["referer"] : false,
                nickname: req.user.nickname,
                flag: req.body.flag,
                pid: req.params.pid,
                type: 'error-flag'
            })
            break;
    }
}

module.exports = logHandler;