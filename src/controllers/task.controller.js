// const crypto = require('crypto');
// const { v4: uuidv4 } = require('uuid');
const dayjs = require('dayjs');
const walletService = require('../services/wallet.service');
const { tryParseJSON, getNextRepeatTime } = require('../utils/utils');
const logger = require('../utils/logger');
const db = require('../models');

const { Op } = db.Sequelize;

module.exports = {
  user: {
    index: async (req, res) => {
      try {
        const {
          taskCategoryId,
        } = req.query;

        const condition = {
          status: 1,
        };

        if (taskCategoryId) {
          condition.taskCategoryId = taskCategoryId;
        }

        const tasks = await db.task.findAll({
          where: condition,
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
    finish: async (req, res) => {
      try {
        const { id } = req.params;
        const { id: userId } = req.user;
        const { data } = req.body;

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

        const { repeatInterval, repeatUnit } = task;

        const latestUserTask = await db.user_task.findOne({
          where: {
            userId,
            taskId: task.id,
          },
          order: [['id', 'DESC']],
        });

        if (latestUserTask) {
          if (!repeatInterval) {
            res.status(400).json({
              message: 'Cannot re-do this task',
            });
            return;
          }
          if (repeatInterval && repeatUnit) {
            const nextRepeatTime = getNextRepeatTime(latestUserTask.createdAt, repeatInterval, repeatUnit);
            const currentTime = dayjs();
            if (currentTime.isBefore(nextRepeatTime)) {
              res.status(400).json({
                message: 'Cannot re-do this task until the next repeat time',
                currentTime,
                nextTime: nextRepeatTime,
              });
              return;
            }
          }
        }

        if (task.type === 'play_game') {
          const taskData = tryParseJSON(task.data);
          const { count: requiredCount } = taskData;

          const gameCount = await db.game_session.count({
            where: {
              userId,
              ...(latestUserTask && {
                createdAt: {
                  [Op.gt]: latestUserTask.createdAt,
                },
              }),
            },
          });
          if (gameCount < requiredCount) {
            res.status(400).json({
              message: 'The number of games played has not yet reached the minimum requirement',
              gameCount,
              requiredCount,
            });
            return;
          }
        }

        if (task.type === 'invite_friend') {
          const taskData = tryParseJSON(task.data);
          const { count: requiredCount } = taskData;

          const user = await db.user.findOne({
            where: {
              id: userId,
            },
          });

          const referralCount = await db.user.count({
            where: {
              referrerId: user.telegramId,
              ...(latestUserTask && {
                createdAt: {
                  [Op.gt]: latestUserTask.createdAt,
                },
              }),
            },
          });
          if (referralCount < requiredCount) {
            res.status(400).json({
              message: 'The number of invited referrals has not yet reached the minimum requirement',
              referralCount,
              requiredCount,
            });
            return;
          }
        }

        await db.user_task.create({
          userId,
          taskId: task.id,
          status: 2,
          data,
          claimedAt: new Date(),
        });

        const taskRewards = tryParseJSON(task.rewards);
        for (const [asset, amount] of Object.entries(taskRewards)) {
          if (amount && amount > 0) {
            await walletService.put(userId, amount, asset, `Task Reward - ${task.name}`);
          }
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

        // const sessionHash = crypto.createHash('md5').update(uuidv4()).digest('hex');

        // const headersString = `${userId}${sessionHash}${req.headers['user-agent']}${req.headers['sec-ch-ua']}${req.headers['sec-ch-ua-mobile']}${req.headers['sec-ch-ua-platform']}${req.headers.host}${req.headers.origin}${req.headers['sec-fetch-site']}${req.headers['sec-fetch-mode']}${req.headers['sec-fetch-dest']}${req.headers['accept-encoding']}${req.headers['accept-language']}`;
        // const sessionSecret = crypto.createHash('md5').update(headersString).digest('hex');

        const object = {
          // session: sessionHash,
          // sessionSecret,
          status: 1,
        };

        const [userTask, isCreated] = await db.user_task.findOrCreate({
          where: {
            userId,
            taskId: task.id,
          },
          order: [['id', 'DESC']],
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
          data: true,
          // data: {
          //   session: sessionHash,
          // },
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
        // const { data, session } = req.body;
        const { data } = req.body;

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
            // session,
          },
        });

        if (!userTask) {
          res.status(404).send({
            message: 'User Task not found or not available to be submitted',
          });
          return;
        }

        // const headersString = `${userId}${session}${req.headers['user-agent']}${req.headers['sec-ch-ua']}${req.headers['sec-ch-ua-mobile']}${req.headers['sec-ch-ua-platform']}${req.headers.host}${req.headers.origin}${req.headers['sec-fetch-site']}${req.headers['sec-fetch-mode']}${req.headers['sec-fetch-dest']}${req.headers['accept-encoding']}${req.headers['accept-language']}`;
        // const sessionSecret = crypto.createHash('md5').update(headersString).digest('hex');

        // if (userTask.session !== session || userTask.sessionSecret !== sessionSecret) {
        //   res.status(400).send({
        //     message: 'Use Task Session is not valid',
        //   });
        //   return;
        // }

        // TODO: Verify data if needed

        await userTask.update({
          status: 2,
          data,
        });

        res.json({
          data: true,
          // data: {
          //   message: 'User Task submitted successfully',
          // },
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
          order: [['id', 'DESC']],
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

        const taskRewards = tryParseJSON(task.rewards);
        for (const [asset, amount] of Object.entries(taskRewards)) {
          if (amount && amount > 0) {
            await walletService.put(userId, amount, asset, `Task Reward - ${task.name}`);
          }
        }

        res.json({
          data: true,
          // data: {
          //   message: 'User Task claimed successfully',
          // },
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
