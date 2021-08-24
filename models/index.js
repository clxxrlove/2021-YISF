'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.User = require('./user')(sequelize, Sequelize); // pk 정의
db.Chall = require('./chall')(sequelize, Sequelize);
db.Notice = require('./notice')(sequelize, Sequelize);
db.Filedata = require('./filedata')(sequelize, Sequelize);
db.Score = require('./score')(sequelize, Sequelize);
db.Solver = require('./solver')(sequelize, Sequelize);
db.Comment = require('./comment')(sequelize, Sequelize);
db.Log = require('./log')(sequelize, Sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User.hasMany(db.Solver, { foreignKey: 'uid', sourceKey: 'uid' });
db.User.hasOne(db.Score, { foreignKey: 'uid', sourceKey: 'uid'});
db.Chall.hasMany(db.Solver, { foreignKey: 'pid', sourceKey: 'pid' });
db.Chall.hasMany(db.Filedata, { foreignKey: 'pid', sourceKey: 'pid' })
db.Chall.hasMany(db.Comment, { foreignKey: 'pid', sourceKey: 'pid' })
db.Solver.belongsTo(db.User, { foreignKey: 'uid', sourceKey: 'uid' });
db.Solver.belongsTo(db.Chall, { foreignKey: 'pid', sourceKey: 'pid' });
db.Score.belongsTo(db.User, { foreignKey: 'uid', sourceKey: 'uid' });
db.Filedata.belongsTo(db.Chall, { foreignKey: 'pid', sourceKey: 'pid' });
db.Comment.belongsTo(db.Chall, { foreignKey: 'pid', sourceKey: 'pid' });

module.exports = db;
