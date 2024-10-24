module.exports = function (sequelize, Sequelize) {
  return sequelize.define('wallet', {
    address: {
      type: Sequelize.STRING(36),
      unique: true,
      allowNull: false,
    },
    ticket: {
      type: Sequelize.DECIMAL(30, 8),
      defaultValue: 0.00000000,
    },
    coin: {
      type: Sequelize.DECIMAL(30, 8),
      defaultValue: 0.00000000,
    },
    usdt: {
      type: Sequelize.DECIMAL(30, 8),
      defaultValue: 0.00000000,
    },
    ton: {
      type: Sequelize.DECIMAL(30, 8),
      defaultValue: 0.00000000,
    },
  }, {
    paranoid: false,
  });
};
