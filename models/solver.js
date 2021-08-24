'use strict';

module.exports = (sequelize, DataTypes) => {
    const Solver = sequelize.define('solver', {
        sid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        /*pid: { // pk
            type: DataTypes.INTEGER,
            allowNull: false,
        },*/
        /*uid: { // pk
            type: DataTypes.INTEGER,
            allowNull: false,
        },*/
        // score: {
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        solvedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    }, {
        tableName: 'solver',
        //sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Solver.associate = (db) => {};
    return Solver;
};