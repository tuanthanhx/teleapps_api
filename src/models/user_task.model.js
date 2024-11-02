module.exports = function (sequelize, Sequelize) {
  return sequelize.define('user_task', {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    taskId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    data: {
      type: Sequelize.JSON,
    },
    // session: {
    //   type: Sequelize.STRING,
    // },
    // sessionSecret: {
    //   type: Sequelize.STRING,
    // },
    claimedAt: {
      type: Sequelize.DATE,
    },
  }, {
    paranoid: false,
  });
};
