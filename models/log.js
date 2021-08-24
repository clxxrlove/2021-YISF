'use strict';

module.exports = (sequelize, DataTypes) => {
    const Log = sequelize.define('log', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        ip: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        referer: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        nickname: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        pid: {
            type: DataTypes.STRING,
            allowNull: true
        },
        fid: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        flag: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        payload: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    }, {
        tableName: 'log',
        //sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Log.associate = (db) => {};
    return Log;
};