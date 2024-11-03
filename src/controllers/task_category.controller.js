const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  user: {
    index: async (req, res) => {
      try {
        const tasks = await db.task_category.findAll({
          order: [['order', 'ASC']],
          attributes: ['id', 'name', 'description', 'order'],
        });

        res.json({
          data: tasks,
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
