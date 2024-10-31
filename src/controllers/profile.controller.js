const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  user: {
    getProfile: async (req, res) => {
      try {
        const { id } = req.user;

        const user = await db.user.findOne({
          where: {
            id,
          },
        });

        if (!user) {
          res.status(404).send({
            message: 'User not found',
          });
          return;
        }

        res.json({
          data: user,
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    updateProfile: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const {
          username,
          firstName,
          lastName,
          email,
          phone,
          avatar,
          gender,
          dob,
        } = req.body;

        const me = await db.user.findByPk(userId);
        if (!me) {
          res.status(404).send({
            message: 'User not found',
          });
          return;
        }

        const object = {};

        if (username) {
          const duplicateUsername = await db.user.findOne({
            where: {
              username,
              id: { [db.Sequelize.Op.ne]: userId },
            },
          });

          if (duplicateUsername) {
            res.status(409).send({
              message: 'Username already in use by another user',
            });
            return;
          }

          object.username = username;
        }

        if (email) {
          const duplicateEmail = await db.user.findOne({
            where: {
              email,
              id: { [db.Sequelize.Op.ne]: userId },
            },
          });

          if (duplicateEmail) {
            res.status(409).send({
              message: 'Email already in use by another user',
            });
            return;
          }

          object.email = email;
        }

        if (phone) {
          const duplicatePhone = await db.user.findOne({
            where: {
              phone,
              id: { [db.Sequelize.Op.ne]: userId },
            },
          });

          if (duplicatePhone) {
            res.status(409).send({
              message: 'Phone already in use by another user',
            });
            return;
          }

          object.phone = phone;
        }

        if (typeof firstName !== 'undefined') {
          object.firstName = firstName;
        }

        if (typeof lastName !== 'undefined') {
          object.lastName = lastName;
        }

        if (typeof avatar !== 'undefined') {
          object.avatar = avatar;
        }

        if (gender) {
          object.gender = gender;
        }

        if (dob) {
          object.dob = dob;
        }

        await me.update(object);

        res.json({
          data: {
            message: 'Profile updated successfully',
          },
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
  },
  admin: {
    // index: async (req, res) => module.exports.common.index(req, res),
    // show: async (req, res) => module.exports.common.show(req, res),
  },
};
