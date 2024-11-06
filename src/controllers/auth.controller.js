const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { v4: uuidv4 } = require('uuid');
const walletService = require('../services/wallet.service');
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
        const userId = req.user?.id;
        const user = await db.user.findOne({
          where: {
            id: userId,
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
        const { initData } = req.body;

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

        let referrerId = null;
        if (validatedData.start_param && validatedData.start_param.startsWith('ref_')) {
          referrerId = validatedData.start_param.replace('ref_', '').trim();
        }

        const tmpPassword = generateRandomNumber(6);

        const object = {
          password: tmpPassword,
          firstName: validatedData.user.first_name,
          lastName: validatedData.user.last_name,
          username: validatedData.user.username,
          telegramPremium: Boolean(validatedData.user.is_premium),
          userGroupId: 1,
          lastLogin: new Date(),
        };

        const referrer = referrerId ? await db.user.findOne({ where: { telegramId: referrerId } }) : null;
        if (referrer) {
          object.referrerId = referrerId;
        }

        const [user, isCreatedUser] = await db.user.findOrCreate({
          where: {
            telegramId: validatedData.user.id,
          },
          defaults: object,
        });

        const userIdentity = {
          id: user.id,
          userGroupId: user.userGroupId,
        };
        const accessToken = jwt.sign(userIdentity, accessTokenSecret, { expiresIn: process.env.JWT_ACCESS_EXPIRATION || '15m' });
        const refreshToken = jwt.sign(userIdentity, refreshTokenSecret, { expiresIn: process.env.JWT_REFRESH_EXPIRATION || '30d' });

        const [token, isCreatedRefreshToken] = await db.user_refresh_token.findOrCreate({
          where: { userId: user.id },
          defaults: { token: refreshToken },
        });

        if (!isCreatedRefreshToken) {
          await token.update({ token: refreshToken });
        }

        // Create Wallets
        await walletService.createWallet(user.id);

        // Create User Game
        await db.user_game.findOrCreate({
          where: {
            userId: user.id,
          },
        });

        if (isCreatedUser) {
          if (referrer) {
            let inviteCount = await db.user.count({ where: { referrerId } });
            inviteCount++;
            const invitationReward = calculateInvitationReward(inviteCount);
            if (invitationReward) {
              await walletService.put(user.id, 1000, 'coin', 'Registration Reward');

              const tonReward = validatedData.user.is_premium ? invitationReward.tonReward * 2 : invitationReward.tonReward;
              const coinReward = validatedData.user.is_premium ? invitationReward.coinReward * 2 : invitationReward.coinReward;
              const rewardDescription = validatedData.user.is_premium ? 'Invitation Reward (Premium)' : 'Invitation Reward';

              await walletService.put(referrer.id, tonReward, 'ton', rewardDescription);
              await walletService.put(referrer.id, coinReward, 'coin', rewardDescription);
            }
          }
        } else {
          const isPremium = Boolean(validatedData.user.is_premium);
          if (user.telegramPremium !== isPremium) {
            user.telegramPremium = isPremium;
          }
          user.lastLogin = new Date();
          await user.save();
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

        const [token, isCreated] = await db.user_refresh_token.findOrCreate({
          where: { userId: userData.id },
          defaults: { token: refreshToken },
        });

        if (!isCreated) {
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
        const userId = req.user?.id;

        const sessionHash = crypto.createHash('md5').update(uuidv4()).digest('hex');

        const object = {
          session: sessionHash,
        };

        const [session] = await db.user_session.findOrCreate({
          where: { userId },
          defaults: object,
        });

        if (session) {
          await session.update(object);
        }

        res.json({
          data: session?.session,
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
