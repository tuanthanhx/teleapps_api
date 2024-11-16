const slugify = require('slugify');
const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    try {
      const array = [
        {
          ID: 3712,
          name: 'HackenProof',
          caption: 'Crowdsourced security platform ',
          description: 'HackenProof is a crowdsourced security platform for exchanges, protocols and smart contracts. It connects crypto projects with the global hacker community and professional smart contract auditors to uncover security issues.',
          languages: [
            'en',
          ],
          appPlatforms: {
            web: 'https://hackenproof.com/',
            tg_channel: 'https://t.me/hackenproof_chat',
            tg_chat: 'https://t.me/hackenproof',
            inst: 'instagram.com/hackenproof/',
            twitter: 'https://x.com/HackenProof',
            youtube: 'youtube.com/@hackenproof',
            appId: 3712,
            reviewId: 5289,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/80a34430-89b6-4462-92cf-431035020a82.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/80a34430-89b6-4462-92cf-431035020a82.png',
          videoPath: null,
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/6ff668b6-00ae-470d-a7e5-b3cc00dec1ff.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/8a034006-2027-4c8c-978d-cf6624309742.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/b9b4a53c-faad-4832-a445-885ea5ec018b.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://hackenproof.com/',
            github: '',
            instagram: 'instagram.com/hackenproof/',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: 'https://t.me/hackenproof_chat',
            tgChat: 'https://t.me/hackenproof',
            twitter: 'https://x.com/HackenProof',
            youtube: 'youtube.com/@hackenproof',
          },
        },
        {
          ID: 3208,
          name: 'Decurity',
          caption: 'Tier-1 security audits and real-time threat detection',
          description: 'Decurity is a tier-1 smart contract security auditing firm.\n\nWe scored highest among all the security auditing firms in Paradigm CTF and OpenZeppelin CTF — the hardest smart contract hacking competitions.\n\nWe do audits for high-quality projects and work closely with 1inch, Ether.Fi, Gearbox, Yearn, Compound, Storm.Tg, Symbiosis, Clearpool, Fluence, GivEth, Socket.Tech, and others.\n',
          languages: [
            'en',
          ],
          appPlatforms: {
            web: 'https://www.decurity.io/',
            github: 'https://github.com/Decurity',
            tg_chat: 'https://t.me/DecurityHQ',
            twitter: 'https://x.com/DecurityHQ',
            appId: 3208,
          },
          icon: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/8cc29c7b-d883-4e44-910e-7d7e07ba62a4.png',
          iconPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/8cc29c7b-d883-4e44-910e-7d7e07ba62a4.png',
          videoPath: 'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/4ab15849-5040-4486-8198-7c771b6992d4.mp4',
          screenshotPaths: [
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/de250d44-ec23-4aad-ac62-6d06e3b8bb90.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/dda8fe27-6329-46ef-93d1-2d353eb5289d.png',
            'https://s3.ap-southeast-1.amazonaws.com/teleapps.store/shared/app_ta/3506e524-367a-42d2-b8c9-f00d92c31a8c.png',
          ],
          languageCodes: [
            'en',
          ],
          links: {
            webSite: 'https://www.decurity.io/',
            github: 'https://github.com/Decurity',
            instagram: '',
            googlePlay: '',
            appStore: '',
            tgBot: '',
            tgChannel: '',
            tgChat: 'https://t.me/DecurityHQ',
            twitter: 'https://x.com/DecurityHQ',
            youtube: '',
          },
        },
      ];

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
              url: item.links?.ios || null,
            },
            {
              id: 'android',
              url: item.links?.android || null,
            },
            {
              id: 'telegram',
              url: item.links?.telegram || null,
            },
            {
              id: 'web',
              url: item.links?.web || null,
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
              url: item.links?.instagram || null,
            },
            {
              id: 'reddit',
              url: item.links?.instagram || null,
            },
            {
              id: 'discord',
              url: item.links?.instagram || null,
            },
          ]),
          status: 1,
          position: array.indexOf(item) + 1,
          appCategoryId: 117,
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
