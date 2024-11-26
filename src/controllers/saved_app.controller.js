const appService = require('../services/app.service');
const logger = require('../utils/logger');
const db = require('../models');

const { Op } = db.Sequelize;

module.exports = {
  user: {
    index: async (req, res) => {
      try {
        const userId = req.user?.id;

        const {
          keyword,
          categoryId,
          categorySlug,
          page,
          limit,
          sortField,
          sortOrder = 'ASC',
        } = req.query;

        const condition = {
          userId,
        };

        let ordering = [['createdAt', 'DESC']];

        if (sortField && sortOrder) {
          const validSortFields = ['title', 'subTitle', 'createdAt', 'updatedAt'];
          const validSortOrder = ['asc', 'desc'];
          if (validSortFields.includes(sortField) && validSortOrder.includes(sortOrder.toLowerCase())) {
            ordering = [[{ model: db.app }, sortField, sortOrder.toUpperCase()]];
          }
        }

        const pageNo = parseInt(page, 10) || 1;
        const limitPerPage = parseInt(limit, 10) || 10;

        const queryOptions = {
          where: condition,
          distinct: true,
          order: ordering,
          attributes: ['id', 'appId', 'createdAt', 'updatedAt'],
          include: [
            {
              model: db.app,
              attributes: ['id', 'slug', 'title', 'subTitle', 'description', 'image', 'appCategoryId'],
              required: true,
              where: {
                ...(keyword && {
                  [Op.or]: [
                    { title: { [Op.like]: `%${keyword}%` } },
                    { subTitle: { [Op.like]: `%${keyword}%` } },
                  ],
                }),
              },
              include: [
                {
                  model: db.app_category,
                  as: 'category',
                  attributes: ['id', 'icon', 'name', 'slug'],
                  where: {
                    ...(categoryId && { id: categoryId }),
                    ...(categorySlug && { slug: categorySlug }),
                  },
                  required: !!categoryId || !!categorySlug,
                },
              ],
            },
          ],
        };

        if (limitPerPage !== -1) {
          const effectiveLimit = limitPerPage;
          const offset = (pageNo - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        const data = await db.saved_app.findAndCountAll(queryOptions);

        const { count, rows } = data;
        const totalPages = limitPerPage === -1 ? 1 : Math.ceil(count / limitPerPage);

        const formattedRows = await Promise.all(rows.map(async (row) => {
          const rowObj = row.toJSON();
          if (rowObj.app) {
            const reviewStatistics = await appService.getReviewStatistics(rowObj.app.id, false);
            if (reviewStatistics) {
              rowObj.app.totalReviews = reviewStatistics.totalReviews;
              rowObj.app.averageRating = reviewStatistics.averageRating;
            }
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
    create: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { appId } = req.body;

        const [savedApp, isCreated] = await db.saved_app.findOrCreate({
          where: {
            userId,
            appId,
          },
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              savedApp,
              isCreated,
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
    delete: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { id } = req.params;

        const savedApp = await db.saved_app.findOne({
          where: {
            id,
            userId,
          },
          attributes: ['id'],
        });

        if (!savedApp) {
          res.status(404).json({
            message: 'The saved app either does not exist or does not belong to the current user.',
          });
          return;
        }

        await savedApp.destroy();

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              savedApp,
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
  },
  admin: {
    // index: async (req, res) => module.exports.common.index(req, res),
    // show: async (req, res) => module.exports.common.show(req, res),
  },
};
