const { query, param } = require('express-validator');
const { validateRules } = require('../middlewares/validators');

module.exports = {
  user: {
    index: [
      query('isDaily')
        .optional()
        .toBoolean(),
      validateRules,
    ],
    show: [
      param('id')
        .notEmpty()
        .withMessage('id is required'),
      validateRules,
    ],
  },
};
