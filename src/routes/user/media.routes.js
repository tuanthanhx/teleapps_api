module.exports = (app) => {
  const router = require('express').Router();
  const multer = require('multer');
  const media = require('../../controllers/media.controller');
  const rules = require('../../rules/media.rules');

  const upload = multer({ storage: multer.memoryStorage() });

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.post('/avatar', upload.fields([
    { name: 'file', maxCount: 1 },
  ]), rules.user.uploadAvatar, media.user.uploadAvatar);

  app.use(`/api-user/${apiVersion}/media`, router);
};
