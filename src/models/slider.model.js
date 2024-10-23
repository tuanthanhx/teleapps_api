module.exports = function (sequelize, Sequelize) {
  return sequelize.define('slider', {
    name: {
      type: Sequelize.STRING,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  }, {
    paranoid: false,
  });
};
