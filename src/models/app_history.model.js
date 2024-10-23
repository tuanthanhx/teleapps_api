module.exports = function (sequelize, Sequelize) {
  return sequelize.define('app_history', {
    version: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
  }, {
    paranoid: false,
  });
};
