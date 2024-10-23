module.exports = function (sequelize, Sequelize) {
  return sequelize.define('app_review', {
    rate: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    message: {
      type: Sequelize.TEXT,
    },
  }, {
    paranoid: false,
  });
};
