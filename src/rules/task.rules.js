const { query, param } = require('express-validator');
const { validateRules } = require('../middlewares/validators');

module.exports = {
  user: {
    index: [
      query('taskCategoryId')
        .optional()
        .toInt(),
      validateRules,
    ],
    show: [
      param('id')
        .notEmpty()
        .withMessage('id is required'),
      validateRules,
    ],
    finish: [
      param('id')
        .notEmpty()
        .withMessage('id is required'),
      validateRules,
    ],
  },
};
