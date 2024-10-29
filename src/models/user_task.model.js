module.exports = function (sequelize, Sequelize) {
  return sequelize.define('user_task', {
    userId: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    taskId: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      allowNull: false,
    },
    points: {
      type: Sequelize.DECIMAL(30, 8),
      defaultValue: 0.00000000,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    data: {
      type: Sequelize.JSON,
    },
    session: {
      type: Sequelize.STRING,
    },
    sessionSecret: {
      type: Sequelize.STRING,
    },
    claimedAt: {
      type: Sequelize.DATE,
    },
  }, {
    paranoid: false,
  });
};
