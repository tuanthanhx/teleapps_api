module.exports = function (sequelize, Sequelize) {
  return sequelize.define('wallet_log', {
    amount: {
      type: Sequelize.DECIMAL(30, 8),
      allowNull: false,
    },
    unit: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    message: {
      type: Sequelize.STRING,
    },
  }, {
    paranoid: false,
  });
};
