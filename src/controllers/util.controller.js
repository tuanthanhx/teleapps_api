const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  common: {
    validateNewAppTitle: async (req, res) => {
      try {
        const { title } = req.body;

        const normalizedTitle = title.replace(/\s+/g, '').toLowerCase();

        const exists = await db.app.findOne({
          where: db.Sequelize.where(
            db.Sequelize.fn(
              'REPLACE',
              db.Sequelize.fn('LOWER', db.Sequelize.col('title')),
              ' ',
              '',
            ),
            normalizedTitle,
          ),
          attributes: ['id'],
        });

        if (exists) {
          return res.status(400).json({
            message: 'This title or a similar one is already in use.',
          });
        }

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
};
