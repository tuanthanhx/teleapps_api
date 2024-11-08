module.exports = (app) => {
  const router = require('express').Router();
  const appMetadatas = require('../../controllers/app_metadata.controller');
  const rules = require('../../rules/app_metadata.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.developer.index, appMetadatas.developer.index);

  app.use(`/api-developer/${apiVersion}/app_metadatas`, router);
};
