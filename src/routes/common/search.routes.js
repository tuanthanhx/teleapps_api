module.exports = (app) => {
  const router = require('express').Router();
  const apps = require('../../controllers/search.controller');
  const rules = require('../../rules/search.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.common.index, apps.common.index);

  app.use(`/api-common/${apiVersion}/search`, router);
};
