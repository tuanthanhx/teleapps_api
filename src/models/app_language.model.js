module.exports = function (sequelize, Sequelize) {
  return sequelize.define('app_language', {
    id: {
      type: Sequelize.STRING(2),
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.STRING,
    },
  }, {
    paranoid: false,
  });
};
