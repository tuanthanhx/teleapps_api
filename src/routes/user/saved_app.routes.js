module.exports = (app) => {
  const router = require('express').Router();
  const savedApps = require('../../controllers/saved_app.controller');
  const rules = require('../../rules/saved_app.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.user.index, savedApps.user.index);
  router.post('/', rules.user.create, savedApps.user.create);
  router.delete('/:id', rules.user.delete, savedApps.user.delete);

  app.use(`/api-user/${apiVersion}/saved_apps`, router);
};
