module.exports = function (sequelize, Sequelize) {
  const bcrypt = require('bcrypt');
  const User = sequelize.define('user', {
    id: {
      type: Sequelize.STRING,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    username: {
      type: Sequelize.STRING,
      unique: true,
    },
    telegramId: {
      type: Sequelize.STRING,
      unique: true,
    },
    telegramPremium: {
      type: Sequelize.BOOLEAN,
    },
    userGroupId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    phone: {
      type: Sequelize.STRING,
    },
    avatar: {
      type: Sequelize.STRING,
    },
    gender: {
      type: Sequelize.INTEGER,
    },
    dob: {
      type: Sequelize.DATEONLY,
    },
    status: {
      type: Sequelize.INTEGER,
    },
    lastLogin: {
      type: Sequelize.DATE,
    },
    referrerId: {
      type: Sequelize.STRING,
    },
  }, {
    paranoid: false,
    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(8));
      },
      afterCreate: (user) => {
        delete user.dataValues.password;
      },
      afterUpdate: (user) => {
        delete user.dataValues.password;
      },
    },
  });

  User.prototype.generateHash = function (password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
  };

  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
