const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
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

        if (userGame.playCount <= 0) {
          res.status(400).send({
            message: 'No play counts available',
          });
          return;
        }

        const sessionHash = crypto.createHash('md5').update(uuidv4()).digest('hex');

        const headersString = `${userId}${sessionHash}${req.headers['user-agent']}${req.headers['sec-ch-ua']}${req.headers['sec-ch-ua-mobile']}${req.headers['sec-ch-ua-platform']}${req.headers.host}${req.headers.origin}${req.headers['sec-fetch-site']}${req.headers['sec-fetch-mode']}${req.headers['sec-fetch-dest']}${req.headers['accept-encoding']}${req.headers['accept-language']}`;
        const sessionSecret = crypto.createHash('md5').update(headersString).digest('hex');

        userGame.playCount -= 1;
        userGame.session = sessionHash;
        userGame.sessionSecret = sessionSecret;
        await userGame.save();

        res.json({
          data: {
            remainPlayCount: userGame.playCount,
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
