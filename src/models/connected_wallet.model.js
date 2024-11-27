module.exports = function (sequelize, Sequelize) {
  return sequelize.define('connected_wallet', {
    userId: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    chainId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    provider: {
      type: Sequelize.STRING,
    },
    metadata: {
      type: Sequelize.JSON,
    },
  }, {
    paranoid: false,
  });
};
