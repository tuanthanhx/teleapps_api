const { body } = require('express-validator');
const { validateRules } = require('../middlewares/validators');

module.exports = {
  common: {
    validateNewAppTitle: [
      body('title')
        .notEmpty()
        .withMessage('title is required')
        .trim()
        .escape(),
      validateRules,
    ],
  },
};
