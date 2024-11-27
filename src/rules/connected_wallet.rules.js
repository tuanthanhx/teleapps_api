const { body } = require('express-validator');
const { validateRules } = require('../middlewares/validators');
// const db = require('../models');

module.exports = {
  user: {
    getWallet: [],
    setWallet: [
      body('address')
        .notEmpty()
        .withMessage('address is required'),
      body('chainId')
        .notEmpty()
        .withMessage('chainId is required')
        .isInt()
        .withMessage('chainId must be integer'),
      body('provider')
        .optional(),
      body('metadata')
        .optional(),
      validateRules,
    ],
    removeWallet: [],
  },
};
