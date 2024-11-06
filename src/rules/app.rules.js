const { param, query } = require('express-validator');
const { validateRules } = require('../middlewares/validators');
const { APP_STATUS } = require('../constants/app_status.constants');

const allowedStatusIds = APP_STATUS.map((status) => status.id);

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
  },
  developer: {
    index: common.index,
    show: common.show,
  },
};
