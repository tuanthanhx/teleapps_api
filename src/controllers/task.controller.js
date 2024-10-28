const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  user: {
    index: async (req, res) => {
      try {
        const tasks = await db.task.findAll({
          where: {
            status: 1,
          },
          order: [['order', 'ASC']],
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
    show: async (req, res) => {
      try {
        const { id } = req.params;

        const task = await db.task.findOne({
          where: {
            id,
            status: 1,
          },
        });

        if (!task) {
          res.status(404).json({
            message: 'Task not found',
          });
          return;
        }

        res.json({
          data: task,
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
