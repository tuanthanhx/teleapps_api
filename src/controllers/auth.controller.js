const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const logger = require('../utils/logger');
const { validateTelegramInitData, calculateInvitationReward } = require('../utils/auth');
const { generateRandomNumber } = require('../utils/utils');
const db = require('../models');

const accessTokenSecret = process.env.JWT_ACCESS_SECRET;
const refreshTokenSecret = process.env.JWT_REFRESH_SECRET;

module.exports = {
  common: {
    isLogin: async (req, res) => {
      try {
        if (req.user) {
          res.json({
            data: req.user,
          });
          return;
        }
        res.status(401).send({
          message: 'You are not logged in',
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    findMe: async (req, res) => {
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
    loginByTelegram: async (req, res) => {
      try {
        const { initData, referrerId } = req.body;

        const validatedData = validateTelegramInitData(initData);

        if (!validatedData) {
          res.status(403).json({
            message: 'Invalid or tampered data',
          });
          return;
        }

        if (validatedData.user.is_bot) {
          res.status(403).json({
            message: 'Bot is not allowed',
          });
          return;
        }

        const tmpPassword = generateRandomNumber(6);

        const object = {
          password: tmpPassword,
          firstName: validatedData.user.first_name,
          lastName: validatedData.user.last_name,
          username: validatedData.user.username,
          userGroupId: 1,
          referrerId,
        };

        const referrer = referrerId ? await db.user.findOne({ where: { telegramId: referrerId } }) : null;
        if (referrer) {
          object.referrerId = referrerId;
        }

        const [user, createdUser] = await db.user.findOrCreate({
          where: {
            telegramId: validatedData.user.id,
          },
          defaults: object,
        });

        if (createdUser) {
          // await walletService.createWallet(createdUser.id, 1);
          if (referrer) {
            let inviteCount = await db.user.count({ where: { referrerId } });
            inviteCount++;
            const invitationReward = calculateInvitationReward(inviteCount);
            if (invitationReward) {
              // console.log(invitationReward);
              // TODO: Add reward to wallet balance + write transaction logs
              // invitationReward.tonReward
              // invitationReward.coinReward
            }
          }
        }

        const userData = user || createdUser;

        const userIdentity = {
          id: userData.id,
          userGroupId: userData.userGroupId,
        };
        const accessToken = jwt.sign(userIdentity, accessTokenSecret, { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m' });
        const refreshToken = jwt.sign(userIdentity, refreshTokenSecret, { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d' });

        const [token, createdToken] = await db.user_refresh_token.findOrCreate({
          where: { userId: userData.id },
          defaults: { token: refreshToken },
        });

        if (!createdToken) {
          await token.update({ token: refreshToken });
        }

        res.json({
          data: { accessToken, refreshToken },
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    loginBySession: async (req, res) => {
      try {
        const { session } = req.body;

        const foundSession = await db.user_session.findOne({ where: { session } });

        if (!foundSession) {
          res.status(400).send({ error: 'Session is invalid' });
          return;
        }

        const sessionAgeInMilliseconds = new Date() - new Date(foundSession.updatedAt);
        const oneDayInMilliseconds = 24 * 60 * 60 * 1000; // 1 day in milliseconds

        if (sessionAgeInMilliseconds > oneDayInMilliseconds) {
          await foundSession.destroy();
          res.status(400).send({ error: 'Session has expired' });
          return;
        }

        const userData = await db.user.findOne({
          where: {
            id: foundSession.userId,
          },
        });

        if (!userData) {
          res.status(400).send({ error: 'User not found' });
          return;
        }

        await foundSession.destroy();

        const userIdentity = {
          id: userData.id,
          userGroupId: userData.userGroupId,
        };
        const accessToken = jwt.sign(userIdentity, accessTokenSecret, { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m' });
        const refreshToken = jwt.sign(userIdentity, refreshTokenSecret, { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d' });

        const [token, createdToken] = await db.user_refresh_token.findOrCreate({
          where: { userId: userData.id },
          defaults: { token: refreshToken },
        });

        if (!createdToken) {
          await token.update({ token: refreshToken });
        }

        res.json({
          data: { accessToken, refreshToken },
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    generateSession: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const sessionHash = crypto.createHash('md5').update(uuidv4()).digest('hex');

        const object = {
          session: sessionHash,
        };

        const [session, createdSession] = await db.user_session.findOrCreate({
          where: { userId },
          defaults: object,
        });

        if (session) {
          await session.update(object);
        }

        res.json({
          data: session?.session || createdSession?.session,
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
