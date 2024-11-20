module.exports = (app) => {
  const router = require('express').Router();
  const utils = require('../../controllers/util.controller');
  const rules = require('../../rules/util.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.post('/validate_new_app_title', rules.common.validateNewAppTitle, utils.common.validateNewAppTitle);

  app.use(`/api-common/${apiVersion}/utils`, router);
};
