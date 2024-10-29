const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
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
    start: async (req, res) => {
      try {
        const { id: userId } = req.user;
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

        const sessionHash = crypto.createHash('md5').update(uuidv4()).digest('hex');

        const headersString = `${userId}${sessionHash}${req.headers['user-agent']}${req.headers['sec-ch-ua']}${req.headers['sec-ch-ua-mobile']}${req.headers['sec-ch-ua-platform']}${req.headers.host}${req.headers.origin}${req.headers['sec-fetch-site']}${req.headers['sec-fetch-mode']}${req.headers['sec-fetch-dest']}${req.headers['accept-encoding']}${req.headers['accept-language']}`;
        const sessionSecret = crypto.createHash('md5').update(headersString).digest('hex');

        const object = {
          session: sessionHash,
          sessionSecret,
          status: 1,
          points: task.points,
        };

        const [userTask, isCreated] = await db.user_task.findOrCreate({
          where: {
            userId,
            taskId: task.id,
          },
          defaults: object,
        });

        if (userTask.status !== 1) {
          res.status(400).send({
            message: 'This task is completed already',
          });
          return;
        }

        if (!isCreated) {
          await userTask.update(object);
        }

        res.json({
          data: {
            session: sessionHash,
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
