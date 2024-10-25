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
          attributes: ['id', 'ticket', 'coin', 'usdt', 'ton'],
        });

        let createdWallet;
        if (!wallet) {
          createdWallet = await walletService.createWallet(userId);
        }

        const data = wallet || createdWallet;

        res.json({
          id: data.id,
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
    getLogs: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const {
          page,
          limit,
          sortField,
          sortOrder = 'ASC',
        } = req.query;

        const wallet = await db.wallet.findOne({
          where: {
            userId,
          },
          attributes: ['id'],
        });

        if (!wallet) {
          res.status(404).send({
            message: 'Wallet not found',
          });
          return;
        }

        const condition = {
          walletId: wallet.id,
        };

        let ordering = [['createdAt', 'DESC']];

        if (sortField && sortOrder) {
          const validSortFields = ['amount', 'unit', 'message', 'createdAt'];
          const validSortOrder = ['asc', 'desc'];
          if (validSortFields.includes(sortField) && validSortOrder.includes(sortOrder.toLowerCase())) {
            ordering = [[sortField, sortOrder.toUpperCase()]];
          }
        }

        const pageNo = parseInt(page, 10) || 1;
        const limitPerPage = parseInt(limit, 10) || 10;

        const queryOptions = {
          where: condition,
          distinct: true,
          order: ordering,
          attributes: ['createdAt', 'amount', 'unit', 'message'],
        };

        if (limitPerPage !== -1) {
          const effectiveLimit = limitPerPage;
          const offset = (pageNo - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        const data = await db.wallet_log.findAndCountAll(queryOptions);

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
  },
  admin: {
    // index: async (req, res) => module.exports.common.index(req, res),
    // show: async (req, res) => module.exports.common.show(req, res),
  },
};
