module.exports = function (sequelize, Sequelize) {
  return sequelize.define('user_game', {
    playCount: {
      type: Sequelize.INTEGER,
    },
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
