module.exports = (app) => {
  const router = require('express').Router();
  const auth = require('../../controllers/auth.controller');
  // const rules = require('../../rules/slider.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/is_login', auth.common.isLogin);
  router.get('/me', auth.common.findMe);
  router.post('/login/telegram', auth.common.loginByTelegram);
  router.post('/login/session', auth.common.loginBySession);
  router.post('/generate_session', auth.common.generateSession);

  app.use(`/api-common/${apiVersion}/auth`, router);
};
