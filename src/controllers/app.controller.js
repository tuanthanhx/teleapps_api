const appService = require('../services/app.service');
const logger = require('../utils/logger');
const { APP_STATUS } = require('../constants/app_status.constants');
const { APP_PLATFORMS } = require('../constants/app_platform.constants');
const { APP_SNS } = require('../constants/app_sns.constants');

const db = require('../models');

const { Op } = db.Sequelize;

module.exports = {
  common: {
    index: async (req, res) => {
      try {
        const userId = req.user?.id;

        const {
          keyword,
          categoryId,
          categorySlug,
          status,
          page,
          limit,
          sortField,
          sortOrder = 'ASC',
        } = req.query;

        const condition = {};

        if (req.isPublicPaths) {
          condition.status = 1;
        }

        if (req.isAdminPaths) {
          condition.status = { [Op.notIn]: [5, 6] };
        }

        if (req.isDeveloperPaths) {
          condition.userId = userId;
        }

        if (status && !req.isPublicPaths) {
          condition.status = status;
        }

        if (keyword) {
          condition[Op.or] = [
            { title: { [Op.like]: `%${keyword}%` } },
            { subTitle: { [Op.like]: `%${keyword}%` } },
          ];
        }

        let ordering = req.isPublicPaths ? [['position', 'ASC']] : [['createdAt', 'DESC']];

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
          attributes: ['id', 'slug', 'title', 'subTitle', 'status', 'image', 'cover', 'position', 'createdAt', 'updatedAt'],
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

          const reviewStatistics = await appService.getReviewStatistics(row.id);
          if (reviewStatistics) {
            rowObj.totalReviews = reviewStatistics.totalReviews;
            rowObj.averageRating = reviewStatistics.averageRating;
            rowObj.reviewsCount = reviewStatistics.reviewsCount;
          }

          rowObj.uiProps = {};
          rowObj.uiProps.statusName = APP_STATUS.find((item) => item.id === rowObj.status)?.name ?? null;
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
    show: async (req, res) => {
      try {
        const userId = req.user?.id;

        const { id } = req.params;

        const condition = {};

        if (req.isPublicPaths) {
          condition.status = 1;
        }

        if (req.isDeveloperPaths) {
          condition.userId = userId;
        }

        if (Number.isInteger(Number(id))) {
          condition.id = id;
        } else {
          condition.slug = id;
        }

        const app = await db.app.findOne({
          where: condition,
          include: [
            {
              model: db.app_category,
              as: 'category',
              attributes: ['id', 'icon', 'name', 'slug'],
            },
            {
              model: db.app_history,
              as: 'histories',
              separate: true,
              order: [['createdAt', 'DESC']],
              offset: 0,
              limit: 1,
            },
          ],
        });

        if (!app) {
          res.status(404).json({
            message: 'App not found',
          });
          return;
        }

        const formattedApp = app.toJSON();

        formattedApp.uiProps = {};

        if (formattedApp.languageIds && Array.isArray(formattedApp.languageIds)) {
          const languages = await db.app_language.findAll({
            where: {
              id: formattedApp.languageIds,
            },
            attributes: ['id', 'name'],
          });
          formattedApp.uiProps.languages = languages;
        } else {
          formattedApp.uiProps.languages = [];
        }

        if (formattedApp.platforms && Array.isArray(formattedApp.platforms)) {
          const platforms = formattedApp.platforms.map((platformObj) => {
            const platform = APP_PLATFORMS.find((p) => p.id === platformObj.id);
            return {
              id: platformObj.id,
              name: platform ? platform.name : 'Other Platform',
              url: platformObj.url,
            };
          });
          formattedApp.uiProps.platforms = platforms;
        } else {
          formattedApp.uiProps.platforms = [];
        }

        if (formattedApp.snsChannels && Array.isArray(formattedApp.snsChannels)) {
          const snsChannels = formattedApp.snsChannels.map((channelObj) => {
            const channel = APP_SNS.find((c) => c.id === channelObj.id);
            return {
              id: channelObj.id,
              name: channel ? channel.name : 'Other Channel',
              url: channelObj.url,
            };
          });
          formattedApp.uiProps.snsChannels = snsChannels;
        } else {
          formattedApp.uiProps.snsChannels = [];
        }

        formattedApp.uiProps.statusName = APP_STATUS.find((item) => item.id === formattedApp.status)?.name ?? null;

        const reviewStatistics = await appService.getReviewStatistics(app.id);
        if (reviewStatistics) {
          formattedApp.totalReviews = reviewStatistics.totalReviews;
          formattedApp.averageRating = reviewStatistics.averageRating;
          formattedApp.reviewsCount = reviewStatistics.reviewsCount;
        }

        res.json({
          data: formattedApp,
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    getHistories: async (req, res) => {
      try {
        const { id } = req.params;

        const {
          page,
          limit,
        } = req.query;

        const condition = {
          status: 1,
        };

        if (Number.isInteger(Number(id))) {
          condition.id = id;
        } else {
          condition.slug = id;
        }

        const app = await db.app.findOne({
          where: condition,
          attributes: ['id'],
        });

        if (!app) {
          res.status(404).json({
            message: 'App not found',
          });
          return;
        }

        const pageNo = parseInt(page, 10) || 1;
        const limitPerPage = parseInt(limit, 10) || 10;

        const queryOptions = {
          where: {
            appId: app.id,
          },
          distinct: true,
          order: [['createdAt', 'DESC']],
        };

        if (limitPerPage !== -1) {
          const effectiveLimit = limitPerPage;
          const offset = (pageNo - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        const data = await db.app_history.findAndCountAll(queryOptions);

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
    getReviews: async (req, res) => {
      try {
        const { id } = req.params;

        const {
          page,
          limit,
          sortField,
          sortOrder = 'ASC',
        } = req.query;

        const condition = {
          status: 1,
        };

        if (Number.isInteger(Number(id))) {
          condition.id = id;
        } else {
          condition.slug = id;
        }

        const app = await db.app.findOne({
          where: condition,
          attributes: ['id'],
        });

        if (!app) {
          res.status(404).json({
            message: 'App not found',
          });
          return;
        }

        let ordering = [['createdAt', 'ASC']];

        if (sortField && sortOrder) {
          const validSortFields = ['createdAt', 'rate'];
          const validSortOrder = ['asc', 'desc'];
          if (validSortFields.includes(sortField) && validSortOrder.includes(sortOrder.toLowerCase())) {
            ordering = [[sortField, sortOrder.toUpperCase()]];
          }
        }

        const pageNo = parseInt(page, 10) || 1;
        const limitPerPage = parseInt(limit, 10) || 10;

        const queryOptions = {
          where: {
            appId: app.id,
          },
          distinct: true,
          order: ordering,
          attributes: ['rate', 'message', 'createdAt'],
          include: [{
            model: db.user,
            attributes: ['id', 'firstName', 'lastName', 'avatar'],
          }],
        };

        if (limitPerPage !== -1) {
          const effectiveLimit = limitPerPage;
          const offset = (pageNo - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        const data = await db.app_review.findAndCountAll(queryOptions);

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
  mixing: {
    statistics: async (req, res) => {
      try {
        const userId = req.user?.id;

        const condition = {};

        if (req.isAdminPaths) {
          condition.status = { [Op.notIn]: [5, 6] };
        } else if (req.isDeveloperPaths) {
          condition.userId = userId;
        }

        const statusCounts = await db.app.findAll({
          attributes: [
            [db.sequelize.fn('COUNT', db.sequelize.col('id')), 'all'],
            [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN status = 1 THEN 1 ELSE 0 END')), 'published'],
            [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN status = 2 THEN 1 ELSE 0 END')), 'unpublished'],
            [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN status = 3 THEN 1 ELSE 0 END')), 'inReview'],
            [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN status = 4 THEN 1 ELSE 0 END')), 'rejected'],
            ...(req.isDeveloperPaths && [
              [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN status = 5 THEN 1 ELSE 0 END')), 'draft'],
              [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN status = 6 THEN 1 ELSE 0 END')), 'deleted'],
            ]),
          ],
          where: condition,
          raw: true,
        });

        const response = {
          all: statusCounts[0].all || 0,
          published: statusCounts[0].published || 0,
          unpublished: statusCounts[0].unpublished || 0,
          inReview: statusCounts[0].inReview || 0,
          rejected: statusCounts[0].rejected || 0,
          draft: statusCounts[0].draft || 0,
          deleted: statusCounts[0].deleted || 0,
        };

        if (req.isDeveloperPaths) {
          response.draft = statusCounts[0].draft || 0;
          response.deleted = statusCounts[0].deleted || 0;
        }

        res.json(response);
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
    statistics: async (req, res) => module.exports.mixing.statistics(req, res),
  },
  developer: {
    index: async (req, res) => module.exports.common.index(req, res),
    show: async (req, res) => module.exports.common.show(req, res),
    statistics: async (req, res) => module.exports.mixing.statistics(req, res),
  },
};
