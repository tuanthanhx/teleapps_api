const { body, query, param } = require('express-validator');
const { validateRules } = require('../middlewares/validators');
const db = require('../models');

module.exports = {
  user: {
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
    create: [
      body('appId')
        .notEmpty()
        .withMessage('appId is required')
        .bail()
        .custom(async (appId) => {
          const app = await db.app.findOne({
            where: {
              id: appId,
              status: 1,
            },
          });
          if (!app) {
            throw new Error('Invalid appId');
          }
        }),
      validateRules,
    ],
    delete: [
      param('id')
        .notEmpty()
        .withMessage('id is required'),
      validateRules,
    ],
  },
};
