const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');
const process = require('process');
const dbConfigs = require('../config/config.json');

const env = process.env.NODE_ENV || 'development';
const dbConfig = dbConfigs[env];

const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  logging: false, // env === 'development' ? console.log : false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

fs
  .readdirSync(__dirname)
  .filter((file) => (file.endsWith('.model.js')))
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.user.hasMany(db.app);
db.app.belongsTo(db.user);

db.saved_app.belongsTo(db.user);
db.saved_app.belongsTo(db.app);

db.user.hasMany(db.user_refresh_token, { onDelete: 'CASCADE' });
db.user_refresh_token.belongsTo(db.user);

db.user.hasMany(db.user_session, { onDelete: 'CASCADE' });
db.user_session.belongsTo(db.user);

db.user.hasOne(db.wallet, { onDelete: 'CASCADE' });
db.wallet.belongsTo(db.user);

db.user.hasOne(db.connected_wallet, { onDelete: 'CASCADE' });
db.connected_wallet.belongsTo(db.user);

db.wallet.hasMany(db.wallet_log, { onDelete: 'CASCADE' });
db.wallet_log.belongsTo(db.wallet);

db.app.belongsTo(db.app_category, { as: 'category', foreignKey: 'appCategoryId' });
db.app_category.hasMany(db.app);

db.app.hasMany(db.app_history, { as: 'histories', onDelete: 'CASCADE' });
db.app_history.belongsTo(db.app);

db.app.hasMany(db.app_review, { onDelete: 'CASCADE' });
db.app_review.belongsTo(db.app);

db.user.hasMany(db.app_review);
db.app_review.belongsTo(db.user);

db.slider.hasMany(db.slider_item, { as: 'items', onDelete: 'CASCADE' });
db.slider_item.belongsTo(db.slider);
db.slider_item.belongsTo(db.app);

db.app_category.hasMany(db.app_category_slider_item, { as: 'sliderItems', onDelete: 'CASCADE' });
db.app_category_slider_item.belongsTo(db.app_category);
db.app_category_slider_item.belongsTo(db.app);

db.user.hasMany(db.game_session, { onDelete: 'CASCADE' });
db.game_session.belongsTo(db.user);

db.user.hasMany(db.user_game, { onDelete: 'CASCADE' });
db.user_game.belongsTo(db.user);

db.user_task.belongsTo(db.task);
db.user_task.belongsTo(db.user);

db.task.belongsTo(db.task_category, { as: 'category', foreignKey: 'taskCategoryId' });
db.task_category.hasMany(db.task);

db.Sequelize = Sequelize;
db.sequelize = sequelize;

module.exports = db;
