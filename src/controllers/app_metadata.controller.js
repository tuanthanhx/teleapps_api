const { APP_PLATFORMS } = require('../constants/app_platform.constants');
const { APP_SNS } = require('../constants/app_sns.constants');
const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  common: {
    index: async (req, res) => {
      try {
        const languages = await db.app_language.findAll({
          order: [['id', 'ASC']],
          attributes: ['id', 'name'],
        });

        res.json({
          data: {
            languages,
            platforms: APP_PLATFORMS,
            sns: APP_SNS,
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
    index: async (req, res) => module.exports.common.index(req, res),
  },
  developer: {
    index: async (req, res) => module.exports.common.index(req, res),
  },
};
