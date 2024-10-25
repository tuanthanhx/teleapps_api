const crypto = require('crypto');
const { v4: isUUIDV4 } = require('uuid');
const logger = require('../utils/logger');
const db = require('../models');

require('dotenv').config();

exports.createWallet = async (userId) => {
  try {
    if (!userId) {
      logger.error('userId is required');
      throw new Error('userId is required');
    }

    const object = {
      id: `0x${crypto.createHash('md5').update(userId).digest('hex')}`,
      ticket: 0,
      coin: 0,
      usdt: 0,
      ton: 0,
    };

    const [wallet] = await db.wallet.findOrCreate({
      where: {
        userId,
      },
      defaults: object,
    });

    return wallet;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

exports.put = async (to, amount, unit, message = null) => {
  try {
    let wallet;
    if (isUUIDV4(to)) {
      wallet = await db.wallet.findOne({ where: { userId: to } });
    } else if (to.length === '34') {
      wallet = await db.wallet.findOne({ where: { id: to } });
    } else {
      throw new Error('Invalid wallet identifier');
    }

    if (!wallet) {
      throw new Error('Wallet not found');
    }

    if (!['ticket', 'coin', 'usdt', 'ton'].includes(unit)) {
      throw new Error('Invalid unit');
    }

    const plainAmount = parseFloat(amount);
    await wallet.increment(unit, { by: plainAmount });
    const walletLog = await db.wallet_log.create({
      amount: plainAmount,
      unit,
      message: message.trim(),
      walletId: wallet.id,
    });
    return walletLog;
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
