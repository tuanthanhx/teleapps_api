const { param, query, body } = require('express-validator');
const { validateRules } = require('../middlewares/validators');
const { APP_STATUS } = require('../constants/app_status.constants');
const { APP_PLATFORMS } = require('../constants/app_platform.constants');
const { APP_SNS } = require('../constants/app_sns.constants');
const db = require('../models');

// const { Op } = db.Sequelize;

const allowedStatusIds = APP_STATUS.map((status) => status.id);
const allowedPlatformIds = APP_PLATFORMS.map((platform) => platform.id);
const allowedSnsIds = APP_SNS.map((sns) => sns.id);

const validateId = param('id')
  .notEmpty()
  .withMessage('id is required')
  .custom((value) => {
    const parsedValue = Number(value);
    if (!Number.isNaN(parsedValue) && Number.isInteger(parsedValue)) {
      return true;
    }
    if (/^[a-zA-Z0-9_-]+$/.test(value)) {
      return true;
    }
    throw new Error('id must be an integer or a valid slug');
  });

const validateLanguageIds = async (value) => {
  const validLanguages = await db.app_language.findAll({
    attributes: ['id'],
    raw: true,
  });
  const validLanguageIds = validLanguages.map((language) => language.id);
  const invalidIds = value.filter((languageId) => !validLanguageIds.includes(languageId));
  if (invalidIds.length > 0) {
    throw new Error(`The following language IDs are invalid: ${invalidIds.join(', ')}`);
  }
  return true;
};

const common = {
  index: [
    query('keyword')
      .optional()
      .trim()
      .escape(),
    query('categoryId')
      .optional()
      .isInt()
      .withMessage('categoryId must be integer')
      .toInt(),
    query('categorySlug')
      .optional()
      .trim()
      .escape(),
    query('status')
      .optional()
      .isInt()
      .withMessage('status must be integer')
      .toInt()
      .isIn(allowedStatusIds)
      .withMessage(`status must be one of the following values: ${allowedStatusIds.join(', ')}`),
    query('sortField')
      .optional()
      .trim()
      .escape(),
    query('sortOrder')
      .optional()
      .trim()
      .escape(),
    validateRules,
  ],
  show: [
    validateId,
    validateRules,
  ],
  getHistories: [
    validateId,
    validateRules,
  ],
  getReviews: [
    validateId,
    query('sortField')
      .optional()
      .trim()
      .escape(),
    query('sortOrder')
      .optional()
      .trim()
      .escape(),
    validateRules,
  ],
};

module.exports = {
  common: {
    index: common.index,
    show: common.show,
    getHistories: common.getHistories,
    getReviews: common.getReviews,
  },
  admin: {
    index: common.index,
    show: common.show,
    statistics: [],
  },
  developer: {
    index: common.index,
    show: common.show,
    statistics: [],
    create: [
      body('slug')
        .notEmpty()
        .withMessage('slug is required')
        .trim()
        .escape()
        .custom(async (slug) => {
          const app = await db.app.findOne({ where: { slug } });
          if (app) {
            throw new Error('slug already in use');
          }
        }),
      body('title')
        .notEmpty()
        .withMessage('slug is required')
        .trim()
        .escape()
        .custom(async (title) => {
          const app = await db.app.findOne({ where: { title } });
          if (app) {
            throw new Error('title already in use');
          }
        }),
      body('subTitle')
        .optional()
        .isString()
        .withMessage('subTitle must be a string')
        .trim()
        .escape(),
      body('description')
        .isString()
        .withMessage('description must be a string')
        .trim()
        .escape(),
      body('appCategoryId')
        .notEmpty()
        .withMessage('appCategoryId is required')
        .isInt()
        .withMessage('appCategoryId must be an integer')
        .bail()
        .custom(async (id) => {
          const category = await db.app_category.findByPk(id);
          if (!category) {
            throw new Error('Invalid appCategoryId');
          }
        }),
      body('image')
        .notEmpty()
        .withMessage('image is required')
        .isURL()
        .withMessage('image must be a valid URL'),
      body('cover')
        .notEmpty()
        .withMessage('cover is required')
        .isURL()
        .withMessage('cover must be a valid URL'),
      body('screenshots')
        .isArray()
        .withMessage('screenshots must be an array')
        .bail()
        .custom((screenshots) => screenshots.every((url) => /^https?:\/\/\S+\.\S+$/.test(url)))
        .withMessage('Each screenshot must be a valid URL'),
      body('platforms')
        .isArray()
        .withMessage('platforms must be an array')
        .bail()
        .custom((platforms) => platforms.every(
          (platform) => typeof platform.id === 'string'
            && allowedPlatformIds.includes(platform.id)
            && typeof platform.url === 'string',
        ))
        .withMessage('Each platform must have a valid id and url'),
      body('languageIds')
        .isArray()
        .withMessage('languageIds must be an array')
        .bail()
        .custom(validateLanguageIds),
      body('telegramChannels')
        .isArray()
        .withMessage('telegramChannels must be an array')
        .bail()
        .custom((channels) => channels.every((channel) => typeof channel === 'string'))
        .withMessage('Each telegramChannel must be a string'),
      body('snsChannels')
        .isArray()
        .withMessage('snsChannels must be an array')
        .bail()
        .custom((sns) => sns.every(
          (channel) => typeof channel.id === 'string'
            && allowedSnsIds.includes(channel.id)
            && typeof channel.url === 'string',
        ))
        .withMessage('Each snsChannel must have a valid id and url'),
      validateRules,
    ],
  },
};
