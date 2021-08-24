'use strict';

module.exports = (sequelize, DataTypes) => {
    const Filedata = sequelize.define('filedata', {
        fid: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        pid: { // pk
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        filename: {
            type: DataTypes.STRING(40),
            allowNull: false,
        },
        mimetype: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        // isThumbnail: {
        //     type: DataTypes.BOOLEAN,
        //     allowNull: false,
        //     defaultValue: false
        // },
        filepath: {
            type: DataTypes.STRING(40),
            allowNull: false,
            defaultValue: 'models/files/',
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    }, {
        tableName: 'filedata',
        //sequelize,
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });
    Filedata.associate = (db) => {};
    return Filedata;
};
