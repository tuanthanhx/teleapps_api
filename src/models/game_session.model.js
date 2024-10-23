module.exports = function (sequelize, Sequelize) {
  return sequelize.define('game_session', {
    score: {
      type: Sequelize.INTEGER,
    },
    session: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    paranoid: false,
  });
};
