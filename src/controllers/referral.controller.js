const logger = require('../utils/logger');
const db = require('../models');

module.exports = {
  user: {
    getReferrals: async (req, res) => {
      try {
        const { id: userId } = req.user;

        const {
          page,
          limit,
          sortField,
          sortOrder = 'ASC',
        } = req.query;

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

        const condition = {
          referrerId: user.telegramId,
        };

        let ordering = [['createdAt', 'DESC']];

        if (sortField && sortOrder) {
          const validSortFields = ['id', 'username', 'telegramId', 'telegramPremium', 'userGroupId', 'firstName', 'lastName', 'email', 'phone', 'avatar', 'gender', 'dob', 'lastLogin', 'createdAt'];
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
          attributes: ['id', 'username', 'telegramId', 'telegramPremium', 'userGroupId', 'firstName', 'lastName', 'email', 'phone', 'avatar', 'gender', 'dob', 'lastLogin', 'createdAt'],
        };

        if (limitPerPage !== -1) {
          const effectiveLimit = limitPerPage;
          const offset = (pageNo - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        const data = await db.user.findAndCountAll(queryOptions);

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
