const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  user: {
    developerRequest: async (req, res) => {
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

        if (user.userGroupId !== 1) {
          res.status(400).send({
            message: 'Your account is not eligible to be upgraded to a developer account',
          });
          return;
        }

        await user.update({
          userGroupId: 2,
        });

        res.json({
          data: true,
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
