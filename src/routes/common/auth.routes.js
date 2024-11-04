module.exports = (app) => {
  const router = require('express').Router();
  const auth = require('../../controllers/auth.controller');
  const rules = require('../../rules/auth.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/is_login', rules.common.isLogin, auth.common.isLogin);
  router.get('/me', rules.common.findMe, auth.common.findMe);
  router.post('/login/telegram', rules.common.loginByTelegram, auth.common.loginByTelegram);
  router.post('/login/session', rules.common.loginBySession, auth.common.loginBySession);
  router.post('/generate_session', rules.common.generateSession, auth.common.generateSession);

  app.use(`/api-common/${apiVersion}/auth`, router);
};
