module.exports = (app) => {
  const router = require('express').Router();
  const apps = require('../../controllers/app.controller');
  const rules = require('../../rules/app.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.developer.index, apps.developer.index);
  router.get('/statistics', rules.developer.statistics, apps.developer.statistics);
  router.get('/:id', rules.developer.show, apps.developer.show);
  router.post('/', rules.developer.create, apps.developer.create);

  // router.put('/:id', rules.developer.edit, apps.developer.edit); // TODO: Later

  router.post('/:id/submit', rules.developer.submit, apps.developer.submit);
  router.post('/:id/revoke', rules.developer.revoke, apps.developer.revoke);
  router.delete('/:id/delete', rules.developer.delete, apps.developer.delete);
  router.post('/:id/restore', rules.developer.restore, apps.developer.restore);

  app.use(`/api-developer/${apiVersion}/apps`, router);
};
