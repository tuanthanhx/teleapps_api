const slugify = require('slugify');
const appService = require('../services/app.service');
const redis = require('../utils/redis');
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
        const currentUserId = req.user?.id;

        const {
          keyword,
          categoryId,
          categorySlug,
          status,
          userId,
          page = 1,
          limit = 10,
          sortField,
          sortOrder = 'ASC',
        } = req.query;

        const condition = {};

        if (req.isPublicPaths) {
          condition.status = 1;
        }

        if (req.isAdminPaths) {
          condition.status = { [Op.notIn]: [5, 6] };
          if (userId) condition.userId = userId;
        }

        if (req.isDeveloperPaths) {
          condition.userId = currentUserId;
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
          const validSortFields = ['title', 'status', 'position', 'createdAt', 'updatedAt'];
          const validSortOrder = ['asc', 'desc'];
          if (validSortFields.includes(sortField) && validSortOrder.includes(sortOrder.toLowerCase())) {
            ordering = [[sortField, sortOrder.toUpperCase()]];
          }
        }

        if (req.originalUrl.includes('/apps/new')) {
          ordering = [['createdAt', 'DESC']];
        }

        if (req.originalUrl.includes('/apps/trending')) {
          ordering = [['position', 'ASC'], ['createdAt', 'ASC']];
        }

        const queryOptions = {
          where: condition,
          distinct: true,
          order: ordering,
          attributes: ['id', 'slug', 'title', 'subTitle', 'status', 'image', 'cover', 'position', 'createdAt', 'updatedAt', ...(req.isAdminPaths ? ['userId'] : [])],
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
            ...(req.isAdminPaths ? [
              {
                model: db.user,
                attributes: ['id', 'username', 'telegramId', 'telegramPremium', 'userGroupId', 'firstName', 'lastName', 'avatar'],
              },
            ] : []),
          ],
        };

        if (limit !== -1) {
          const effectiveLimit = parseInt(limit, 10);
          const offset = (parseInt(page, 10) - 1) * effectiveLimit;
          queryOptions.limit = effectiveLimit;
          queryOptions.offset = offset;
        }

        // Generate a dynamic cache key
        const cacheKey = `apps:${JSON.stringify({
          keyword, categoryId, categorySlug, status, page, limit, sortField, sortOrder, path: req.originalUrl,
        })}`;

        const cachedApps = await redis.getCache(cacheKey);

        if (cachedApps) {
          res.json(cachedApps);
          return;
        }

        const data = await db.app.findAndCountAll(queryOptions);
        const { count, rows } = data;

        const totalPages = limit === -1 ? 1 : Math.ceil(count / limit);

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

        const response = req.originalUrl.includes('/apps/new') || req.originalUrl.includes('/apps/trending')
          ? { data: formattedRows }
          : {
            totalItems: count,
            totalPages,
            currentPage: parseInt(page, 10),
            data: formattedRows,
          };

        // Cache the response
        await redis.setCache(cacheKey, response, 3600); // Cache for 1 hour

        res.json(response);
      } catch (err) {
        logger.error(err);
        res.status(500).json({ message: err.message || 'Some error occurred' });
      }
    },
    new: async (req, res) => module.exports.common.index(req, res),
    trending: async (req, res) => module.exports.common.index(req, res),
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

        condition[Op.or] = [{ id }, { slug: id }];

        const app = await db.app.findOne({
          where: condition,
          include: [
            {
              model: db.app_category,
              as: 'category',
              attributes: ['id', 'icon', 'name', 'slug'],
            },
            ...(req.isAdminPaths ? [
              {
                model: db.user,
                attributes: ['id', 'username', 'telegramId', 'telegramPremium', 'userGroupId', 'firstName', 'lastName', 'avatar'],
              },
            ] : []),
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
            ...(req.isDeveloperPaths ? [
              [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN status = 5 THEN 1 ELSE 0 END')), 'draft'],
              [db.sequelize.fn('SUM', db.sequelize.literal('CASE WHEN status = 6 THEN 1 ELSE 0 END')), 'deleted'],
            ] : []),
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
          ...(req.isDeveloperPaths && {
            draft: statusCounts[0].draft || 0,
            deleted: statusCounts[0].deleted || 0,
          }),
        };

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
    approve: async (req, res) => {
      try {
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app does not exist',
          });
          return;
        }
        if (app.status !== 3) {
          res.status(400).json({
            message: 'The app cannot be approved because its status is not \'In-Review\'.',
          });
          return;
        }

        await app.update({
          status: 1,
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
    reject: async (req, res) => {
      try {
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app does not exist',
          });
          return;
        }
        if (app.status !== 3) {
          res.status(400).json({
            message: 'The app cannot be rejected because its status is not \'In-Review\'.',
          });
          return;
        }

        await app.update({
          status: 4,
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
  developer: {
    index: async (req, res) => module.exports.common.index(req, res),
    show: async (req, res) => module.exports.common.show(req, res),
    statistics: async (req, res) => module.exports.mixing.statistics(req, res),
    create: async (req, res) => {
      try {
        const userId = req.user?.id;

        const {
          title,
          subTitle,
          description,
          appCategoryId,
          image,
          cover,
          screenshots,
          platforms,
          languageIds,
          telegramChannels,
          snsChannels,
        } = req.body;

        const object = {
          title,
          subTitle,
          description,
          appCategoryId,
          image,
          cover,
          screenshots,
          platforms,
          languageIds,
          telegramChannels,
          snsChannels,
          userId,
          position: null,
          status: 5, // Draft
        };

        const slug = slugify(title, {
          lower: true,
          strict: true,
        });

        let uniqueSlug = slug;
        let suffix = 1;

        while (await db.app.findOne({ where: { slug: uniqueSlug } })) {
          suffix += 1;
          uniqueSlug = `${slug}-${suffix}`;
        }

        object.slug = uniqueSlug;

        const createdApp = await db.app.create(object);

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              createdApp,
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
    update: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            userId,
            id,
          },
        });
        if (!app) {
          res.status(404).json({
            message: 'The app either does not exist or does not belong to the current user.',
          });
          return;
        }

        if (app.status !== 5) {
          res.status(400).json({
            message: 'Updating is not allowed for the current status',
          });
          return;
        }

        const {
          title,
          subTitle,
          description,
          appCategoryId,
          image,
          cover,
          screenshots,
          platforms,
          languageIds,
          telegramChannels,
          snsChannels,
        } = req.body;

        const object = {
          title,
          subTitle,
          description,
          appCategoryId,
          image,
          cover,
          screenshots,
          platforms,
          languageIds,
          telegramChannels,
          snsChannels,
        };

        if (title && title !== app.title) {
          const slug = slugify(title, {
            lower: true,
            strict: true,
          });

          let uniqueSlug = slug;
          let suffix = 1;

          while (await db.app.findOne({ where: { slug: uniqueSlug, id: { [db.Sequelize.Op.ne]: id } } })) {
            suffix += 1;
            uniqueSlug = `${slug}-${suffix}`;
          }

          object.slug = uniqueSlug;
        }

        await app.update(object);

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
    submit: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            userId,
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app either does not exist or does not belong to the current user.',
          });
          return;
        }
        if (app.status !== 5) {
          res.status(400).json({
            message: 'Submission is not allowed for the current status',
          });
          return;
        }

        await app.update({
          status: 3, // In Review
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
    revoke: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            userId,
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app either does not exist or does not belong to the current user.',
          });
          return;
        }
        if (app.status !== 3) {
          res.status(400).json({
            message: 'Revocation is not allowed for the current status',
          });
          return;
        }

        await app.update({
          status: 5, // Draft
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
    publish: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            userId,
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app either does not exist or does not belong to the current user.',
          });
          return;
        }
        if (app.status !== 2) {
          res.status(400).json({
            message: 'Publishing is not allowed for the current status',
          });
          return;
        }

        await app.update({
          status: 1, // Published
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
    unpublish: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            userId,
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app either does not exist or does not belong to the current user.',
          });
          return;
        }
        if (app.status !== 1) {
          res.status(400).json({
            message: 'Unpublishing is not allowed for the current status',
          });
          return;
        }

        await app.update({
          status: 2, // Unpublished
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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

        const app = await db.app.findOne({
          where: {
            userId,
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app either does not exist or does not belong to the current user.',
          });
          return;
        }
        if (app.status !== 5 && app.status !== 1 && app.status !== 2) {
          res.status(400).json({
            message: 'Deletion is not allowed for the current status',
          });
          return;
        }

        await app.update({
          status: 6, // Deleted
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
    restore: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            userId,
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app either does not exist or does not belong to the current user.',
          });
          return;
        }
        if (app.status !== 6) {
          res.status(400).json({
            message: 'Restoration is not allowed for the current status',
          });
          return;
        }

        await app.update({
          status: 5, // Draft
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
    draft: async (req, res) => {
      try {
        const userId = req.user?.id;
        const { id } = req.params;

        const app = await db.app.findOne({
          where: {
            userId,
            id,
          },
          attributes: ['id', 'status'],
        });
        if (!app) {
          res.status(404).json({
            message: 'The app either does not exist or does not belong to the current user.',
          });
          return;
        }
        if (app.status !== 5 && app.status !== 1 && app.status !== 2) {
          res.status(400).json({
            message: 'Changing to draft is not allowed for the current status',
          });
          return;
        }

        await app.update({
          status: 5, // Draft
        });

        res.json({
          data: true,
          ...(process.env.NODE_ENV === 'development' && {
            debug: {
              app,
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
};
