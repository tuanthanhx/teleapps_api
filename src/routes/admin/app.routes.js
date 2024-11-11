module.exports = (app) => {
  const router = require('express').Router();
  const apps = require('../../controllers/app.controller');
  const rules = require('../../rules/app.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.admin.index, apps.admin.index);
  router.get('/statistics', rules.admin.statistics, apps.admin.statistics);
  router.get('/:id', rules.admin.show, apps.admin.show);
  router.post('/:id/approve', rules.admin.approve, apps.admin.approve);
  router.post('/:id/reject', rules.admin.reject, apps.admin.reject);

  app.use(`/api-admin/${apiVersion}/apps`, router);
};
