const { param, query } = require('express-validator');
const { validateRules } = require('../middlewares/validators');

module.exports = {
  common: {
    index: [
      query('keyword')
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
    show: [
      param('id')
        .notEmpty()
        .withMessage('id is required')
        .isInt()
        .withMessage('id must be integer'),
      validateRules,
    ],
  },
  admin: {
    index: [],
    show: [],
  },
};
