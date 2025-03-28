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
          platforms: JSON.stringify([
            {
              id: 'ios',
              url: item.links?.appStore || null,
            },
            {
              id: 'android',
              url: item.links?.googlePlay || null,
            },
            {
              id: 'telegram',
              url: item.links?.tgChannel || item.appPlatforms?.tg_channel || null,
            },
            {
              id: 'web',
              url: item.links?.webSite || item.appPlatforms?.web || null,
            },
          ]),
          languageIds: item.languageCodes?.length ? JSON.stringify(normalizeLanguageCodes(item.languageCodes)) : null,
          telegramChannels: JSON.stringify(
            [item.links?.tgBot, item.links?.tgChat].filter((link) => link !== null && link !== undefined),
          ),
          snsChannels: JSON.stringify([
            {
              id: 'github',
              url: item.links?.github || null,
            },
            {
              id: 'instagram',
              url: item.links?.instagram || null,
            },
            {
              id: 'x',
              url: item.links?.twitter || null,
            },
            {
              id: 'youtube',
              url: item.links?.youtube || null,
            },
            {
              id: 'medium',
              url: item.links?.medium || null,
            },
            {
              id: 'reddit',
              url: item.links?.reddit || null,
            },
            {
              id: 'discord',
              url: item.links?.discord || null,
            },
          ]),
          status: 1,
          position: array.indexOf(item) + 1,
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
