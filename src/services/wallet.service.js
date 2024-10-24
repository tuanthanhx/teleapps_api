const crypto = require('crypto');
const logger = require('../utils/logger');
const db = require('../models');

require('dotenv').config();

exports.createWallet = async (userId) => {
  try {
    if (!userId) {
      logger.error('userId is required');
      return false;
    }

    const object = {
      address: `0x${crypto.createHash('md5').update(userId).digest('hex')}`,
      ticket: 0,
      coin: 0,
      usdt: 0,
      ton: 0,
    };

    const [wallet, createdWallet] = await db.wallet.findOrCreate({
      where: {
        userId,
      },
      defaults: object,
    });

    return wallet || createdWallet;
  } catch (err) {
    logger.error(err);
    return false;
  }
};
