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
            { name: { [Op.like]: `%${keyword}%` } },
          ];
        }

        let ordering = [['createdAt', 'ASC']];

        if (sortField && sortOrder) {
          const validSortFields = ['id', 'name', 'status', 'createdAt'];
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
        };

        if (limitPerPage !== -1) {
          const effectiveLimit = limitPerPage;
          const offset = (pageNo - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        const data = await db.slider.findAndCountAll(queryOptions);

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
    show: async (req, res) => {
      try {
        const { id } = req.params;

        const slider = await db.slider.findOne({
          where: {
            id,
            status: 1,
          },
          include: [{
            model: db.slider_item,
            as: 'items',
            order: [['order', 'asc']],
            include: [{
              model: db.app,
              attributes: ['id', 'slug', 'title', 'subTitle', 'image', 'cover', 'createdAt', 'updatedAt'],
              required: false,
              where: {
                status: 1,
              },
            }],
          }],
        });

        if (!slider) {
          res.status(404).json({
            message: 'Slider not found',
          });
          return;
        }

        const sliderObj = slider.toJSON();
        const formattedSlider = await Promise.all(
          sliderObj.items?.map(async (item) => {
            if (item.app) {
              const reviewStatistics = await appService.getReviewStatistics(item.app.id);
              if (reviewStatistics) {
                item.app.totalReviews = reviewStatistics.totalReviews;
                item.app.averageRating = reviewStatistics.averageRating;
                item.app.reviewsCount = reviewStatistics.reviewsCount;
              }
            }
            return item;
          }),
        );

        res.json({
          data: formattedSlider,
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
    index: async (req, res) => module.exports.common.index(req, res),
    show: async (req, res) => module.exports.common.show(req, res),
  },
};
