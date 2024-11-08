module.exports = (app) => {
  const router = require('express').Router();
  const multer = require('multer');
  const media = require('../../controllers/media.controller');
  const rules = require('../../rules/media.rules');

  const upload = multer({ storage: multer.memoryStorage() });

  require('dotenv').config();
  const apiVersion = process.env.VERSION || 'v1';

  router.post('/app_image', upload.fields([
    { name: 'file', maxCount: 1 },
  ]), rules.developer.uploadAppImage, media.developer.uploadAppImage);
  router.post('/app_cover', upload.fields([
    { name: 'file', maxCount: 1 },
  ]), rules.developer.uploadAppCover, media.developer.uploadAppCover);
  router.post('/app_screenshots', upload.fields([
    { name: 'files', maxCount: 10 },
  ]), rules.developer.uploadAppScreenshots, media.developer.uploadAppScreenshots);

  app.use(`/api-developer/${apiVersion}/media`, router);
};
