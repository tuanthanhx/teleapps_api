const { body } = require('express-validator');
const { validateRules } = require('../middlewares/validators');

module.exports = {
  user: {
    getProfile: [],
    updateProfile: [
      body('username')
        .optional()
        .trim()
        .escape()
        .isLength({ min: 3, max: 20 })
        .withMessage('username must be between 3 and 20 characters long')
        .matches(/^[a-zA-Z0-9_.-]*$/)
        .withMessage('username can only contain letters, numbers, dots, underscores, and hyphens'),
      body('firstName')
        .optional()
        .trim()
        .escape(),
      body('lastName')
        .optional()
        .trim()
        .escape(),
      body('email')
        .optional()
        .isEmail()
        .withMessage('email is invalid format')
        .trim()
        .escape(),
      body('phone')
        .optional()
        .trim()
        .escape(),
      body('avatar')
        .optional()
        .trim()
        .isURL()
        .withMessage('avatar must be a valid URL'),
      body('gender')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('gender must be an integer between 1 and 5'),
      body('dob')
        .optional()
        .isISO8601()
        .withMessage('dob must be in the format YYYY-MM-DD')
        .custom((value) => {
          const today = new Date();
          const dobDate = new Date(value);
          if (dobDate >= today) {
            throw new Error('dob must be in the past');
          }
          return true;
        })
        .trim()
        .escape(),
      validateRules,
    ],
  },
};
