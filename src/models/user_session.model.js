module.exports = function (sequelize, Sequelize) {
  return sequelize.define('user_session', {
    session: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
  }, {
    paranoid: false,
  });
};
