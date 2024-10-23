const appService = require('../services/app');
const logger = require('../utils/logger');
const db = require('../models');

const { Op } = db.Sequelize;

module.exports = {
  common: {
    index: async (req, res) => {
      try {
        const {
          keyword,
          page,
          limit,
          sortField,
          sortOrder = 'ASC',
        } = req.query;

        const condition = {
          status: 1,
        };

        if (keyword) {
          condition[Op.or] = [
            { title: { [Op.like]: `%${keyword}%` } },
            { subTitle: { [Op.like]: `%${keyword}%` } },
          ];
        }

        let ordering = [['createdAt', 'ASC']];

        if (sortField && sortOrder) {
          const validSortFields = ['title', 'createdAt', 'updatedAt'];
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
          attributes: ['id', 'slug', 'title', 'subTitle', 'image', 'cover', 'createdAt', 'updatedAt'],
          include: [],
        };

        if (limitPerPage !== -1) {
          const effectiveLimit = limitPerPage;
          const offset = (pageNo - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        const data = await db.app.findAndCountAll(queryOptions);

        const { count, rows } = data;
        const totalPages = limitPerPage === -1 ? 1 : Math.ceil(count / limitPerPage);

        const formattedRows = await Promise.all(rows.map(async (row) => {
          const rowObj = row.toJSON();

          if (rowObj.categories && Array.isArray(rowObj.categories)) {
            rowObj.categories.forEach((category) => {
              delete category.app_category_map;
            });
          }

          const reviewStatistics = await appService.getReviewStatistics(row.id);
          if (reviewStatistics) {
            rowObj.totalReviews = reviewStatistics.totalReviews;
            rowObj.averageRating = reviewStatistics.averageRating;
            rowObj.reviewsCount = reviewStatistics.reviewsCount;
          }

          return rowObj;
        }));

        res.json({
          totalItems: count,
          totalPages,
          currentPage: pageNo,
          data: formattedRows,
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
  },
};
