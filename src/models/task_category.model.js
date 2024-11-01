module.exports = function (sequelize, Sequelize) {
  return sequelize.define('task_category', {
    name: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    order: {
      type: Sequelize.INTEGER,
    },
  }, {
    paranoid: false,
  });
};
