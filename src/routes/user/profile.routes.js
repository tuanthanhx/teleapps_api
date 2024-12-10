module.exports = (app) => {
  const router = require('express').Router();
  const profiles = require('../../controllers/profile.controller');
  const rules = require('../../rules/profile.rules');

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.get('/', rules.user.getProfile, profiles.user.getProfile);
  router.put('/', rules.user.updateProfile, profiles.user.updateProfile);
  router.post('/telegram_avatar', rules.user.syncTelegramAvatar, profiles.user.syncTelegramAvatar);

  app.use(`/api-user/${apiVersion}/profile`, router);
};
