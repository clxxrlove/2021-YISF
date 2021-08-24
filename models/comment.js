'use strict';

module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define('filedata', {
        cid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        }
    }, {
        tableName: 'comment',
        //sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Comment.associate = (db) => {};
    return Comment;
};
