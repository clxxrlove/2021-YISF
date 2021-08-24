'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
        await queryInterface.addColumn('log', 'payload', {
            type: Sequelize.STRING,
            allowNull: true
        })
        // await queryInterface.addColumn('comment', 'createdAt', {
        //     type: Sequelize.DATE,
        //     defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        // }),
        // await queryInterface.changeColumn('chall', 'score', {
        //   type: Sequelize.INTEGER,
        //   defaultValue: 1000
        // }),
        // await queryInterface.removeColumn('solver', 'score'),
        //   await queryInterface.changeColumn('score', 'id', {
        //     type: Sequelize.INTEGER,
        //     autoIncrement: true,
        //   }
        // )
        // await queryInterface.removeColumn('filedata', 'isThumbnail'),
        // await queryInterface.removeColumn('chall', 'solvedAt')
        // await queryInterface.changeColumn('user', 'password', {
        //   type: Sequelize.STRING(128),
        //   allowNull: false
        // }),
        //   await queryInterface.addColumn('user', 'isAdmin', {
        //   type: Sequelize.BOOLEAN,
        //   allowNull: false,
        //   defaultValue: false
        // }),
        // await queryInterface.addColumn('user', 'banUser', {
        //   type: Sequelize.BOOLEAN,
        //   allowNull: false,
        //   defaultValue: false
        // }),
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    /*return Promise.all([
        queryInterface.removeColumn('user', 'isAdmin'),
    ])*/
  }
};
