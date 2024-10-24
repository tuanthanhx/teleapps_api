const walletService = require('../services/wallet.service');
const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  user: {
    getWallets: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const wallet = await db.wallet.findOne({
          where: {
            userId,
          },
          attributes: ['address', 'ticket', 'coin', 'usdt', 'ton'],
        });

        let createdWallet;
        if (!wallet) {
          createdWallet = await walletService.createWallet(userId);
        }

        const data = wallet || createdWallet;

        res.json({
          address: data.address,
          ticket: data.ticket,
          coin: data.coin,
          usdt: data.usdt,
          ton: data.ton,
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
