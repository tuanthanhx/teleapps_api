module.exports = function (sequelize, Sequelize) {
  return sequelize.define('saved_app', {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    appId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, {
    paranoid: false,
  });
};
