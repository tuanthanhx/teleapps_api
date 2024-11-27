const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  user: {
    getWallet: async (req, res) => {
      try {
        const userId = req.user?.id;

        const connectedWallet = await db.connected_wallet.findOne({
          where: {
            userId,
          },
        });

        res.json({
          data: connectedWallet,
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    setWallet: async (req, res) => {
      try {
        const userId = req.user?.id;

        const {
          address,
          chainId,
          provider,
          metadata,
        } = req.body;

        const connectedWallet = await db.connected_wallet.upsert(
          {
            userId,
            address: address ?? null,
            chainId: chainId ?? null,
            provider: provider ?? null,
            metadata: metadata ?? null,
          },
          {
            returning: true,
          },
        );

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              connectedWallet,
            },
          }),
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    removeWallet: async (req, res) => {
      try {
        const userId = req.user?.id;

        await db.connected_wallet.destroy({
          where: {
            userId,
          },
        });

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
  },
  admin: {
    // index: async (req, res) => module.exports.common.index(req, res),
    // show: async (req, res) => module.exports.common.show(req, res),
  },
};
