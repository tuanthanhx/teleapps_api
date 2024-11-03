module.exports = function (sequelize, Sequelize) {
  return sequelize.define('user_game', {
    totalScore: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    session: {
      type: Sequelize.STRING,
    },
    sessionSecret: {
      type: Sequelize.STRING,
    },
  }, {
    paranoid: false,
  });
};
