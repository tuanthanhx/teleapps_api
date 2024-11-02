module.exports = function (sequelize, Sequelize) {
  return sequelize.define('task', {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    rewards: {
      type: Sequelize.JSON, // { ticket, coin, usdt, ton, etc. }
    },
    type: {
      type: Sequelize.STRING, // Link, Share, Try App, etc.
      allowNull: false,
    },
    repeatInterval: {
      type: Sequelize.INTEGER,
    },
    repeatUnit: {
      type: Sequelize.ENUM('minute', 'hour', 'day', 'week', 'month', 'year'),
    },
    data: {
      type: Sequelize.JSON, // { url, etc. }
    },
    status: {
      type: Sequelize.INTEGER,
    },
    order: {
      type: Sequelize.INTEGER,
    },
  }, {
    paranoid: false,
    initialAutoIncrement: 100,
  });
};
