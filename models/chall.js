'use strict';

module.exports = (sequelize, DataTypes) => {
    const Chall = sequelize.define('chall', {
        pid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        type: {
            type: DataTypes.STRING(9),
            allowNull: false,
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1000,
        },
        info: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        issuer: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        flag: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        // solvedAt: {
        //     type: DataTypes.DATE,
        //     allowNull: false,
        //     defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        // },
        active: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: 0,
        },
        views: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        },
        count: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 0
        }
    }, {
        tableName: 'chall',
        //sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Chall.associate = (db) => {};
    return Chall;
};