const { query } = require('express-validator');
const { validateRules } = require('../middlewares/validators');

module.exports = {
  common: {
    index: [
      query('keyword')
        .notEmpty()
        .withMessage('keyword is required')
        .trim()
        .escape(),
      validateRules,
    ],
  },
};
