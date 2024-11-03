const { body } = require('express-validator');
const { validateRules } = require('../middlewares/validators');

module.exports = {
  user: {
    startGame: [],
    submitScore: [
      body('score')
        .notEmpty()
        .withMessage('score is required')
        .isInt({ min: 0 })
        .withMessage('Score must be greater than or equal to 0')
        .toInt(),
      body('session')
        .notEmpty()
        .withMessage('session is required')
        .trim()
        .escape(),
      validateRules,
    ],
  },
};
