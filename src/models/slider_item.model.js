module.exports = function (sequelize, Sequelize) {
  return sequelize.define('slider_item', {
    title: {
      type: Sequelize.STRING,
    },
    subTitle: {
      type: Sequelize.STRING,
    },
    label: {
      type: Sequelize.STRING,
    },
    order: {
      type: Sequelize.INTEGER,
    },
  }, {
    paranoid: false,
  });
};
