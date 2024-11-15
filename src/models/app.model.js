module.exports = function (sequelize, Sequelize) {
  return sequelize.define('app', {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    slug: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    title: {
      type: Sequelize.STRING,
    },
    subTitle: {
      type: Sequelize.STRING,
    },
    description: {
      type: Sequelize.TEXT,
    },
    image: {
      type: Sequelize.STRING,
    },
    cover: {
      type: Sequelize.STRING,
    },
    screenshots: {
      type: Sequelize.JSON,
    },
    position: {
      type: Sequelize.INTEGER,
    },
    platforms: {
      type: Sequelize.JSON,
    },
    links: {
      type: Sequelize.JSON,
    },
    languageIds: {
      type: Sequelize.JSON,
    },
    status: {
      type: Sequelize.INTEGER,
    },
  }, {
    paranoid: false,
  });
};
