const { APP_CATEGORY_STATUS } = require('../constants/app_category_status.constants');
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

        const condition = {};

        if (!req.isAdminPaths) {
          condition.status = 1;
        }

        if (keyword) {
          condition[Op.or] = [
            { name: { [Op.like]: `%${keyword}%` } },
          ];
        }

        let ordering = [['order', 'ASC']];

        if (sortField && sortOrder) {
          const validSortFields = ['id', 'name', 'order', 'status', 'createdAt'];
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

        const data = await db.app_category.findAndCountAll(queryOptions);

        const { count, rows } = data;
        const totalPages = limitPerPage === -1 ? 1 : Math.ceil(count / limitPerPage);

        const formattedRows = rows.map((row) => {
          const rowObj = row.toJSON();
          rowObj.uiProps = {};
          rowObj.uiProps.statusName = APP_CATEGORY_STATUS.find((item) => item.id === rowObj.status)?.name ?? null;
          return rowObj;
        });

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
        const { id } = req.params;

        const condition = {};

        if (!req.isAdminPaths) {
          condition.status = 1;
        }

        if (Number.isInteger(Number(id))) {
          condition.id = id;
        } else {
          condition.slug = id;
        }

        const appCategory = await db.app_category.findOne({
          where: condition,
        });

        if (!appCategory) {
          res.status(404).json({
            message: 'App Category not found',
          });
          return;
        }

        const formattedAppCategory = appCategory.toJSON();
        formattedAppCategory.uiProps = {};
        formattedAppCategory.uiProps.statusName = APP_CATEGORY_STATUS.find((item) => item.id === formattedAppCategory.status)?.name ?? null;

        res.json({
          data: formattedAppCategory,
        });
      } catch (err) {
        logger.error(err);
        res.status(500).json({
          message: err.message || 'Some error occurred',
        });
      }
    },
    getSlider: async (req, res) => {
      try {
        const { id } = req.params;

        const condition = {};

        if (!req.isAdminPaths) {
          condition.status = 1;
        }

        if (Number.isInteger(Number(id))) {
          condition.id = id;
        } else {
          condition.slug = id;
        }

        const appCategory = await db.app_category.findOne({
          where: condition,
        });

        if (!appCategory) {
          res.status(404).json({
            message: 'App Category not found',
          });
          return;
        }

        const sliderItems = await db.app_category_slider_item.findAll({
          where: {
            appCategoryId: appCategory.id,
          },
          order: [['order', 'asc']],
          include: [{
            model: db.app,
            attributes: ['id', 'slug', 'title', 'subTitle', 'image', 'cover', 'createdAt', 'updatedAt'],
            required: false,
            where: {
              status: 1,
            },
          }],
        });

        res.json({
          data: sliderItems,
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
  developer: {
    index: async (req, res) => module.exports.common.index(req, res),
    show: async (req, res) => module.exports.common.show(req, res),
  },
};
