'use strict';

module.exports = (sequelize, DataTypes) => {
    const Score = sequelize.define('score', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        solved: {
            type: DataTypes.TINYINT,
            allowNull: false,
            defaultValue: 0,
        },
        pscore: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        rank: {
            type: DataTypes.TINYINT.UNSIGNED,
            allowNull: true
        },
        solvedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    }, {
        tableName: 'score',
        //sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Score.associate = (db) => {};
    return Score;
}