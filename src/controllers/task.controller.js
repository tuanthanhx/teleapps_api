const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const walletService = require('../services/wallet.service');
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
            message: 'User Task is completed already',
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
    submit: async (req, res) => {
      try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const { data, session } = req.body;

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

        const userTask = await db.user_task.findOne({
          where: {
            userId,
            taskId: task.id,
            status: 1,
            session,
          },
        });

        if (!userTask) {
          res.status(404).send({
            message: 'User Task not found or not available to be submitted',
          });
          return;
        }

        const headersString = `${userId}${session}${req.headers['user-agent']}${req.headers['sec-ch-ua']}${req.headers['sec-ch-ua-mobile']}${req.headers['sec-ch-ua-platform']}${req.headers.host}${req.headers.origin}${req.headers['sec-fetch-site']}${req.headers['sec-fetch-mode']}${req.headers['sec-fetch-dest']}${req.headers['accept-encoding']}${req.headers['accept-language']}`;
        const sessionSecret = crypto.createHash('md5').update(headersString).digest('hex');

        if (userTask.session !== session || userTask.sessionSecret !== sessionSecret) {
          res.status(400).send({
            message: 'Use Task Session is not valid',
          });
          return;
        }

        // TODO: Verify data if needed

        await userTask.update({
          status: 2,
          data,
        });

        res.json({
          data: {
            message: 'User Task submitted successfully',
          },
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    claim: async (req, res) => {
      try {
        const { id } = req.params;
        const { id: userId } = req.user;

        const task = await db.task.findOne({
          where: {
            id,
          },
        });

        if (!task) {
          res.status(404).json({
            message: 'Task not found',
          });
          return;
        }

        const userTask = await db.user_task.findOne({
          where: {
            userId,
            taskId: task.id,
            status: 2,
            claimedAt: null,
          },
        });

        if (!userTask) {
          res.status(404).send({
            message: 'User Task not found or not available to be claimed',
          });
          return;
        }

        await userTask.update({
          claimedAt: new Date(),
        });

        await walletService.put(userId, userTask.points, 'coin', `Task Reward - ${task.name}`);

        res.json({
          data: {
            message: 'User Task claimed successfully',
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
