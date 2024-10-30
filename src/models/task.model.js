module.exports = function (sequelize, Sequelize) {
  return sequelize.define('task', {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.STRING,
    },
    points: {
      type: Sequelize.DECIMAL(30, 8),
      defaultValue: 0.00000000,
    },
    type: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    data: {
      type: Sequelize.JSON,
    },
    isDaily: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    order: {
      type: Sequelize.INTEGER,
    },
  }, {
    paranoid: false,
  });
};
