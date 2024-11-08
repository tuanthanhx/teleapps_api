// const { param, query } = require('express-validator');
// const { validateRules } = require('../middlewares/validators');

const common = {
  index: [],
};

module.exports = {
  common: {
    index: common.index,
  },
  admin: {
    index: [],
  },
  developer: {
    index: common.index,
  },
};
