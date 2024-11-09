module.exports = (app) => {
  const router = require('express').Router();
  const apps = require('../../controllers/app.controller');
  const rules = require('../../rules/app.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.admin.index, apps.admin.index);
  router.get('/statistics', rules.admin.statistics, apps.admin.statistics);
  router.get('/:id', rules.admin.show, apps.admin.show);
  // router.post('/', rules.admin.create, apps.admin.create);
  // router.put('/:id', rules.admin.edit, apps.admin.edit);
  // router.post('/:id/submit', rules.admin.submit, apps.admin.submit);
  // router.post('/:id/revoke', rules.admin.revoke, apps.admin.revoke);
  // router.delete('/:id/delete', rules.admin.delete, apps.admin.delete);
  // router.post('/:id/restore', rules.admin.restore, apps.admin.restore);

  app.use(`/api-admin/${apiVersion}/apps`, router);
};
