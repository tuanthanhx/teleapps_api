const slugify = require('slugify');
const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const array = [];

      const normalizeLanguageCodes = (codes) => {
        if (!codes) return null;
        return codes
          .flatMap((code) => code.split(','))
          .map((code) => code.trim())
          .filter((code) => code);
      };

      const baseTime = new Date();
      for (const item of array) {
        const object = {
          id: Sequelize.literal('UUID()'),
          image: item.iconPath,
          title: item.name,
          subTitle: item.caption,
          slug: item.pretty_url,
          description: item.description,
          cover: null,
          screenshots: item.screenshotPaths ? JSON.stringify(item.screenshotPaths) : null,
          platforms: JSON.stringify({
            web: item.links?.webSite || null,
            ios: item.links?.appStore || null,
            android: item.links?.googlePlay || null,
            telegram: item.links?.tgChannel || null,
          }),
          languageIds: item.languageCodes?.length ? JSON.stringify(normalizeLanguageCodes(item.languageCodes)) : null,
          links: JSON.stringify({
            telegramBot: item.links?.tgBot || null,
            telegramChat: item.links?.tgChat || null,
            github: item.links?.github || null,
            instagram: item.links?.instagram || null,
            x: item.links?.twitter || null,
            youtube: item.links?.youtube || null,
            medium: item.links?.medium || null,
            reddit: item.links?.reddit || null,
            discord: item.links?.discord || null,
          }),
          status: 1,
          appCategoryId: 116,
          createdAt: new Date(baseTime),
          updatedAt: new Date(baseTime),
        };

        if (!object.slug) {
          const slug = slugify(object.title, {
            lower: true,
            strict: true,
          });
          let uniqueSlug = slug;
          let suffix = 1;
          while (await db.app.findOne({ where: { slug: uniqueSlug } })) {
            suffix += 1;
            uniqueSlug = `${slug}-${suffix}`;
          }
          object.slug = uniqueSlug;
        }
        await queryInterface.bulkInsert('apps', [object], {});
        baseTime.setSeconds(baseTime.getSeconds() + 1);
      }
    } catch (error) {
      console.error(error);
    }
  },
};
