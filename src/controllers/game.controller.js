const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const walletService = require('../services/wallet.service');
const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  user: {
    getBalance: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const userGame = await db.user_game.findOne({
          where: {
            userId,
          },
        });

        res.json({
          data: {
            balance: userGame?.totalScore || 0,
          },
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    getPlayCount: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const wallet = await db.wallet.findOne({
          where: {
            userId,
          },
          attributes: ['id', 'ticket'],
        });

        res.json({
          data: {
            playCount: wallet.ticket,
          },
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    getLeaderboard: async (req, res) => {
      try {
        const data = await db.user_game.findAll({
          attributes: ['totalScore', 'userId'],
          order: [['totalScore', 'DESC']],
          limit: 10,
          include: [{
            model: db.user,
            attributes: ['telegramId', 'username', 'firstName', 'lastName', 'avatar'],
          }],
        });

        res.json({
          data,
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    getHistory: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const {
          page,
          limit,
        } = req.query;

        const condition = {
          userId,
        };

        const ordering = [['createdAt', 'DESC']];

        const pageNo = parseInt(page, 10) || 1;
        const limitPerPage = parseInt(limit, 10) || 10;

        const queryOptions = {
          where: condition,
          distinct: true,
          order: ordering,
          attributes: ['createdAt', 'score'],
        };

        if (limitPerPage !== -1) {
          const effectiveLimit = limitPerPage;
          const offset = (pageNo - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        const data = await db.game_session.findAndCountAll(queryOptions);

        const { count, rows } = data;
        const totalPages = limitPerPage === -1 ? 1 : Math.ceil(count / limitPerPage);

        res.json({
          totalItems: count,
          totalPages,
          currentPage: pageNo,
          data: rows,
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    startGame: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const userGame = await db.user_game.findOne({
          where: {
            userId,
          },
        });

        if (!userGame) {
          res.status(404).send({
            message: 'User Game Data not found',
          });
          return;
        }

        const wallet = await db.wallet.findOne({
          where: {
            userId,
          },
          attributes: ['id', 'ticket'],
        });

        if (wallet.ticket <= 0) {
          res.status(400).send({
            message: 'No tickets available',
          });
          return;
        }

        const sessionHash = crypto.createHash('md5').update(uuidv4()).digest('hex');

        const headersString = `${userId}${sessionHash}${req.headers['user-agent']}${req.headers['sec-ch-ua']}${req.headers['sec-ch-ua-mobile']}${req.headers['sec-ch-ua-platform']}${req.headers.host}${req.headers.origin}${req.headers['sec-fetch-site']}${req.headers['sec-fetch-mode']}${req.headers['sec-fetch-dest']}${req.headers['accept-encoding']}${req.headers['accept-language']}`;
        const sessionSecret = crypto.createHash('md5').update(headersString).digest('hex');

        // Update tickets
        wallet.ticket -= 1;
        await wallet.save();

        // Update user game
        userGame.session = sessionHash;
        userGame.sessionSecret = sessionSecret;
        await userGame.save();

        res.json({
          data: {
            remainPlayCount: wallet.ticket,
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
    submitScore: async (req, res) => {
      try {
        const { id: userId } = req.user;
        const { score, session } = req.body;

        console.log(score);

        const userGame = await db.user_game.findOne({
          where: {
            userId,
          },
        });

        if (!userGame) {
          res.status(404).send({
            message: 'User Game Data not found',
          });
          return;
        }

        const gameSession = await db.game_session.findOne({
          where: {
            session,
          },
        });

        const headersString = `${userId}${session}${req.headers['user-agent']}${req.headers['sec-ch-ua']}${req.headers['sec-ch-ua-mobile']}${req.headers['sec-ch-ua-platform']}${req.headers.host}${req.headers.origin}${req.headers['sec-fetch-site']}${req.headers['sec-fetch-mode']}${req.headers['sec-fetch-dest']}${req.headers['accept-encoding']}${req.headers['accept-language']}`;
        const sessionSecret = crypto.createHash('md5').update(headersString).digest('hex');

        if (userGame.session !== session || userGame.sessionSecret !== sessionSecret || gameSession) {
          res.status(400).send({
            message: 'Game Session is not valid',
          });
          return;
        }

        await db.game_session.create({
          userId,
          score,
          session,
        });

        userGame.totalScore += score;
        await userGame.save();

        if (score && score > 0) {
          await walletService.put(userId, score, 'coin', 'Game Reward - Played');
        }

        res.json({
          data: {
            session,
            totalScore: userGame?.totalScore || 0,
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
