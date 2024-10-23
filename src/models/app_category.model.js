module.exports = function (sequelize, Sequelize) {
  return sequelize.define('app_category', {
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
    },
    icon: {
      type: Sequelize.STRING,
    },
    subTitle: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    order: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  }, {
    paranoid: false,
    initialAutoIncrement: 100,
  });
};
